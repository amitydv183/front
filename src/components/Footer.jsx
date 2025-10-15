import React from "react";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="bg-black text-white pt-5 pb-4 mt-auto py-3">
      <div className="container">
        <div className="row text-center text-md-start">
          <div className="col-md-4 md-4">
            <img
              src="https://tse3.mm.bing.net/th/id/OIP.KQglFpPXLwjxZzcv1GCADgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
              alt="PNCOURSE LOGO"
              style={{
                height: "60px",
                backgroundColor: "white",
                padding: "5px",
                borderRadius: "5px",
              }}
            />
            <p className="mt-3 fw-semibold">V PetCare</p>
          </div>
          <div className="col-md-4 md-4">
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-white text-decoration-none">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/pets" className="text-white text-decoration-none">
                  Pets
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-white text-decoration-none">
                  Login
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4 md-4">
            <h5 className="fw-bold mb-3">Contact Us</h5>
            <p className="mb-1">
              <i className="bi bi-telephone-fill me-2"></i>+91 6200275261
            </p>
          </div>
        </div>
        <hr className="border-light" />
        <p className="text-center mb-0 fw-semibold">
          &copy; 2025 V PetCare. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
