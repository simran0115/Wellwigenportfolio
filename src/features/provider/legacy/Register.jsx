import { useState } from "react";
import axios from "axios";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    storeName: "",
    storeAddress: "",
    phone: "",
  });

  const API = import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}/api` : "http://localhost:8000/api";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.storeName) {
      return alert("Please fill all required fields");
    }

    try {
      await axios.post(`${API}/vendor/register`, form);

      alert("Application submitted! Wait for admin approval.");
    } catch (err) {
      console.log("Full error:", err);
      const errorMsg = err.response?.data?.message || err.message;
      alert("Error in register: " + errorMsg);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Apply as Vendor</h2>

      <input name="name" placeholder="Your Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <input
        name="storeName"
        placeholder="Store Name"
        onChange={handleChange}
      />

      <input
        name="storeAddress"
        placeholder="Store Address"
        onChange={handleChange}
      />

      <input
        name="phone"
        placeholder="Phone Number"
        onChange={handleChange}
      />

      <button type="submit">Apply</button>
    </form>
  );
}

export default Register;