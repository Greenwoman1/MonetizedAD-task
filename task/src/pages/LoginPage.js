import Header from "../components/header/Header";
import Login from "../components/login/Login";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
const LoginPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/");
  }, []);

  return (
    <div>
      <Header></Header>

      {!localStorage.getItem("token") && <Login></Login>}
    </div>
  );
};

export default LoginPage;
