import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router";
import { CiUser } from "react-icons/ci";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../../AuthContext/AuthContext";
import HoverDropdown from "./HoverDropdown";
import CartIcon from "./CartIcon";
import {
	Menubar,
	MenubarMenu,
	MenubarTrigger,
	MenubarContent,
	MenubarItem,
} from "@/components/ui/menubar";
import { motion, AnimatePresence } from "framer-motion";

const Nav = () => {
	const { user } = useContext(AuthContext);
	const [mobileOpen, setMobileOpen] = useState(false);

	const navLinks = [
		{ to: "/", label: "Home" },
		{ to: "/allProduct", label: "All Products" },
		{ to: "/about", label: "About Us" },
		{ to: "/contact", label: "Contact" },
	];

	return (
		<nav className="sticky top-0 z-50 bg-[#aad6ec] text-white shadow">
			{/* Desktop Navbar (unchanged) */}
			<div className="navbar px-4 md:px-8 shadow md:flex">
				<div className="navbar-start">
					<Link to="/" className="flex items-center">
						<h1 className="text-lg md:text-4xl font-extrabold bg-gradient-to-r from-[#032f3c] to-[#217b7e] bg-clip-text text-transparent">
							Whole<span>sale</span>
						</h1>
					</Link>
				</div>

				{/* Desktop links */}
				<div className="navbar-center hidden md:flex">
					<ul className="menu menu-horizontal gap-6">
						{navLinks.map((link) => (
							<li key={link.to}>
								<NavLink
									to={link.to}
									className="rounded-none font-medium hover:text-gray-200"
								>
									{link.label}
								</NavLink>
							</li>
						))}
					</ul>
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

					{/* Mobile Hamburger */}
					<button
						className="md:hidden p-2 rounded-md hover:bg-gray-100 ml-2"
						onClick={() => setMobileOpen(!mobileOpen)}
					>
						{mobileOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>
			</div>

			{/* Mobile Menubar */}
			<AnimatePresence>
				{mobileOpen && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
						className="md:hidden bg-white border-t shadow-md overflow-auto"
					>
						<Menubar orientation="vertical" className="flex flex-col h-auto">
							{navLinks.map((link) => (
								<MenubarMenu key={link.to}>
									<MenubarTrigger>
										<NavLink
											to={link.to}
											onClick={() => setMobileOpen(false)}
											className={({ isActive }) =>
												`block px-4 py-3 text-gray-700 hover:text-[#217b7e] transition-all outline-none border-none ${
													isActive ? "text-[#217b7e]" : ""
												}`
											}
										>
											{link.label}
										</NavLink>
									</MenubarTrigger>
									<MenubarContent />
								</MenubarMenu>
							))}
							{/* <div className="flex items-center gap-3 px-4 py-3">
                <CartIcon />
                {user ? <HoverDropdown /> : (
                  <Link to="/login" className="p-2 rounded-full hover:bg-gray-100 transition-all">
                    <CiUser size={24} className="text-gray-700" />
                  </Link>
                )}
              </div> */}
						</Menubar>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	);
};

export default Nav;
