import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { preview } from "../assets";
import { getRandomPrompt } from "../utils/helpers";
import { FormField, Loader } from "../components";
import appAxios from "../utils/axios/appAxios";
import { useAuth } from "../utils/contexts/auth/auth";
import { toast } from "react-toastify";


function CreatePost() {
  const navigate = useNavigate();
  const [showAuthButtons, setShowAuthButtons] = React.useState({
    title: "Create",
    message: "Generate an imaginative image through DALL-E AI and share it with the community",
    type : null,
  });

  const { user } = useAuth();

  const canUserCreatePost = () => {
    if (!user) {
      toast.info("Please login to create a post");
      setShowAuthButtons({
        title: "Please login to create a post",
        message:"To be able to generate an image and share it with the community, you need to login first, please login to continue",
        type: "authenticate"
      })
    }
    if(user && user.status === "verification_pending"){
      toast.info("Please verify your email to create a post");
      setShowAuthButtons({
        title: "Please verify your email to create a post",
        message:"To be able to generate an image and share it with the community, you need to verify your email first, please verify your email to continue",
        type: "verify"
      })
    }

  };

  useEffect(() => {
    canUserCreatePost()
  }, [user]);
  


  const [form, setForm] = React.useState({
    name: "",
    prompt: "",
    photo: "",
  });
  useEffect(() => {
    if(!user) return;
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

  const AuthenticateButtons = () => {
    if(showAuthButtons.type === "authenticate"){
      return (
        <div className="mt-10 flex gap-10">
          <button
            className="text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      )
    }
    if(showAuthButtons.type === "verify"){
      return (
        <div className="mt-10">
          <button
            className="text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            onClick={() => navigate("/verify")}
          >
            Verify Email
          </button>
        </div>
      )
    }
    return null;
  }



  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          {showAuthButtons.title}
        </h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
          {showAuthButtons.message}
        </p>
      </div>
      { showAuthButtons.type ? <AuthenticateButtons /> :(
      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Ex., john doe"
            value={form.name}
            handleChange={handleChange}
            disabled
          />

          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImage && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImage ? "Generating..." : "Generate"}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            ** Once you have created the image you want, you can share it with
            others in the community **
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? "Sharing..." : "Share with the Community"}
          </button>
        </div>
      </form>
      )}
    </section>
  );
}

export default CreatePost;
