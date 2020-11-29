import React from "react";
import { Route, Link } from "react-router-dom";
import Hero from './Hero'
import {Spring, config} from 'react-spring/renderprops'
import "../scss/home.scss";
import { Button } from "react-bootstrap";

const Home = () => {


	return (
        <Spring config={{duration: 1000}} from={{ opacity: 0 }} to={{ opacity: 1, marginTop: 0 }}  >

	{props => <div style={props} className="home">
        <h1>Dank Realm Seed Bank</h1>
        <Hero />
        <p>We are Industry leading professionals in the Cannabis Seeds Market. Seeking out only the most sought after and best performing cultivars, we guarantee you'll love our product. </p>
        <h2>Our Mission</h2>
        <p>Our Mission is to share the ability to grow the most carefully selected genetics there are available, without breaking the bank</p>

        <p>When it comes to YOUR Grow, give your self a head start and use Dank Realm Seed Bank Seeds!</p>
        <h2>Have a Question for us before you buy?</h2>
        <Link to={'/contact'}>
                <Button>
                        Contact Us
                </Button>
        </Link>
    </div>}
    </Spring>
	);
};

export default Home;
