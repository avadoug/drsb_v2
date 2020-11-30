import React from "react";
import { Route, Link } from "react-router-dom";
import Hero from "./Hero";
import { Spring, config } from "react-spring/renderprops";
import "../scss/home.scss";
import { Button } from "react-bootstrap";

const Home = () => {
  return (
    <Spring
      config={{ duration: 1000 }}
      from={{ opacity: 0 }}
      to={{ opacity: 1, marginTop: 0 }}
    >
      {(props) => (
        <div style={props} className="home">
          <h1>Dank Realm Seed Bank</h1>
          <Hero />
          <p>
            Here at the Dank Realm Seed Bank we put a priority on Breeders who
            produce the highest quality souvenir cannabis seeds on the market.
          </p>
          <h2>Our Mission</h2>
          <p>
            Our Mission is to find and share the most exotic, potent and quality
            cannabis seed souvenirs available today and make them available for
            the world.
          </p>

          <strong>Have a Question for us before you buy?</strong>
          <br />
          <Link to={"/contact"}>
            <Button>Contact Us</Button>
          </Link>
        </div>
      )}
    </Spring>
  );
};

export default Home;
