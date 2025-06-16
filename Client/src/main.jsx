import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import AuthProvider from "./context/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { FlightProvider } from "./context/FlightContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <FlightProvider>
        <App />
      </FlightProvider>
    </AuthProvider>
  </BrowserRouter>
);
