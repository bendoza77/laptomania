import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";


import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Products from "./pages/Products";
import Nav from "./components/UI/Nav";


const App = () => {

  return (
    <>
    <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    <ToastContainer position="bottom-right" />
    </>
  );



}

export default App
