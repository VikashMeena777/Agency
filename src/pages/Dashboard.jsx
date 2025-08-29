import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [showChange, setShowChange] = useState(false);
  const [editForm, setEditForm] = useState({ name: "" });
  const [changeForm, setChangeForm] = useState({ oldPassword: "", newPassword: "" });
  const navigate = useNavigate();

  // Dummy order data
  const dummyOrders = [
    { id: 1, name: "Order #1", status: "Completed" },
    { id: 2, name: "Order #2", status: "Pending" },
    { id: 3, name: "Order #3", status: "Shipped" },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const res = await fetch("/api/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data.user);
          setOrders(dummyOrders);
        } else {
          toast.error("Session expired, please login again");
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch {
        toast.error("Failed to fetch user");
        navigate("/login");
      }
      setLoading(false);
    };
    fetchUser();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out");
    navigate("/login");
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("/api/auth/edit-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: editForm.name }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Profile updated!");
        setUser((u) => ({ ...u, name: editForm.name }));
        setShowEdit(false);
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Failed to update profile");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(changeForm),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Password changed!");
        setShowChange(false);
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Failed to change password");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <span className="loader text-white text-xl">Loading...</span>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center py-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/20 backdrop-blur-xl rounded-xl p-8 w-full max-w-2xl shadow-xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-white text-center">
          Welcome, {user?.name}
        </h2>
        <motion.div
          className="flex flex-col md:flex-row gap-6 mb-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.3 } },
          }}
        >
          <motion.div
            className="flex-1 bg-white/40 rounded-lg p-6 shadow-md mb-4 md:mb-0"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-lg font-semibold mb-2 text-indigo-700">User Info</h3>
            <div className="text-gray-900">
              <div>Name: {user?.name}</div>
              <div>Email: {user?.email}</div>
            </div>
            <div className="mt-4 flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "#6366f1" }}
                className="px-4 py-1 bg-indigo-500 text-white rounded transition-colors"
                onClick={() => { setShowEdit(true); setEditForm({ name: user.name }) }}
              >
                Edit Profile
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "#ec4899" }}
                className="px-4 py-1 bg-pink-500 text-white rounded transition-colors"
                onClick={() => { setShowChange(true); setChangeForm({ oldPassword: "", newPassword: "" }) }}
              >
                Change Password
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "#a78bfa" }}
                className="px-4 py-1 bg-purple-500 text-white rounded transition-colors"
                onClick={logout}
              >
                Logout
              </motion.button>
            </div>
          </motion.div>
          <motion.div
            className="flex-1 bg-white/40 rounded-lg p-6 shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-lg font-semibold mb-2 text-indigo-700">Orders</h3>
            <AnimatePresence>
              {orders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white/60 rounded mb-2 p-3 shadow flex justify-between items-center"
                >
                  <span>{order.name}</span>
                  <span className="font-semibold text-indigo-600">{order.status}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Edit Profile Modal */}
        <AnimatePresence>
          {showEdit && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/25"
            >
              <motion.div className="bg-white p-6 rounded shadow-xl min-w-[300px]">
                <h2 className="font-bold mb-2">Edit Profile</h2>
                <form onSubmit={handleEdit}>
                  <input
                    type="text"
                    name="name"
                    className="w-full mb-3 px-2 py-1 border rounded"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ name: e.target.value })}
                  />
                  <button
                    type="submit"
                    className="bg-indigo-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEdit(false)}
                    className="bg-gray-300 px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Change Password Modal */}
        <AnimatePresence>
          {showChange && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/25"
            >
              <motion.div className="bg-white p-6 rounded shadow-xl min-w-[300px]">
                <h2 className="font-bold mb-2">Change Password</h2>
                <form onSubmit={handleChangePassword}>
                  <input
                    type="password"
                    name="oldPassword"
                    placeholder="Current Password"
                    className="w-full mb-3 px-2 py-1 border rounded"
                    value={changeForm.oldPassword}
                    onChange={(e) => setChangeForm({ ...changeForm, oldPassword: e.target.value })}
                  />
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    className="w-full mb-3 px-2 py-1 border rounded"
                    value={changeForm.newPassword}
                    onChange={(e) => setChangeForm({ ...changeForm, newPassword: e.target.value })}
                  />
                  <button
                    type="submit"
                    className="bg-pink-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowChange(false)}
                    className="bg-gray-300 px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
