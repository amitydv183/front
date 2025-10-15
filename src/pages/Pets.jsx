import { useEffect, useState } from "react";
import API from "../services/api";

export default function Pets() {
  const [pets, setPets] = useState([]);
  const [form, setForm] = useState({
    petName: "",
    type: "",
    age: "",
    vaccinations: "",
  });
  const [image, setImage] = useState(null);
  const [editForm, setEditForm] = useState({
    _id: "",
    petName: "",
    type: "",
    age: "",
    vaccinations: "",
  });
  const [editImage, setEditImage] = useState(null);

  const fetchPets = async () => {
    const res = await API.get("/pets");
    setPets(res.data);
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleEditChange = (e) =>
    setEditForm({ ...editForm, [e.target.name]: e.target.value });

  // 🟩 Add Pet
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("petName", form.petName);
    formData.append("type", form.type);
    formData.append("age", form.age);
    formData.append(
      "vaccinations",
      JSON.stringify(form.vaccinations.split(",").map((v) => v.trim()))
    );
    if (image) formData.append("image", image);

    await API.post("/pets", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setForm({ petName: "", type: "", age: "", vaccinations: "" });
    setImage(null);
    fetchPets();
  };

  // 🗑️ Delete Pet
  const handleDelete = async (id) => {
    await API.delete(`/pets/${id}`);
    fetchPets();
  };

  // 🟦 Open Edit Modal
  const openEdit = (pet) => {
    setEditForm({
      _id: pet._id,
      petName: pet.petName,
      type: pet.type,
      age: pet.age,
      vaccinations: pet.vaccinations.join(", "),
    });
    setEditImage(null);
  };

  // 🟨 Update Pet
  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("petName", editForm.petName);
    formData.append("type", editForm.type);
    formData.append("age", editForm.age);
    formData.append(
      "vaccinations",
      JSON.stringify(editForm.vaccinations.split(",").map((v) => v.trim()))
    );
    if (editImage) formData.append("image", editImage);

    await API.put(`/pets/${editForm._id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setEditForm({ _id: "", petName: "", type: "", age: "", vaccinations: "" });
    setEditImage(null);
    fetchPets();
    document.getElementById("closeEditModal").click(); // close modal
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">🐾 My Pets</h3>

      {/* Add Form */}
      <form onSubmit={handleSubmit} className="card p-3 shadow mb-4">
        <div className="row g-2 align-items-center">
          <div className="col-md-2">
            <input
              className="form-control"
              placeholder="Name"
              name="petName"
              value={form.petName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <input
              className="form-control"
              placeholder="Type"
              name="type"
              value={form.type}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-1">
            <input
              className="form-control"
              placeholder="Age"
              name="age"
              value={form.age}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Vaccinations (comma separated)"
              name="vaccinations"
              value={form.vaccinations}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="col-md-1">
            <button className="btn btn-success w-100">Add</button>
          </div>
        </div>
      </form>

      {/* Cards List */}
      <div className="row">
        {pets.map((p) => (
          <div className="col-md-4 mb-4" key={p._id}>
            <div className="card shadow-sm h-100">
              {p.image?.url ? (
                <img
                  src={p.image.url}
                  alt={p.petName}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              ) : (
                <div
                  className="bg-secondary d-flex align-items-center justify-content-center text-white"
                  style={{ height: "200px" }}
                >
                  No Image
                </div>
              )}
              <div className="card-body">
                <h5 className="card-title">{p.petName}</h5>
                <p className="card-text mb-1">
                  <strong>Type:</strong> {p.type}
                </p>
                <p className="card-text mb-1">
                  <strong>Age:</strong> {p.age}
                </p>
                <p className="card-text">
                  <strong>Vaccinations:</strong> {p.vaccinations.join(", ")}
                </p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button
                  className="btn btn-warning btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                  onClick={() => openEdit(p)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(p._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      <div className="modal fade" id="editModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleUpdate}>
              <div className="modal-header">
                <h5 className="modal-title">Edit Pet</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  id="closeEditModal"
                ></button>
              </div>
              <div className="modal-body">
                <input
                  className="form-control mb-2"
                  placeholder="Name"
                  name="petName"
                  value={editForm.petName}
                  onChange={handleEditChange}
                />
                <input
                  className="form-control mb-2"
                  placeholder="Type"
                  name="type"
                  value={editForm.type}
                  onChange={handleEditChange}
                />
                <input
                  className="form-control mb-2"
                  placeholder="Age"
                  name="age"
                  value={editForm.age}
                  onChange={handleEditChange}
                />
                <input
                  className="form-control mb-2"
                  placeholder="Vaccinations (comma separated)"
                  name="vaccinations"
                  value={editForm.vaccinations}
                  onChange={handleEditChange}
                />
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => setEditImage(e.target.files[0])}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button className="btn btn-primary">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
