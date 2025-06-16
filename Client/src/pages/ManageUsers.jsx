import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { user, role, logout } = useAuth();

  useEffect(() => {
    if (!user || role !== "Admin") {
      navigate("/login");
    } else {
      const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
      setUsers(savedUsers);
      console.log(users);
    }
  }, [user, navigate, role]);

  const handleDelete = (emailToDelete) => {
    const userToDelete = users.find((u) => u.email === emailToDelete);

    if (!userToDelete) return;

    if (userToDelete.role === "Admin" && user.email !== emailToDelete) {
      alert("You cannot delete Other Admin");
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${emailToDelete}?`
    );
    if (!confirmDelete) return;

    const updateUser = users.filter((u) => u.email !== emailToDelete);
    localStorage.setItem("users", JSON.stringify(updateUser));
    setUsers(updateUser);

    if (user.email === emailToDelete) {
      logout();
      navigate("/login");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
      <div>
        {users.length === 0 ? (
          <p>No registered Users Found.</p>
        ) : (
          users.map((u, i) => (
            <div
              key={i}
              className="flex justify-between border p-3 rounded-xl shadow-sm mb-2"
            >
              <div>
                <p className="font-medium text-left">Email: {u.email}</p>
                <p className="text-sm text-gray-700">Role: {u.role}</p>
              </div>
              <button
                onClick={() => handleDelete(u.email)}
                className={`px-4 py-2 rounded text-white ${
                  u.role === "Admin" && u.email !== user.email
                    ? "bg-gray-400 curson-not-allowed"
                    : " bg-red-500 hover:bg-red-600"
                }`}
                disabled={u.role === "Admin" && u.email !== user.email}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
