import React, { useContext } from "react";
import {
	FaComments,
	FaOpencart,
	FaPhone,
	FaShoppingBag,
	FaUser,
} from "react-icons/fa";
import { IoMdAdd, IoMdCloudUpload } from "react-icons/io";
import { IoBagHandleOutline, IoBagHandleSharp } from "react-icons/io5";
import { Link, NavLink } from "react-router";
import "./../../index.css";
import { AuthContext } from "../../AuthContext/AuthContext";
import HoverDropdown from "./HoverDropdown";

const Nav = () => {

	const handleRefresh =()=>{
		window.location.href= '/'
	}
	const { user } = useContext(AuthContext);
	const links = (
		<>
			<li>
				<NavLink to={"/"} className={''}>Home</NavLink>
			</li>
			
			<li>
				<NavLink to={"/allProduct"}>All Products</NavLink>
			</li>
			<li>
				<NavLink to={"/addProduct"}>Add Product</NavLink>
			</li>
			<li>
				<NavLink to={"/myProduct"}>My Products</NavLink>
			</li>
		</>
	);
	return (
		<nav className="sticky top-0 z-40">
			<div className="navbar  shadow-sm bg-yellow-100">
				<div className="navbar-start">
					<Link to={'/'}><img src='https://i.ibb.co/M53Vn8wH/Screenshot-2025-06-17-230413.png' alt="" className='h-10 rounded-2xl' /></Link>
				</div>
				<div className="navbar-center hidden md:flex">
					<ul className="menu menu-horizontal px-1 flex gap-4 ">{links}</ul>
				</div>
				<div className="navbar-end space-x-5">
					<Link to={'/cart'}>
						<FaOpencart size={25} />
					</Link>
					<div className="flex gap-5">
						{user  ? (
							<HoverDropdown></HoverDropdown>
						) : (
							<>
								<NavLink to={"/login"} className="hover:text-orange-400 font-semibold">
									Login
								</NavLink>
								<NavLink
									to={"/register"}
									className="hover:text-orange-400 font-semibold"
								>
									Register
								</NavLink>
							</>
						)}
					</div>
				</div>
			</div>

			<footer className="fixed -bottom-1 left-0 right-0 bg-white border-t shadow z-50 md:hidden">
				<div className="grid grid-cols-5 border-2 border-gray-300 justify-around items-center text-center py-2 px-4 text-xs text-gray-700">
					<Link to="/category" className="flex flex-col items-center">
						<IoBagHandleSharp className="text-xl" />
						<span>Categories</span>
					</Link>
					<Link to="/myProduct" className="flex flex-col items-center text-center">
						<FaUser className="text-xl" />
						<span>My Products</span>
					</Link>
					<Link
						onClick={handleRefresh}
						className=" border-4 border-white rounded-full  flex  items-center  -mt-15 md:-mt-25 shadow-md"
					>
						<img
							src="https://i.ibb.co/M53Vn8wH/Screenshot-2025-06-17-230413.png" 
							alt="Home"
							className="w-full aspect-square rounded-full"
						/>
					</Link>
					<Link to="/addProduct" className="flex flex-col items-center text-center">
						<IoMdCloudUpload className="text-xl" />
						<span className="text-center">Add Product</span>
					</Link>
					<Link to="/allProduct" className="flex flex-col items-center">
						<IoMdCloudUpload className="text-xl" />
						<span>All Product</span>
					</Link>
					
				</div>
			</footer>
		</nav>
	);
};

export default Nav;
