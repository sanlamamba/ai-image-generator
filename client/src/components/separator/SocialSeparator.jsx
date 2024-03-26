import React from "react";

function SocialSeparator() {
  return (
    <div className="flex justify-center mt-4 relative social-separator">
      <p className="text-[#666e75] text-[14px] bg-white z-10 px-4 inline-block social-separator-text"
        style={{backgroundColor: "white"}}
      >
        {"Or continue with"}
      </p>
      <span className="mx-2 bg-gray-100 w-full absolute top-1/2 z-0 -translate-y-1/2 social-separator-line"
        style={{ height: "1px" }}
      ></span>
    </div>
  );
}

export default SocialSeparator;
