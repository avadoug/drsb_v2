import React from "react";
import { Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "./SearchBox";
import { ReactComponent as Fire } from "./Icons/Fire.svg";
import { ReactComponent as Leaf } from "./Icons/Leaf.svg";
import { ReactComponent as User } from "./Icons/User.svg";
import { ReactComponent as Users } from "./Icons/Users.svg";
import { ReactComponent as Chart } from "./Icons/Chart.svg";
import { ReactComponent as Cart } from "./Icons/Cart.svg";
import { ReactComponent as Home } from "./Icons/Home.svg";
import { ReactComponent as Tag } from "./Icons/Tag.svg";
import { ReactComponent as Clipboard } from "./Icons/Clipboard.svg";
import { ReactComponent as WeedLeaf } from "./Icons/WeedLeaf.svg";
import { logout } from "../actions/userActions";
import DarkMode from "./DarkMode";
import "../scss/layout.scss";

const Layout = () => {
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<nav className="navbar">
			<ul className="navbar-nav">
				<li className="logo">
					<Link to="/" className="nav-link">
						<span className="link-text">Dank Realm</span>
						<WeedLeaf />
					</Link>
				</li>
				<li className="nav-item" id="products-submenu">
					<Link to="/" className="nav-link">
						<Home />
						<span className="link-text">Home</span>
					</Link>
				</li>
				<li className="nav-item" id="products-submenu">
					<Link to="/products" className="nav-link">
						<Fire />
						<span className="link-text">Products</span>
					</Link>
				</li>

				<li className="nav-item" id="products-submenu">
					<Link to="/categories" className="nav-link">
						<Leaf />
						<span className="link-text">Breeders</span>
					</Link>
				</li>

				<li className="nav-item" id="products-submenu">
					<Link to={"/profile"}>
						<li className="nav-link">
							<User />
							{userInfo ? (
								<ul id="submenu">
									<li className="nav-item">
										<span className="link-text">{userInfo.name}</span>
									</li>

									<li className="nav-item">
										<button onClick={logoutHandler} className="link-text">
											Log Out
										</button>
									</li>
								</ul>
							) : (
								<ul id="submenu">
									<span className="link-text">Log In</span>
								</ul>
							)}
						</li>
					</Link>
					{userInfo && userInfo.isAdmin && (
						<ul id="submenu">
							<li className="nav-item" id="products-submenu">
								<Link to="/admin/userList" className="nav-link">
									<Users />
									<span className="link-text">Users</span>
								</Link>
							</li>
							<li className="nav-item" id="products-submenu">
								<Link to="/admin/productlist" className="nav-link">
									<Chart />
									<span className="link-text">Inventory</span>
								</Link>
							</li>
							<li className="nav-item" id="products-submenu">
								<Link to="/admin/discountlist" className="nav-link">
									<Tag />
									<span className="link-text">Discounts</span>
								</Link>
							</li>
							<li className="nav-item" id="products-submenu">
								<Link to="/admin/orderList" className="nav-link">
									<Clipboard />
									<span className="link-text">Orders</span>
								</Link>
							</li>
						</ul>
					)}
				</li>

				<li className="nav-item">
					<Link to={"/cart"} className="nav-link">
						<Cart />
						<span className="link-text">{cartItems.length}</span>
						<span className="link-text"> Items in Cart</span>
					</Link>
				</li>

				<li className="nav-item">
					<DarkMode />
				</li>
			</ul>
		</nav>
	);
};

export default Layout;
