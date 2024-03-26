import React, { useEffect } from "react";
import { useAuth } from "../utils/contexts/auth/auth";
import { FormField, Loader } from "../components";
import { Link } from "react-router-dom";
import { github_social, google_social, microsoft_social } from "../assets";
import SocialLogin from "../components/Buttons/SocialLogin";
import VerifyForm from "../components/otp/VerifyForm";
import { useNavigate } from "react-router-dom";
import SocialSeparator from "../components/separator/SocialSeparator";

function Register() {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
  });

  const { user, register, loading } = useAuth();
  const [verification, setVerification] = React.useState(false);

  const navigate = useNavigate()

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (
      form.name === "" ||
      form.email === "" ||
      !form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    ) {
      alert("Please fill in all fields");
      return;
    }
    await register(form);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const VerificationProcess = () => {
    if(user && (user.status === "verification_pending" || !user.isEmailVerified)){
      return <VerifyForm email={form.email} />
    }

    
  }


  useEffect(() => {
    if(user && user.isEmailVerified){
      navigate("/")
    }
  }, [user]);

  return (
    <div className="max-w-sm bg-white mx-auto py-10 px-8 rounded border shadow-sm">
      {!user ? (
        <>
          <h1 className="text-2xl font-semibold mb-4 text-center mt-2">
            Register
          </h1>
          <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px] text-center">
            Enter your information to create an account.
          </p>
          <form>
            <div className="flex flex-col space-y-2">
              <FormField
                type={"text"}
                placeholder={"Enter your name"}
                value={form.name}
                handleChange={handleChange}
                name={"name"}
              />
              <FormField
                type={"email"}
                placeholder={"Enter your email"}
                value={form.email}
                handleChange={handleChange}
                name={"email"}
              />
            </div>
            {loading ? (
              <div className="flex justify-center mt-4">
                <Loader />
              </div>
            ) : (
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded mt-4 w-full"
                onClick={handleRegisterSubmit}
                type="button"
              >
                Send Magic Link
              </button>
            )}
          </form>
          <p className="text-[#666e75] text-[14px] max-w-[500px] text-center mt-4">
            You already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
          <SocialSeparator />
          
          <div className="flex justify-center mt-4 flex-col gap-2">
            <SocialLogin icon={google_social} text={"Continue with Google"} />
            <SocialLogin
              icon={microsoft_social}
              text={"Continue with Microsoft"}
            />
            <SocialLogin icon={github_social} text={"Continue with Github"} />
          </div>
        </>
      ) : (
        <VerificationProcess />
      )}
    </div>
  );
}

export default Register;
