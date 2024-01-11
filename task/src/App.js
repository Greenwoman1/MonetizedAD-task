import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import Content from "./components/Content";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route path="/product" element={<Content></Content>}></Route>
          <Route
            path="/register"
            element={<RegistrationPage></RegistrationPage>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
