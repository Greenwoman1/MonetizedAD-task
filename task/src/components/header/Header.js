import { Link } from "react-router-dom";
import { useState } from "react";
import "./header.css"; 
import { useNavigate } from "react-router-dom";
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("userData")
  );
  const userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/");
    setIsLoggedIn(false);
  };

  return (
    <div className="header-container">
      <Link to="/" className="nav-link">
        Home
      </Link>
      {isLoggedIn ? (
        <>
          <Link to="/product" className="nav-link">
            Products
          </Link>
          <span className="user-info">{`User ID: ${userData.id}, Username: ${userData.username}`}</span>
          <button className="logout-button" onClick={handleLogOut}>
            Logout
          </button>
        </>
      ) : (
        <div>
          <Link to="/register" className="nav-link">
            Register
          </Link>
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
