import React, { useContext } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { CiUser } from "react-icons/ci";

import { IoBagHandleSharp } from "react-icons/io5";
import { Link, NavLink } from "react-router";
import "./../../index.css";
import { AuthContext } from "../../AuthContext/AuthContext";
import HoverDropdown from "./HoverDropdown";
import CartIcon from "./CartIcon";

const Nav = () => {
	const handleRefresh = () => {
		window.location.href = "/";
	};
	const { user } = useContext(AuthContext);

	const links = (
		<>
			<li>
				<NavLink to={"/"} className="rounded-none font-medium hover:text-gray-200">
					Home
				</NavLink>
			</li>
			<li>
				<NavLink
					to={"/allProduct"}
					className="rounded-none font-medium hover:text-gray-200"
				>
					All Products
				</NavLink>
			</li>
		</>
	);

	return (
		<nav className="sticky top-0 z-50">
			{/* Desktop Navbar */}
			<div className="navbar bg-[#c5aa6a] text-white px-4 md:px-8 shadow">
				{/* Logo */}
				<div className="navbar-start">
					<Link to={"/"} className="flex items-center">
						<img
							src="https://i.ibb.co/M53Vn8wH/Screenshot-2025-06-17-230413.png"
							alt="Logo"
							className="h-10 w-auto rounded-2xl object-cover"
						/>
					</Link>
				</div>

				{/* Links */}
				<div className="navbar-center hidden md:flex">
					<ul className="menu menu-horizontal gap-6">{links}</ul>
				</div>

				{/* Right Side */}
				<div className="navbar-end flex items-center gap-5">
					<CartIcon />
					{user ? (
						<HoverDropdown />
					) : (
						<div className="flex items-center gap-4 font-semibold">
							<Link to={"/login"}>
								<CiUser size={35}/>
							</Link>
						</div>
					)}
				</div>
			</div>

			{/* Mobile Footer Navigation */}
			<footer className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg md:hidden z-50">
				<div className="grid grid-cols-3 items-center text-center text-gray-700 text-xs">
					<Link to="/category" className="flex flex-col items-center py-2">
						<IoBagHandleSharp className="text-xl" />
						<span>Categories</span>
					</Link>

					<Link
						onClick={handleRefresh}
						className="flex items-center justify-center rounded-full -mt-8 bg-white shadow-lg border-4 border-white w-16 h-16 mx-auto"
					>
						<img
							src="https://i.ibb.co/M53Vn8wH/Screenshot-2025-06-17-230413.png"
							alt="Home"
							className="w-10 h-10 rounded-full object-cover"
						/>
					</Link>

					<Link to="/allProduct" className="flex flex-col items-center py-2">
						<IoMdCloudUpload className="text-xl" />
						<span>All Product</span>
					</Link>
				</div>
			</footer>
		</nav>
	);
};

export default Nav;
