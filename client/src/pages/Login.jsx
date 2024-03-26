import React, { useEffect } from "react";
import { useAuth } from "../utils/contexts/auth/auth";
import { FormField } from "../components";
import { Link } from "react-router-dom";
import { github_social, google_social, microsoft_social } from "../assets";
import SocialLogin from "../components/Buttons/SocialLogin";
import SocialSeparator from "../components/separator/SocialSeparator";
import { toast } from "react-toastify";
import VerifyForm from "../components/otp/VerifyForm";
import { useNavigate } from "react-router-dom";
function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [verification, setVerification] = React.useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleLoginRequest = async (e) => {
    e.preventDefault();
    if (email === "" || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error("Please enter a valid email address");
      return;
    }
    login({ email });
    setVerification(true);
    console.log("LOGIN REQUESTED ", email);
  };
 

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }
  , [user]);

  return (
    <div className="max-w-sm bg-white mx-auto py-10 px-8 rounded border shadow-sm">
      {verification ? (
        <VerifyForm email={email} />
      ) : (
        <>
          <h1 className="text-2xl font-semibold mb-4 text-center mt-2">
            Login
          </h1>
          <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px] text-center">
            Enter your email to receive a magic link to login.
          </p>
          <div className="flex flex-col space-y-2">
            <FormField
              type="email"
              name="email"
              value={email}
              handleChange={handleChange}
              placeholder="Your email address"
            />
          </div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded mt-4 w-full"
            type="button"
            onClick={handleLoginRequest}
          >
            Send Magic Link
          </button>
          <p className="text-[#666e75] text-[14px] max-w-[500px] text-center mt-4">
            You don&apos;t have an account?{" "}
            <Link to="/register" className="text-blue-500">
              Sign up
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
      )}
    </div>
  );
}

export default Login;
