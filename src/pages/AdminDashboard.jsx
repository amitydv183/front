import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  const fetch = async () => {
    try {
      const res = await API.get("/order");
      setOrders(res.data);
    } catch (err) {
      console.log("No access or error");
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const markDelivered = async (id) => {
    try {
      await API.put(`/order/${id}/deliver`);
      setOrders(
        orders.map((o) => (o._id === id ? { ...o, isDelivered: true } : o))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container my-5">
      <h3>Admin Dashboard</h3>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Total</th>
            <th>Delivered</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._1d}>
              <td>{o._id}</td>
              <td>{o.user?.email}</td>
              <td>₹{o.totalPrice}</td>
              <td>{o.isDelivered ? "Yes" : "No"}</td>
              <td>
                {!o.isDelivered && (
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => markDelivered(o._id)}
                  >
                    Mark Delivered
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
