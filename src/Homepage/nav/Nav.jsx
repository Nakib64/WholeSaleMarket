import React, {  useContext } from "react";
import { Link } from "react-router";

import { AuthContext } from "../../AuthContext/AuthContext";
import HoverDropdown from "./HoverDropdown";
import CartIcon from "./CartIcon";
import SearchBar from "../searchbar/Search";
import CategoryDrawer from "./CategoryMenu";
import { FaUser } from "react-icons/fa";

const Nav = () => {
	const { user } = useContext(AuthContext);



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
							to="/auth/login"
							className="flex items-center p-2 rounded-full  transition-all duration-300"
						>
							<FaUser size={25} />

						</Link>
					)}

				
				</div>
			</div>

		
		</nav>
	);
};

export default Nav;
