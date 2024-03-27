import React, { useContext } from 'react';
import { ThemeContext } from '../../utils/contexts/theme/theme';

function SocialSeparator() {
  const { getTheme, theme } = useContext(ThemeContext);

  return (
    <div className="flex justify-center mt-4 relative social-separator">
      <p className={`text-[14px] z-10 px-4 inline-block social-separator-text ${getTheme('text')}`}
        style={{backgroundColor: theme === 'light' ? 'white' : 'black'}} 
      >
        {"Or continue with"}
      </p>
      <span className={`mx-2 w-full absolute top-1/2 z-0 -translate-y-1/2 social-separator-line bg-gray-300`}
        style={{ height: "1px" }}
      ></span>
    </div>
  );
}

export default SocialSeparator;
