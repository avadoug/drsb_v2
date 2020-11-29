import React, { useEffect } from "react";
import { Link, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Category from "../components/Category"
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import { listCategories } from "../actions/categoryActions";
import SearchBox from "../components/SearchBox";
const CategoryGroupScreen = ({ match }) => {
	const keyword = match.params.keyword;

	const pageNumber = match.params.pageNumber || 1;

	const dispatch = useDispatch();

	const categoryList = useSelector((state) => state.categoryList);
	const { loading, error, categories, page, pages } = categoryList;

	useEffect(() => {
		dispatch(listCategories(keyword, pageNumber));
	}, [dispatch, keyword, pageNumber]);

	return (
		<>
			<Meta />
			{!keyword ? (
				<ProductCarousel />
			) : (
				<Link to="/" className="btn btn-light">
					Go Back
				</Link>
			)}
			<h1>Breeders</h1>
			<Route render={({ history }) => <SearchBox history={history} />} />
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<Row>
						{categories.map((category) => (
							<Col key={category._id} sm={12} md={6} lg={4} xl={3}>
								<Category category={category} />
							</Col>
						))}
					</Row>
					<Paginate
						pages={pages}
						page={page}
						keyword={keyword ? keyword : ""}
					/>
				</>
			)}
		</>
	);
};

export default CategoryGroupScreen;
