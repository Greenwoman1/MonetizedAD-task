import {  login } from "../../api/api";
import {  useState } from "react";
import {
  useNavigate,
  useLocation,
} from "react-router-dom/dist/umd/react-router-dom.development";
import "./login.css";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const loginUser = async () => {
    try {
      await login({ username, password });

      if (!localStorage.getItem("token")) {
        throw new Error("Login failed");
      }

      const fromPathname = location.state?.from || "/";
      navigate(fromPathname);
      console.log("Login successful");
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <label className="form-label">
        Username:
        <input
          className="form-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />
      <label className="form-label">
        Password:
        <input
          className="form-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button className="form-button" type="submit">
        Login
      </button>
    </form>
  );
};

export default Login;
