import React, { useEffect, useState } from "react";
import HomeSlider from "./Slider";
import Slider from "./Slider";
import Features from "./Article";
import PricingPlans from "./Pricing";
import axios from "axios";
import Card from "../nav/Product/Card";
import Loading from "../../Loading/Loading";
import { Link } from "react-router";

const Home = () => {
	document.title = "WholeSale Cart";
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	const [shoes, setShoes] = useState(null);
  const [manClothing, setManClothing] = useState(null)
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const fetchData = async () => {
			const res = await axios.get("https://b2-b-server.vercel.app/products");
			setData(res.data);
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (data?.length > 0) {
			setShoes(data.filter((item) => item.category === "shoes").slice(0,7));
			setManClothing(data.filter((item) => item.category === "mens-clothing").slice(0,7));
			setLoading(false);
		}
	}, [data]);



	return (
		<div className=" w-full">
			<Slider></Slider>
			<Features></Features>
			<h1 className="font-bold text-2xl text-center md:text-4xl py-5" id="topCategories">
				Top Categories
			</h1>
			{loading ? (
				<Loading></Loading>
			) : (
				<>
        <div className="px-10 py-3">
          
          <div className="flex justify-between">
            <h1 className="text-2xl  font-bold">SHOES</h1>
              <Link to={'category/shoes'}><button className="btn btn-primary">SEE MORE</button></Link>
          </div>
					<div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 sm:p-6 lg:p-3 xl:grid-cols-4 justify-center gap-4">
						{shoes.map((product) => {
							return <Card product={product}></Card>;
						})}
					</div>
				</div>
        <div className="px-10 py-3">
          
          <div className="flex justify-between">
            <h1 className="text-2xl  font-bold">MAN CLOTHING</h1>
              <Link to={'category/mens-clothing'}><button className="btn btn-primary">SEE MORE</button></Link>
          </div>
					<div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 sm:p-6 lg:p-3 xl:grid-cols-4 justify-center gap-4">
						{manClothing.map((product) => {
							return <Card product={product}></Card>;
						})}
					</div>
				</div>
        </>
			)}
			<PricingPlans></PricingPlans>
			<div className="flex justify-center items-center">
				<button className="btn btn-accent" onClick={scrollToTop}>
					Scroll to top
				</button>
			</div>
		</div>
	);
};

export default Home;
