import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { preview } from "../assets";
import { getRandomPrompt } from "../utils/helpers";
import { FormField, Loader } from "../components";
import appAxios from "../utils/axios/appAxios";
import { useAuth } from "../utils/contexts/auth/auth";
import { toast } from "react-toastify";
import { useContext } from "react";
import { ThemeContext } from "../utils/contexts/theme/theme";

function CreatePost() {
  const navigate = useNavigate();
  const [showAuthButtons, setShowAuthButtons] = React.useState({
    title: "Create",
    message:
      "Generate an imaginative image through DALL-E AI and share it with the community",
    type: null,
  });

  const { user } = useAuth();

  useEffect(() => {
    const canUserCreatePost = () => {
      if (!user) {
        toast.info("Please login to create a post");
        setShowAuthButtons({
          title: "Please login to create a post",
          message:
            "To be able to generate an image and share it with the community, you need to login first, please login to continue",
          type: "authenticate",
        });
      }
      if (user && user.status === "verification_pending") {
        toast.info("Please verify your email to create a post");
        setShowAuthButtons({
          title: "Please verify your email to create a post",
          message:
            "To be able to generate an image and share it with the community, you need to verify your email first, please verify your email to continue",
          type: "verify",
        });
      }
    };
    canUserCreatePost();
  }, [user]);

  const [form, setForm] = React.useState({
    name: "",
    prompt: "",
    photo: "",
  });
  useEffect(() => {
    if (!user) return;
    const name = user.name[0].toUpperCase() + user.name.slice(1);
    setForm((prev) => ({
      ...prev,
      name: name,
    }));
  }, [user]);

  const [generatingImage, setGeneratingImage] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const generateImage = async () => {
    if (!form.prompt) {
      alert("Please enter a prompt");
      return;
    }
    try {
      setGeneratingImage(true);
      const response = await appAxios.post("/dalle", {
        prompt: form.prompt,
      });

      const data = response.data;
      setForm((prev) => ({
        ...prev,
        photo: `data:image/jpeg;base64,${data.photo}`,
      }));
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setGeneratingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.prompt || !form.photo) {
      alert("Please fill out all fields");
      return;
    }
    try {
      setLoading(true);
      await appAxios.post("/posts", {
        name: form.name,
        prompt: form.prompt,
        photo: form.photo,
      });
      navigate("/");
    } catch (err) {
      alert("Failed to share post");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm((prev) => ({
      ...prev,
      prompt: randomPrompt,
    }));
  };

  const {getTheme} = useContext(ThemeContext);
  const AuthenticateButtons = () => {
    const buttonClass = `text-white ${getTheme('button-primary')} font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center`;
    // Using getTheme('button-primary') as an example, adjust based on your theme context

    if (showAuthButtons.type === "authenticate") {
      return (
        <div className="mt-10 flex gap-10">
          <button className={buttonClass} onClick={() => navigate("/login")}>
            Login
          </button>
          <button className={buttonClass} onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      );
    }
    if (showAuthButtons.type === "verify") {
      return (
        <div className="mt-10">
          <button className={buttonClass} onClick={() => navigate("/verify")}>
            Verify Email
          </button>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className={`font-extrabold ${getTheme('text')} text-[32px]`}>
          {showAuthButtons.title}
        </h1>
        <p className={`mt-2 ${getTheme('text')} text-[14px] max-w-[500px]`}>
          {showAuthButtons.message}
        </p>
      </div>
      {showAuthButtons.type ? (
        <AuthenticateButtons />
      ) : (
        // Assuming the form and its related components like FormField are theme-aware
        <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
          {/* Form content, assuming it respects the theme */}
        </form>
      )}
    </section>
  );
};

export default CreatePost;
