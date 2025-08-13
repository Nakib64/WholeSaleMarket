import React from "react";
import Nav from "./nav/Nav";
import Footer from "./footer/Footer";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import CategoryMenu from "./Category";
import SearchBar from "./searchbar/Search";

const Homepage = () => {
	return (
		<div
			className="flex flex-col  h-[calc(100vh-<header+footer height>px)] font-[pacifico-regular]"
			data-theme="light"
		>
			<Nav></Nav>
			<SearchBar></SearchBar>
			<main className="flex-1 bg-gray-100 flex">
				<ToastContainer />

				{/* Fixed sidebar */}
				<aside className="w-1/6 sticky top-0 bg-white hidden md:flex h-screen">
					<CategoryMenu />
				</aside>

				{/* Scrollable right content */}
				<div className="w-full md:w-5/6 overflow-y-auto h-screen">
							

					<Outlet />
				</div>
			</main>

			<Footer></Footer>
		</div>
	);
};

export default Homepage;
