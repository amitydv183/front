import React, { useState } from "react";
import API from "../services/api";

export default function Checkout() {
  const [items, setItems] = useState([
    { product: "", name: "", qty: 1, price: 0 },
  ]);
  const [shipping, setShipping] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [msg, setMsg] = useState("");

  const addItemRow = () =>
    setItems([...items, { product: "", name: "", qty: 1, price: 0 }]);
  const updateItem = (i, key, val) => {
    const copy = [...items];
    copy[i][key] = val;
    setItems(copy);
  };

  const handlePlace = async (e) => {
    e.preventDefault();
    const totalPrice = items.reduce(
      (s, it) => s + it.qty * Number(it.price || 0),
      0
    );
    try {
      await API.post("/order", {
        orderItems: items,
        shippingAddress: shipping,
        paymentMethod,
        totalPrice,
      });
      setMsg("Order placed");
      setItems([{ product: "", name: "", qty: 1, price: 0 }]);
      setShipping({ address: "", city: "", postalCode: "", country: "" });
    } catch (err) {
      setMsg(err.response?.data?.message || "Order failed");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-3">Checkout</h2>
      {msg && <div className="alert alert-info">{msg}</div>}
      <form onSubmit={handlePlace}>
        <h5>Items</h5>
        {items.map((it, idx) => (
          <div className="row g-2 mb-2" key={idx}>
            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Product ID"
                value={it.product}
                onChange={(e) => updateItem(idx, "product", e.target.value)}
                required
              />
            </div>
            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Name"
                value={it.name}
                onChange={(e) => updateItem(idx, "name", e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <input
                className="form-control"
                placeholder="Qty"
                type="number"
                value={it.qty}
                onChange={(e) => updateItem(idx, "qty", e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <input
                className="form-control"
                placeholder="Price"
                type="number"
                value={it.price}
                onChange={(e) => updateItem(idx, "price", e.target.value)}
              />
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-link" onClick={addItemRow}>
          + Add Item
        </button>

        <h5 className="mt-3">Shipping</h5>
        <div className="row g-2">
          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Address"
              value={shipping.address}
              onChange={(e) =>
                setShipping({ ...shipping, address: e.target.value })
              }
              required
            />
          </div>
          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="City"
              value={shipping.city}
              onChange={(e) =>
                setShipping({ ...shipping, city: e.target.value })
              }
              required
            />
          </div>
          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Postal Code"
              value={shipping.postalCode}
              onChange={(e) =>
                setShipping({ ...shipping, postalCode: e.target.value })
              }
              required
            />
          </div>
          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Country"
              value={shipping.country}
              onChange={(e) =>
                setShipping({ ...shipping, country: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="mb-3 mt-3">
          <label>Payment Method</label>
          <select
            className="form-select"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="COD">Cash on Delivery</option>
            <option value="Card">Card</option>
          </select>
        </div>

        <button className="btn btn-primary" type="submit">
          Place Order
        </button>
      </form>
    </div>
  );
}
