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
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="aurora-gradient animate-aurora absolute inset-0 opacity-80" />
        <div className="starfield animate-stars absolute inset-0" />
        <div className="absolute -top-32 left-20 h-80 w-80 rounded-full bg-indigo-500/40 blur-[140px] mix-blend-screen animate-blob" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-500/40 blur-[150px] mix-blend-screen animate-blob" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/30 blur-[150px] mix-blend-screen animate-blob" style={{ animationDuration: "16s" }} />
      </div>

      <Nav />
      <main className="relative z-10 px-4 pb-16 pt-8 lg:px-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </main>

      <ToastContainer position="bottom-right" theme="dark" />
    </div>
  );
};

export default App;
