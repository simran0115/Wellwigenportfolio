import { useState, useEffect } from "react";
import axios from "axios";

function VendorDashboard() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  const [image, setImage] = useState(null);
  const [deliveries, setDeliveries] = useState([]);

  const API = "http://localhost:8000/api"; // later move to .env

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const res = await axios.get(`${API}/vendor/deliveries`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setDeliveries(res.data.deliveries || []);
      } catch (err) {
        console.error("Error fetching deliveries", err);
      }
    };
    fetchDeliveries();
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Basic validation
    if (!product.name || !product.price) {
      return alert("Please fill all required fields");
    }

    try {
      // ✅ Use FormData for image upload
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("quantity", product.quantity || 1);
      formData.append("image", image);

      await axios.post(`${API}/product/add`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product added successfully!");
    } catch (err) {
      console.log("Full error:", err);
      const errorMsg = err.response?.data?.message || err.message;
      alert("Error adding product: " + errorMsg);
    }
  };

  return (
    <div className="flex flex-col gap-8 md:flex-row max-w-6xl mx-auto mt-10 p-4">
      {/* Product Addition Panel */}
      <div className="flex-1 bg-white p-6 rounded shadow-md h-fit">
        <h2 className="text-2xl font-bold mb-6 text-[#0B5B77]">Add New Product</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="border p-2 rounded"
            name="name"
            placeholder="Product Name"
            onChange={handleChange}
          />
          <input
            className="border p-2 rounded"
            name="price"
            placeholder="Price"
            type="number"
            onChange={handleChange}
          />
          <input
            className="border p-2 rounded"
            name="quantity"
            placeholder="Quantity"
            type="number"
            onChange={handleChange}
          />
          <input 
            className="border p-2 rounded"
            type="file" 
            onChange={handleFile} 
          />
          <button type="submit" className="bg-[#0B5B77] text-white p-2 rounded mt-2 hover:bg-[#084960]">
            Add Product
          </button>
        </form>
      </div>

      {/* Deliveries Notification Panel */}
      <div className="flex-1 bg-white p-6 rounded shadow-md overflow-hidden flex flex-col">
        <h2 className="text-2xl font-bold mb-6 text-[#0B5B77]">Scheduled Deliveries</h2>
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {deliveries.length === 0 ? (
            <p className="text-gray-500">No scheduled deliveries.</p>
          ) : (
            deliveries.map((delivery, idx) => (
              <div key={idx} className="p-4 border border-gray-200 rounded-xl bg-gray-50 flex flex-col gap-2 relative">
                <span className={`absolute top-4 right-4 px-2 py-1 text-xs font-bold rounded-full ${
                  delivery.status === 'upcoming' ? 'bg-yellow-100 text-yellow-700' : 
                  delivery.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'
                }`}>
                  {delivery.status?.toUpperCase() || 'UNKNOWN'}
                </span>
                <p className="text-sm font-semibold text-gray-800">Delivery ID: {delivery._id?.slice(-6).toUpperCase()}</p>
                <p className="text-sm text-gray-600">Date: {new Date(delivery.deliveryDate).toLocaleDateString()}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default VendorDashboard;