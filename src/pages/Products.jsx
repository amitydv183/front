import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "food",
    price: "",
    stock: "",
    description: "",
  });
  const { user } = useAuth();

  const fetchProducts = async () => {
    try {
      const res = await API.get("/product/display");
      setProducts(res.data.products ?? res.data); // your controller returns { total, products } earlier
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!user) return alert("Login required to add product");
    try {
      await API.post("/product/create", form);
      setForm({
        name: "",
        category: "food",
        price: "",
        stock: "",
        description: "",
      });
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create product");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Products</h2>

      <div className="card mb-4 p-3">
        <h5>Add Product</h5>
        <form onSubmit={handleAdd} className="row g-2">
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="col-md-2">
            <select
              className="form-select"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="food">Food</option>
              <option value="toys">Toys</option>
              <option value="grooming">Grooming</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>
          <div className="col-md-2">
            <input
              className="form-control"
              placeholder="Price"
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              className="form-control"
              placeholder="Stock"
              type="number"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <button className="btn btn-success w-100" type="submit">
              Add Product
            </button>
          </div>
          <div className="col-12 mt-2">
            <input
              className="form-control"
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>
        </form>
      </div>

      <div className="row">
        {products &&
          products.map((p) => (
            <div className="col-md-4 mb-3" key={p._id}>
              <div className="card p-3 h-100">
                <h5>{p.name}</h5>
                <p className="text-muted">{p.category}</p>
                <p>{p.description}</p>
                <p className="fw-bold">₹{p.price}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
