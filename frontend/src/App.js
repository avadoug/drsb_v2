import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import ContactScreen from "./screens/ContactScreen";
import ContactListScreen from "./screens/ContactListScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import DiscountListScreen from "./screens/DiscountListScreen";
import DiscountEditScreen from "./screens/DiscountEditScreen.js";
import OrderListScreen from "./screens/OrderListScreen";

const App = () => {
	return (
		<Router>
			<Layout />
			<main className="py-3">
				<Container>
					<Route path="/order/:id" component={OrderScreen} />
					<Route path="/shipping" component={ShippingScreen} />
					<Route path="/payment" component={PaymentScreen} />
					<Route path="/placeorder" component={PlaceOrderScreen} />
					<Route path="/login" component={LoginScreen} />
					<Route path="/register" component={RegisterScreen} />
					<Route path="/profile" component={ProfileScreen} />
					<Route path="/contact" component={ContactScreen} />
					<Route path="/admin/contacts" component={ContactListScreen} />
					<Route path="/product/:id" component={ProductScreen} />
					<Route path="/cart/:id?" component={CartScreen} />
					<Route path="/admin/userlist" component={UserListScreen} />					
					<Route path="/admin/user/:id/edit" component={UserEditScreen} />
					<Route
						path="/admin/productlist"
						component={ProductListScreen}
						exact
					/>
					<Route
						path="/admin/productlist/:pageNumber"
						component={ProductListScreen}
						exact
					/>
					<Route path="/admin/product/:id/edit" component={ProductEditScreen} />
					
					<Route
						path="/admin/discountlist"
						component={DiscountListScreen}
						exact
					/>
					<Route
						path="/admin/discountlist/:pageNumber"
						component={DiscountListScreen}
						exact
					/>
					<Route path="/admin/discount/:id/edit" component={DiscountEditScreen} />
				
					
					
					
					<Route path="/admin/orderlist" component={OrderListScreen} />
					<Route path="/products/search/:keyword" component={HomeScreen} exact />
					<Route path="/products/page/:pageNumber" component={HomeScreen} exact />
					<Route
						path="/products/search/:keyword/page/:pageNumber"
						component={HomeScreen}
						exact
					/>
					<Route path="/products" component={HomeScreen} exact />
					<Route path="/" component={Home} exact />
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
