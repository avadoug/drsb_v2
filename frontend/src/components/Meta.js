import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="keyword" content={keywords} />
		</Helmet>
	);
};

Meta.defaultProps = {
	title: "Dank Realm Seed Bank",
	description:
		"Leaders in the Cannabis Seed Industry, the best genetics, the best prices",
	keywords: "seeds, hydroponics, growing, cannabis, seeds, supplies",
};

export default Meta;
