import React from "react";

function Card() {
  return (
    <>
      <div className="card shadow p-4 mb-4">
        <img
          src="https://img.freepik.com/premium-photo/pet-product-packaging-designs-branding-creative-concept-ideas-innovative_655090-186416.jpg"
          className="card-img-top"
        />
        <div className="card-body text-center">
          <h4>Dog Bowl</h4>
          <button className="btn btn-success">Book Now</button>
        </div>
      </div>
    </>
  );
}

export default Card;
