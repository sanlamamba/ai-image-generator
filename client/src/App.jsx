import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Home, CreatePost, Login } from "./pages";

import { logo } from "./assets";
import Register from "./pages/Register";
import NavAvatar from "./components/Avatar/NavAvatar";
import OTPPage from "./pages/OTPPage";
export default function App() {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-28 object-contain" />
        </Link>
        <nav className="flex gap-5">
          <NavAvatar />

          <Link
            to="/create-post"
            className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
          >
            Create Post
          </Link>
        </nav>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<OTPPage />} />
        </Routes>
      </main>
      <footer className="w-full bg-white border-t border-b-[#e6ebf4] py-4 px-4 text-center">
        <p className="text-[#666e75] text-[14px]">
          Made with ❤️ by{" "}
          <a
            href="https://sanlamamba.com"
            target="_blank"
            rel="noreferrer"
            className="text-blue-500"
          >
            San Lamamba P.
          </a>
        </p>
      </footer>
    </BrowserRouter>
  );
}
