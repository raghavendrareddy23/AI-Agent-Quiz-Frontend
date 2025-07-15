import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function Header() {
  const { username, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <Link to="/dashboard">
          <h1 className="text-2xl font-bold text-indigo-600 cursor-pointer">
            AI-Agent-Quiz
          </h1>
        </Link>

        {/* Hamburger Menu (Mobile Only) */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-indigo-600 focus:outline-none"
          >
            {menuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center text-gray-700 font-medium">
          {!username && (
            <Link to="/" className="hover:text-indigo-600 transition">
              Home
            </Link>
          )}
          {/* {username && (
            <Link to="/dashboard" className="hover:text-indigo-600 transition">
              Dashboard
            </Link>
          )} */}
          {username && (
            <Link
              to="/dashboard/create"
              className="hover:text-indigo-600 transition"
            >
              Create Quiz
            </Link>
          )}
          <Link to="/leaderboard" className="hover:text-indigo-600 transition">
            View Leaderboard
          </Link>

          {!username && (
            <Link to="/signup" className="hover:text-indigo-600 transition">
              Signup
            </Link>
          )}
          {username && (
            <span className="text-indigo-500 font-semibold">
              Welcome {username}
            </span>
          )}
          {username ? (
            <button
              onClick={handleLogout}
              className="text-red-500 hover:underline"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="hover:text-indigo-600 transition">
              Login
            </Link>
          )}
        </nav>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="md:hidden flex flex-col gap-4 bg-white px-6 py-4 text-gray-700 font-medium animate-slide-down shadow-md">
          {username && (
            <span className="text-indigo-500 font-semibold">
              Welcome {username}
            </span>
          )}
          {!username && (
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          )}
          {/* {username && (
            <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
              Dashboard
            </Link>
          )} */}
          {username && (
            <Link to="/dashboard/create" onClick={() => setMenuOpen(false)}>
              Create Quiz
            </Link>
          )}
          <Link
            to="/leaderboard"
            className="text-indigo-600 font-medium hover:underline"
          >
            View Leaderboard
          </Link>
          {!username && (
            <Link to="/signup" onClick={() => setMenuOpen(false)}>
              Signup
            </Link>
          )}
          {username ? (
            <button onClick={handleLogout} className="text-red-500">
              Logout
            </button>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}

export default Header;
