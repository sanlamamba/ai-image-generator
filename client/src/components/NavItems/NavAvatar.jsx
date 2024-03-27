import { useContext } from "react";
import { useAuth } from "../../utils/contexts/auth/auth";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../utils/contexts/theme/theme";

function NavAvatar() {
  const { user, logout } = useAuth(); // Assuming you have a logout method in your auth context
  const {getTheme } = useContext(ThemeContext);

  return (
    <div className="hidden sm:flex items-center space-x-4">
      {user ? (
        <div className={`flex items-center ${getTheme('bg-secondary')} rounded-lg p-2`}>
          <span className={`inline-block h-10 w-10 rounded-full overflow-hidden ${getTheme('bg')}`}>
            <svg
              className={`h-full w-full ${getTheme('text')}`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.188l-8-5.625v-7.82c0-1.04-.81-1.88-1.85-1.88h-4.3c-1.04 0-1.85.84-1.85 1.88v7.82l-8 5.625V22h24v-1.812zM12 13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5z" />
            </svg>
          </span>
          <div className="ml-3">
            <p className={`text-sm font-medium ${getTheme('text')}`}>
              {user?.name} (
              <button
                onClick={logout}
                className={`text-xs font-medium ${getTheme('link')}`}
              >
                Logout
              </button>
              )
            </p>
            <p className={`text-xs font-medium ${getTheme('text')}`}>{user?.email}</p>
          </div>
        </div>
      ) : (
        <Link to="/register" className={`font-inter font-semibold px-4 py-2 rounded-md border ${getTheme('border')} ${getTheme('text')} hover:${getTheme('bg-secondary')} transition-all`}>
          Authenticate
        </Link>
      )}
    </div>
  );
}

export default NavAvatar;