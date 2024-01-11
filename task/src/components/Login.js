import { decodeToken, login } from "../api/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();



  const loginUser = async () => {
    try {
        await login({ username, password });
    
        if (!localStorage.getItem('token')) {
          throw new Error("Login failed");
        }
        
        console.log(localStorage.getItem('userData'));
        navigate('/')
        console.log("Login successful");
      } catch (error) {
        console.error("Error during loginnnnnnnn:", error.message);
      }
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
