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
    yearOfBirth : 1990,
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
      const registrationResponse = await register(formData);
      console.log(JSON.stringify(registrationResponse))
      if (!registrationResponse){
        
        throw new Error("ne velja")
      }
    } catch (error) {
      throw new Error ("error: ", error.message);
    }
    try {
      
      const loginResponse = await login({username: formData.username, password: formData.password})

      if (!loginResponse) {
        throw new Error("Login failed");
      }
      
      
    } catch (error) {
      console.error("Error:", error.message);
    }
    navigate("/")
  }
  catch(error){
    console.error("Error", error.message)
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
