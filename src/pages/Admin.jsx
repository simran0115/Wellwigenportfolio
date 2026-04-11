import React, { useEffect, useState } from "react";

const Admin = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/consultation")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ backgroundColor: "white", color: "black", padding: "20px" }}>
      <h1 style={{ fontSize: "30px", fontWeight: "bold" }}>
        Admin Panel 🔥
      </h1>

      {data.length === 0 ? (
        <p>No Data Found</p>
      ) : (
        data.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid black",
              margin: "10px 0",
              padding: "10px",
            }}
          >
            <p><strong>Name:</strong> {item.name}</p>
            <p><strong>Email:</strong> {item.email}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Admin;