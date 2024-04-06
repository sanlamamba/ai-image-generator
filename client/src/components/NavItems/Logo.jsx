import { useContext } from "react";
import { Link } from "react-router-dom";
import { logo_dark, logo_light } from "../../assets";
import { ThemeContext } from "../../utils/contexts/theme/theme";
import { motion, AnimatePresence } from "framer-motion";

function Logo() {
  const { theme } = useContext(ThemeContext);

  const logoVariants = {
    hidden: { opacity: 0, transition: { duration: 0.5 } },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <Link to="/">
      <div className="flex gap-2">
        <AnimatePresence mode="popLayout">
          {theme === 'light' ? (
            <motion.img
              key="light-logo"
              src={logo_light}
              alt="Logo"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={logoVariants}
              className="w-48 object-contain"
            />
          ) : (
            <motion.img
              key="dark-logo"
              src={logo_dark}
              alt="Logo"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={logoVariants}
              className="w-48 object-contain"
            />
          )}
        </AnimatePresence>
      </div>
    </Link>
  );
}

export default Logo;
