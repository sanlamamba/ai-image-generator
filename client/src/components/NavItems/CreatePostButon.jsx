import { useContext, useEffect, useState } from "react"; // Make sure to import useState
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ThemeContext } from "../../utils/contexts/theme/theme";
import { plusIcon } from "../../assets";

function CreatePostButton() {
  const { getTheme } = useContext(ThemeContext);
  const location = useLocation()
  const [isHovered, setIsHovered] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);




  const toggleHover = () => setIsHovered(!isHovered);

  // Define the initial and animate properties for the text
  const textVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const linkVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };


  useEffect(() => {
    console.log(location.pathname)
    if (location.pathname == "/create-post" || location.pathname == "/login" || location.pathname == "/register" || location.pathname == "/verify") {
      setShouldShow(false);
    } else {
      setShouldShow(true);
    }
  }
    , [location]);
    if (!shouldShow) {
      return null;
    }

  return (
 
    <Link
      to="/create-post"
      className="fixed z-10 bottom-4 right-4 justify-center align-center flex items-center"
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
    >
      <motion.span
        className="absolute transform -translate-x-2/3 whitespace-nowrap bg-white p-3 pr-5  z-10"
        variants={textVariants}
        animate={isHovered ? "visible" : "hidden"} // Use the isHovered state to control the animation
      >
        Create Post
      </motion.span>
      <span className=" bg-white p-4 rounded-full z-20 shadow-lg border-gray-300">
        <img src={plusIcon} alt="Create Post" className="w-8 h-8 " />
      </span>
    </Link>
  );
}

export default CreatePostButton;
