import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('userData'));

    const userData = JSON.parse(localStorage.getItem('userData'));
    const handleLogOut = () => {

        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        setIsLoggedIn(false);

    }
return (

    <div>
    <Link to="/">Home</Link>
    {isLoggedIn ? (
      <>
        <Link to="/product">Products</Link>
        <span>{`User ID: ${userData.id}, Username: ${userData.username}`}</span>
        <button onClick = {handleLogOut}>Logout</button>
      </>
    ) : (
      <Link to="/login">Login</Link>
    )}
  </div>

)


}


export default Header;