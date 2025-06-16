import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const InactivityLogout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const events = ["click", "mousemove", "keydown", "scroll"];
    const expireTime = 5 * 60 * 1000; //5 minutes

    const updateExpireTime = () => {
      localStorage.setItem("expireTime", Date.now() + expireTime);
    };

    const checkExpireTime = () => {
      const expireAt = localStorage.getItem("expireTime");
      if (expireAt && Date.now() > parseInt(expireAt)) {
        logout();
        navigate("/login");
      }
    };

    events.forEach((event) => window.addEventListener(event, updateExpireTime));
    updateExpireTime();
    const interval = setInterval(checkExpireTime, 10000);

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, updateExpireTime)
      );
      clearInterval(interval);
    };
  }, [logout, navigate]);
  return null;
};

export default InactivityLogout;
