import React from "react";
import { useAuth } from "../../utils/contexts/auth/auth";
import { Link } from "react-router-dom";

function NavAvatar() {
  const { user, logout } = useAuth(); // Assuming you have a logout method in your auth context

  return (
    <div className="flex items-center space-x-4">
      {user ? (
        <div className="flex items-center">
          <span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
            <svg
              className="h-full w-full text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.188l-8-5.625v-7.82c0-1.04-.81-1.88-1.85-1.88h-4.3c-1.04 0-1.85.84-1.85 1.88v7.82l-8 5.625V22h24v-1.812zM12 13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5z" />
            </svg>
          </span>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">
              {user?.name} ({" "}
              <button
                onClick={logout}
                className="text-xs font-medium text-red-500"
              >
                Logout
              </button>{" "}
              )
            </p>
            <p className="text-xs font-medium text-gray-500">{user?.email}</p>
          </div>
        </div>
      ) : (
        <Link to={"/register"} className="font-inter font-semibold px-4 py-2 rounded-md border text-gray-500 hover:text-gray-900 hover:bg-gray-50 hover:border-gray-300 transition-all">
          Authenticate
        </Link>
      )}
    </div>
  );
}

export default NavAvatar;
