import axios from "axios";
import { jwtDecode } from "jwt-decode";
export const register = async (formData) => {
  try {
    const response = await axios.post(
      "https://junior-test.mntzdevs.com/api/register/",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error during registration:", error.message);
    throw error;
  }
};

export const login = async (data) => {
  try {
    let user_data = {
      username: "",
      id: "",
    };
    const response = await axios.post(
      "https://junior-test.mntzdevs.com/api/login/",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    localStorage.setItem("token", response.data.jwt);
    const res = await decodeToken(localStorage.token);
    user_data = {
      username: res.username,
      id: res.id,
    };
    localStorage.setItem(
      "userData",
      JSON.stringify({
        username: user_data.username,
        id: user_data.id,
      })
    );

    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Login failed");
  }
};

export const decodeToken = async (token) => {
  if (token) {
    try {
      const decoded = await jwtDecode(token);

      if (decoded) {
        return decoded;
      } else {
        console.error("Error decoding token");
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }
};

export const getProduct = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token not available");
    }
    const response = await axios.get(
      "https://junior-test.mntzdevs.com/api/products/",
      {
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error GETTING DATA:", error);
  }
};
