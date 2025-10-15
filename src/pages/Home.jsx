import React from "react";
import "../components/Style.css";
import Card from "../components/Card";
function Home() {
  return (
    <>
      <section className="home py-5 pt-5 mt-5 vh-300">
        <div className="container">
          <div className="row align-items-center text-lg-start">
            {/* Text Content */}
            <div className="col-md-6 mb-4 mb-md-0">
              <h1 className="fw-bold">
                Taking Care <span className="d-block">High Quality Food</span>
              </h1>
              <p className="lead">
                At V PetCare, we believe your furry friends deserve the best.
                Our premium selection of pet food is crafted to support health,
                vitality, and happiness. Whether you're shopping for playful
                pups or wise old companions, we’ve got something nutritious and
                delicious for every tail-wagger.
              </p>
              <p>
                Explore our range of vet-approved products, discover accessories
                that make life easier, and book services tailored to your pet’s
                needs — all in one place.
              </p>
            </div>

            {/* Image Content */}
            <div className="col-md-6">
              <img
                src="https://i2.wp.com/dogfood.guide/wp-content/uploads/2019/01/Alaskan-malamutes-610x407.jpg"
                className="img-fluid rounded shadow"
                alt="Alaskan Malamute enjoying pet food"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mt-5 category">
        <h2 className="h2 section-title fs-1 my-4 fw-sembold">
          <span className="span">Top</span> Categories
        </h2>

        <div className="row g-4">
          <div className="col-12 col-sm-6 col-md-4 col-lg-2">
            <Card />
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-2">
            <Card />
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-2">
            <Card />
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-2">
            <Card />
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-2">
            <Card />
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-2">
            <Card />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
