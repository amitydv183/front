import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function Orders() {
  const [myOrders, setMyOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);

  const fetchMy = async () => {
    try {
      const res = await API.get("/order/myorders");
      setMyOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAll = async () => {
    try {
      const res = await API.get("/order"); // admin route
      setAllOrders(res.data);
    } catch (err) {
      // not admin or unauthorized
      console.log("No admin access");
    }
  };

  useEffect(() => {
    fetchMy();
    fetchAll();
  }, []);

  return (
    <div className="container my-5">
      <h3>My Orders</h3>
      <ul className="list-group mb-4">
        {myOrders.map((o) => (
          <li className="list-group-item" key={o._id}>
            {o.orderItems.map((i) => i.name).join(", ")} — ₹{o.totalPrice}
          </li>
        ))}
      </ul>

      <h3>All Orders (Admin)</h3>
      <ul className="list-group">
        {allOrders.map((o) => (
          <li className="list-group-item" key={o._id}>
            {o.user?.email} — ₹{o.totalPrice} —{" "}
            {o.isDelivered ? "Delivered" : "Pending"}
          </li>
        ))}
      </ul>
    </div>
  );
}
