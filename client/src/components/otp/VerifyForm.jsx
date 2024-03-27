import React, { useEffect, useState } from "react";
import OTPInput from "./OTPInput";
import { useAuth } from "../../utils/contexts/auth/auth";
import { useContext } from "react";
import { ThemeContext } from "../../utils/contexts/theme/theme";

function VerifyForm({ email }) {
  const [otp, setOtp] = useState(new Array(5).fill(""));
  const [otpError, setOtpError] = useState("");
  const [showResend, setShowResend] = useState(false); 
  const [countdown, setCountdown] = useState(59); 
  const { user, verifyOtp } = useAuth();
  const onComplete = () => {
    const otpValue = otp.join("");
    if (otpValue.length < 4) {
      setOtpError("Please enter a valid OTP");
      return;
    }
    console.log("USER EMAIL : ", email)
    verifyOtp({ email:email, otp: otpValue });

  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setCountdown((currentCountdown) => {
        if (currentCountdown > 1) {
          return currentCountdown - 1;
        } else {
          setShowResend(true);
          clearInterval(timerId); 
          return 0; 
        }
      });
    }, 1000);

    return () => clearInterval(timerId); 
  }, []);

  const requestOTP = async () => {
    
    
  };
  const OTPtimeout = () => {
    if (showResend) {
      return (
        <p className={`mt-4 ${getTheme('text')} text-[14px] max-w-[500px] text-center`}>
          Didn't receive the code?{" "}
          <button className={`${getTheme('link')}`} onClick={requestOTP}>
            Resend
          </button>
        </p>
      );
    } else {
      return (
        <p className={`mt-4 ${getTheme('text')} text-[14px] max-w-[500px] text-center`}>
          You can request a new code in{" "}
          <span className="font-semibold">
            {countdown + 1} seconds.
          </span>
        </p>
      );
    }
  };

  const {getTheme} = useContext(ThemeContext);

  return (
    <>
      <h1 className={`text-2xl font-semibold mb-4 text-center mt-2 ${getTheme('text')}`}>
        Verify your account
      </h1>
      <p className={`mt-2 mb-4 ${getTheme('text')} text-[14px] max-w-[500px] text-center`}>
        We have sent a verification code to your email: <strong>{email}</strong>
        . Please enter the code below to verify your account.
      </p>
      <OTPInput
        length={6}
        onComplete={onComplete}
        otp={otp}
        error={otpError}
        setOtp={setOtp}
        setError={setOtpError}
      />

      {OTPtimeout()}
      <button className={`${getTheme('button-primary')} py-2 px-4 rounded mt-4 w-full`}
        onClick={() => onComplete()}
      >
        Submit Code
      </button>
    </>
  );
}

export default VerifyForm;
