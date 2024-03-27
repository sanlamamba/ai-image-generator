import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Home, CreatePost, Login } from "./pages";

import { logo } from "./assets";
import Register from "./pages/Register";
import NavAvatar from "./components/NavItems/NavAvatar";
import OTPPage from "./pages/OTPPage";
import { useContext } from "react";
import { ThemeContext } from "./utils/contexts/theme/theme";
import ThemeToggle from "./components/NavItems/ThemeToggle";

export default function App() {
  const {theme, toggleTheme, getTheme} = useContext(ThemeContext);

  return (
    <BrowserRouter>
      <header className={`w-full flex justify-between items-center sm:px-8 px-4 py-4 border-b ${getTheme('bg')} ${getTheme('border')}`}>
        <Link to="/">
          <img src={logo} alt="Logo" className="w-28 object-contain" />
        </Link>
        <nav className="flex gap-5 sm:flex-row flex-col">
          <NavAvatar />
          <Link
            to="/create-post"
            className={`font-inter font-medium ${getTheme('button-primary')} px-4 py-2 rounded-md`}
          >
            Create Post
          </Link>
          <ThemeToggle/>
        </nav>
      </header>
      <main className={`sm:p-8 px-4 py-8 w-full ${getTheme('bg-secondary')} min-h-[calc(100vh-73px)]`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<OTPPage />} />
        </Routes>
      </main>
      <footer className={`w-full ${getTheme('bg')} border-t ${getTheme('border')} py-4 px-4 text-center`}>
        <p className={`${getTheme('text')}`}>
          Made with ❤️ by{" "}
          <a
            href="https://sanlamamba.com"
            target="_blank"
            rel="noreferrer"
            className={`${getTheme('link')}`}
          >
            San Lamamba P.
          </a>
        </p>
      </footer>
    </BrowserRouter>
  );
}