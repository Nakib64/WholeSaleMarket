import React, { useRef, useState, useEffect } from "react";
import Nav from "./nav/Nav";
import Footer from "./footer/Footer";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import CategoryMenu from "./Category";
import SearchBar from "./searchbar/Search";

const Homepage = () => {
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (headerRef.current) {
      const updateHeight = () => setHeaderHeight(headerRef.current.offsetHeight);
      updateHeight(); // Initial
      window.addEventListener("resize", updateHeight);
      return () => window.removeEventListener("resize", updateHeight);
    }
  }, []);

  return (
    <div className="min-h-screen font-[pacifico-regular] relative flex flex-col" data-theme="light">
      
      {/* Sticky header (Nav + Search) */}
      <div ref={headerRef} className="sticky top-0 z-10">
        <Nav />	
        <div className="md:hidden">
          <SearchBar />
        </div>
      </div>

      {/* Main area with dynamic max height */}
      <main
        className="flex flex-1 bg-white relative z-30"
        style={{ maxHeight: `calc(100vh - ${headerHeight}px)` }}
      >
        <ToastContainer />

        {/* Sidebar */}
        <aside className="w-1/6 bg-white hidden md:flex border-r border-gray-200 overflow-y-auto">
          <CategoryMenu />
        </aside>

        {/* Content */}
        <div className="flex flex-col w-full md:w-5/6 overflow-y-auto">
          <div className="flex-1">
            <Outlet />
          </div>
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Homepage;
