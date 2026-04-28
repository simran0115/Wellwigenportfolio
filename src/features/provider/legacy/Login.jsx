import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const API = import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}/api` : "http://localhost:8000/api";
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return alert("Please fill all fields");
    }

    try {
      const res = await axios.post(`${API}/vendor/login`, form);

      // ✅ Save token and info
      localStorage.setItem("vendorToken", res.data.token);
      localStorage.setItem("vendorInfo", JSON.stringify(res.data.vendor));

      // ✅ Optional: save vendor status
      localStorage.setItem("vendorStatus", res.data.vendor.status);

      setSuccess("Login successful");
      setError("");

      // 👉 redirect
      navigate("/vendor/dashboard");

    } catch (err) {
      console.log(err);

      const errorMsg =
        err.response?.data?.message || err.message || "Login failed";

      setError(errorMsg);
      setSuccess("");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-4">Vendor Login</h2>

        {error && <div className="p-3 bg-red-100 text-red-700 rounded">{error}</div>}
        {success && <div className="p-3 bg-green-100 text-green-700 rounded">{success}</div>}

        <input
          className="border p-2 rounded"
          name="email"
          value={form.email}
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          className="border p-2 rounded"
          name="password"
          type="password"
          value={form.password}
          placeholder="Password"
          onChange={handleChange}
        />

        <button type="submit" className="bg-blue-600 text-white p-2 rounded mt-2 hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;