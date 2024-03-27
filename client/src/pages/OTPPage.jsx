import React, { useEffect } from "react";
import { useAuth } from "../utils/contexts/auth/auth";
import { FormField, Loader } from "../components";
import { Link } from "react-router-dom";
import { github_social, google_social, microsoft_social } from "../assets";
import SocialLogin from "../components/Buttons/SocialLogin";
import VerifyForm from "../components/otp/VerifyForm";
import { useNavigate } from "react-router-dom";
import SocialSeparator from "../components/separator/SocialSeparator";
import { useContext } from "react";
import { ThemeContext } from "../utils/contexts/theme/theme";

function OTPPage() {
  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/register");
    }
    if (user && user.isEmailVerified) {
      navigate("/");
    }
  }, [user]);

  const { getTheme } = useContext(ThemeContext);

  return (
    <div
      className={`max-w-sm mx-auto py-10 px-8 rounded border shadow-sm ${getTheme(
        "bg"
      )} ${getTheme("border")}`}
    >
      <VerifyForm email={user.email} />
    </div>
  );
}

export default OTPPage;
