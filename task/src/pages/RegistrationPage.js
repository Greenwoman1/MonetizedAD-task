import Register from "../components/register/Register";
import { useState , useEffect} from "react";
import { register, login } from "../api/api";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import Header from "../components/header/Header";
const RegistrationPage = () => {

  const navigate = useNavigate();
  useEffect (()=>{
    if(localStorage.getItem("token"))
    navigate("/");
  }, [])

  const [error, setError] = useState();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    repeatPassword: "",
    subscribeToNewsLetter: false,
    gender: "male",
    status: "active",
    yearOfBirth: 1990,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRegistration = async () => {
    try {
      try {
        await register(formData);
      } catch (error) {
        throw new Error(error);
      }
      try {
        const loginResponse = await login({
          username: formData.username,
          password: formData.password,
        });

        if (!loginResponse) {
          throw new Error("Login failed");
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
      navigate("/");
    } catch (error) {
      setError(
        "Please change username, Account with provided username already exists."
      );

      console.error("Error", error.message);
    }
  };

  return (
    <div>
      <Header></Header>
      {error && <div className="error-message">{error}</div>}
      { !localStorage.getItem("token") && <Register
        formData={formData}
        handleInputChange={handleInputChange}
        handleRegistration={handleRegistration}
      ></Register>}
    </div>
  );
};

export default RegistrationPage;
