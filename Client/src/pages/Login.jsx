import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import bcrypt from "bcryptjs";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const { login, user, role } = useAuth();

  useEffect(() => {
    if (user) {
      navigate(role === "Admin" ? "/admin" : "/");
    }
  }, [user, role, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email);
    if (user && bcrypt.compareSync(password, user.passwordHash)) {
      const fakeToken = "example-token";
      login(user, fakeToken);
      navigate(user.role == "Admin" ? "/admin" : "/");
    } else {
      alert("Invalid Credentials");
      setEmail("");
      setpassword("");
    }
  };
  if (user) return null; // or return <p>Redirecting...</p>

  return (
    <>
      <div className="">
        <form onSubmit={handleLogin} className="">
          <h2 className="text-5xl font-bold pb-10 pt-23">Login</h2>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="p-2 w-[30%] border-3 border-blue-500 rounded-2xl focus:outline-none focus:border-blue-700 mb-2"
            required
          />
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            placeholder="Password"
            className="p-2 w-[30%] border-3 border-blue-500 rounded-2xl focus:outline-none focus:border-blue-700"
            required
          />
          <br />
          <button
            className=" mt-4 bg-blue-400 text-xl hover:bg-blue-500 border-blue-900 border-2 w-[10%] rounded-lg p-1"
            type="submit"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center text-lg text-gray-600">
          Don’t have an account?
          <Link
            to="/signup"
            className="text-blue-600 hover:underline font-medium"
          >
            {" "}
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
