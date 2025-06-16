import { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import InactivityLogout from "./components/InactivityLogout";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <InactivityLogout />
      <Navbar />
      <AppRoutes />
    </>
  );
}

export default App;
