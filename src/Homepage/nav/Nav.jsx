import React from "react";
import {
	FaComments,
	FaOpencart,
	FaPhone,
	FaShoppingBag,
	FaUser,
} from "react-icons/fa";
import { IoMdAdd, IoMdCloudUpload } from "react-icons/io";
import { IoBagHandleOutline, IoBagHandleSharp } from "react-icons/io5";
import { Link } from "react-router";

const Nav = () => {
	const links = (
		<>
			<li>
				<Link>Home</Link>
			</li>
			<li>
				<Link>Top Categories</Link>
			</li>
			<li>
				<Link>All Products</Link>
			</li>
			<li>
				<Link>Add Products</Link>
			</li>
			<li>
				<Link>My Products</Link>
			</li>
		</>
	);
	return (
		<nav>
			<div className="navbar bg-base-100 shadow-sm">
				<div className="navbar-start">
					<a className="btn btn-ghost text-xl p-0">daisyUI</a>
				</div>
				<div className="navbar-center hidden lg:flex">
					<ul className="menu menu-horizontal px-1">{links}</ul>
				</div>
				<div className="navbar-end space-x-5">
					<Link>
						<FaOpencart size={25} />
					</Link>
					<div>email </div>
				</div>
			</div>

			<footer className="fixed bottom-0 left-0 right-0 bg-white border-t shadow z-50 lg:hidden">
				<div className="grid grid-cols-5 border-2 border-gray-300 justify-around items-center py-2 px-4 text-xs text-gray-700">
					<Link to="/shop" className="flex flex-col items-center">
						<IoBagHandleSharp  className="text-xl" />
						<span>Categories</span>
					</Link>
					<Link to="/account" className="flex flex-col items-center text-center">
						<FaUser className="text-xl" />
						<span>My Products</span>
					</Link>
					<Link
						to="/"
						className="bg-yellow-400 border-4 border-white rounded-full  flex  items-center p-3 -mt-15 md:-mt-25 shadow-md"
					>
						<img
							src="/logo.png" // replace with your logo path
							alt="Home"
							className="w-full aspect-square"
						/>
					</Link>
                    <Link to="/chat" className="flex flex-col items-center">
						<IoMdCloudUpload className="text-xl" />
						<span>Add Product</span>
					</Link>
					<a href="tel:+880123456789" className="flex flex-col items-center">
						<FaPhone className="text-xl" />
						<span>Call</span>
					</a>
					
				</div>
			</footer>
		</nav>
	);
};

export default Nav;
