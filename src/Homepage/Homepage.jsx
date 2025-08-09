import React from "react";
import Nav from "./nav/Nav";
import Footer from "./footer/Footer";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import CategoryMenu from "./Category";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import SearchBar from "./searchbar/Search";


const Homepage = () => {

	

	return (
		<div className="flex flex-col min-h-screen" data-theme="light">
			<ScrollToTop></ScrollToTop>
			<Nav></Nav>
			<SearchBar></SearchBar>
			<main className="flex-1 bg-gray-100 flex ">
				<ToastContainer></ToastContainer>
				<aside className="w-1/6 h-screen sticky  top-0 bg-white hidden md:flex">
					<CategoryMenu></CategoryMenu>
				</aside>
				<div className="w-full md:w-5/6">
					<Outlet></Outlet>
				</div>
			</main>
			<Footer></Footer>
		</div>
	);
};

export default Homepage;
