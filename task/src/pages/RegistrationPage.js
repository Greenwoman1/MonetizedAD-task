import Register from "../components/Register";
import { useState } from "react";
import { register, login } from "../api/api";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";

const RegistrationPage = () => {

const navigate = useNavigate()
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
      const registrationResponse = register(formData);

      if (!registrationResponse.ok) {
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
    try {
      const loginResponse = login({username: formData.username, password: formData.password})

      if (!loginResponse.ok) {
        throw new Error("Login failed");
      }
      navigate('/')
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <Register
        formData={formData}
        handleInputChange={handleInputChange}
        handleRegistration={handleRegistration}
      ></Register>
    </div>
  );
};

export default RegistrationPage;
