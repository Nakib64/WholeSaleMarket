import React, {  useContext } from "react";
import { Link, NavLink } from "react-router";
import { CiUser } from "react-icons/ci";

import { AuthContext } from "../../AuthContext/AuthContext";
import HoverDropdown from "./HoverDropdown";
import CartIcon from "./CartIcon";
import SearchBar from "../searchbar/Search";
import CategoryMenu from "../Category";
import CategoryDrawer from "./CategoryMenu";

const Nav = () => {
	const { user } = useContext(AuthContext);

	const navLinks = [
		{ to: "/", label: "Home" },
		{ to: "/allProduct", label: "All Products" },
		{ to: "/about", label: "About Us" },
		{ to: "/contact", label: "Contact" },
	];

	return (
		<nav className=" bg-blue-700/70 text-white shadow">
			{/* Desktop Navbar (unchanged) */}
			<div className="navbar px-4 md:px-8 shadow md:flex">
				<div className="navbar-start">
					<div className="flex gap-3">
						<CategoryDrawer></CategoryDrawer>
						<Link to="/" className="flex items-center">
						<h1 className="text-lg md:text-4xl font-extrabold text-white">
							Whole<span>sale</span>
						</h1>
					</Link>
					</div>
					
				</div>

		

				
				<div className="hidden md:flex w-full">
					<SearchBar></SearchBar>
				</div>
						
				{/* Right side */}
				<div className="navbar-end flex items-center gap-5">
					<CartIcon />
					{user ? (
						<HoverDropdown />
					) : (
						<Link
							to="/login"
							className="flex items-center p-2 rounded-full hover:bg-gray-100 transition-all duration-300"
						>
							<CiUser size={35} className="text-gray-700" />
						</Link>
					)}

				
				</div>
			</div>

		
		</nav>
	);
};

export default Nav;
