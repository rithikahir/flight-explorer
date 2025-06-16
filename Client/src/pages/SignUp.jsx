import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import bcrypt from "bcryptjs";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  // const { user, role } = useAuth();
  // useEffect(() => {
  //   if (user) {
  //     navigate(role === "Admin" ? "/admin" : "/");
  //   }
  // }, [user, role, navigate]);

  const handleSignUp = (e) => {
    e.preventDefault();

    const passwordHash = bcrypt.hashSync(password, 10);
    const newUser = { email, passwordHash, role };
    const users = JSON.parse(localStorage.getItem("users")) || [];
    console.log(users);
    const exists = users.find((u) => u.email === email);

    if (exists) {
      alert("User already exists");
      return;
    }

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup Succesfull. Please login.");
    navigate("/login");
  };
  // if (user) return null; // or return <p>Redirecting...</p>

  return (
    <>
      <form onSubmit={handleSignUp}>
        <h2 className="text-5xl font-bold pb-10 pt-23">Sign Up</h2>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="p-2 w-[30%] border-3 border-blue-500 rounded-2xl focus:outline-none focus:border-blue-700 mb-2"
        />{" "}
        <br />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-2 w-[30%] border-3 border-blue-500 rounded-2xl focus:outline-none focus:border-blue-700 mb-2"
        />
        <br />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-[10%] p-1 border-blue-700 border-2 rounded-xl"
        >
          <option value="" disabled hidden>
            Select Role
          </option>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
        <br />
        <button
          type="submit"
          className="mt-4 bg-blue-400 text-xl hover:bg-blue-500 border-blue-900 border-2 w-[10%] rounded-lg p-1"
        >
          Sign Up
        </button>
      </form>
      <div className="mt-4 text-lg text-gray-600">
        Already have an Account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline font-medium">
          {" "}
          Login
        </Link>
      </div>
    </>
  );
};

export default SignUp;
