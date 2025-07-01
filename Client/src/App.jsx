import { useState } from "react";
import "./App.css";
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
