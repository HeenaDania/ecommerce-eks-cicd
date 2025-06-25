import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">AWESOME BOOKSTORE</div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/cart">Cart</a></li>
        {user && (
          <li>
            <button className="signout-btn" onClick={handleSignOut}>
              Sign Out
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
