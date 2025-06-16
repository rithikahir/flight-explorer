import { createContext, useContext, useState } from "react";
import { useFlight } from "./FlightContext";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );
  const [role, setRole] = useState(() => localStorage.getItem("role") || null);

  const login = (userData, tokenValue) => {
    setUser(userData);
    setToken(tokenValue);
    setRole(userData.role);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenValue);
    localStorage.setItem("role", userData.role);
  };

  const logout = () => {
    setUser("");
    setToken("");
    setRole("");
    // localStorage.clear();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  return (
    <>
      <AuthContext.Provider value={{ user, token, role, login, logout }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
