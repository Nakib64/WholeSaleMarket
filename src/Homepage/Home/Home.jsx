import React, { useEffect, useState } from "react";
import HomeSlider from "./Slider";
import Slider from "./Slider";
import Features from "./Article";
import PricingPlans from "./Pricing";
import axios from "axios";
import Card from "../nav/Product/Card";
import Loading from "../../Loading/Loading";
import { Link } from "react-router";
import { FeaturedCategories } from "./Featured";
import { Testimonials } from "./Testimonial";
import { Button } from "@/components/ui/button";
import TopComments from "../Comment/Comment";

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
			const res = await axios.get("https://b2-b-server-drab.vercel.app/products");
			setData(res.data);
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (data?.length > 0) {
			setShoes(data.filter((item) => item.category === "shoes").slice(0,7));
			setManClothing(data.filter((item) => item.category === "beauty").slice(0,7));
			setLoading(false);
		}
	}, [data]);



	return (
		<div className=" w-full px-2">
			<div className="w-full md:px-6">
				<Slider></Slider>
			</div>
			<Features></Features>
			<h1 className="font-bold text-2xl text-center md:text-4xl py-5" id="topCategories">
				Top Categories
			</h1>
			{loading ? (
				<Loading></Loading>
			) : (
				<>
        <div className="px-2 py-3">
          
          <div className="flex justify-between p-3">
            <h1 className="text-2xl  font-bold">SHOES</h1>
              <Link to={'category/shoes'}><Button>SEE MORE</Button></Link>
          </div>
					<div className="grid  md:px-0 grid-cols-2 lg:grid-cols-3 sm:py-6 lg:py-3 xl:grid-cols-4 justify-between gap-4">
						{shoes.map((product) => {
							return <Card product={product} key={product._id}></Card>;
						})}
					</div>
				</div>
        <div className="px-2 py-3">
          
          <div className="flex justify-between p-3">
            <h1 className="text-2xl  font-bold">BEAUTY</h1>
              <Link to={'category/shoes'}><Button>SEE MORE</Button></Link>
          </div>
					<div className="grid  md:px-0 grid-cols-2 lg:grid-cols-3 sm:py-6 lg:py-3 xl:grid-cols-4 justify-between gap-4">
						{manClothing.map((product) => {
							return <Card product={product} key={product._id}></Card>;
						})}
					</div>
				</div>

        </>
			)}
			<FeaturedCategories></FeaturedCategories>
						<TopComments></TopComments>
			<PricingPlans></PricingPlans>
			
	</div>
	);
};

export default Home;
