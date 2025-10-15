import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await API.get("/logout");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          🐾 Pet Care
        </Link>

        <div className="ms-auto">
          {user ? (
            <>
              <Link className="btn btn-light btn-sm me-2" to="/">
                Home
              </Link>
              <Link className="btn btn-light btn-sm me-2" to="/pets">
                Pets
              </Link>
              <span className="text-white me-3">Hi, {user.name}</span>
              <button
                className="btn btn-outline-light btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-light btn-sm me-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-outline-light btn-sm" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
