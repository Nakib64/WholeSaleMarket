import React, { useEffect, useState } from "react";
import Slider from "./Slider";
import SideSlider from "./SideSlider";
import Features from "./Article";
import { FeaturedCategories } from "./Featured";
import TopComments from "../Comment/Comment";
import { Button } from "@/components/ui/button";
import Card from "../nav/Product/Card";
import CardSkeleton from "@/Loading/Skeleton";
import axios from "axios";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import {
	FaShoePrints,
	FaShoppingBag,
	FaPumpSoap,
} from "react-icons/fa";
import About from "../About/About";


const categories = [
	{ name: "Shoes", slug: "shoes", icon: <FaShoePrints /> },
	{ name: "Bags", slug: "bags", icon: <FaShoppingBag /> },
	{ name: "Beauty and Personal Care", slug: "beauty", icon: <FaPumpSoap /> },

];

const Home = () => {
	document.title = "WholeSale Cart";

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get("https://b2-b-server-drab.vercel.app/products");
				setData(res.data);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	const getCategoryProducts = (category, limit = 7) =>
		data.filter((item) => item.category === category).slice(0, limit);

	return (
		<div className="w-full bg-gray-100 px-2 space-y-4">
			{/* Main Slider + SideSlider */}
			<div className="w-full flex gap-0 relative">
				<div className="flex-1">
					<Slider />
				</div>
				<div className="hidden 2xl:block w-80">
					<SideSlider />
				</div>
			</div>

			<Features />

			{/* Dynamically render all categories */}
			{categories.map((cat) => (
				<CategorySection
					key={cat.slug}
					title={cat.name.toUpperCase()}
					products={getCategoryProducts(cat.slug)}
					link={`category/${cat.slug}`}
					loading={loading}
				/>
			))}
			<About></About>
			<FeaturedCategories />
			<TopComments />
		</div>
	);
};

// Horizontal slider component
const CategorySection = ({ title, products, link, loading }) => {
  if(!products){
    return ;
  }
	return (
		<div className="py-3 bg-white px-2">
			<div className="flex justify-between items-center mb-3">
				<h1 className="text-2xl font-bold">{title}</h1>
				<Link to={link}>
					<Button>SEE MORE</Button>
				</Link>
			</div>

			{loading ? (
				<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
					{Array.from({ length: 8 }).map((_, idx) => (
						<CardSkeleton key={idx} />
					))}
				</div>
			) : (
				<Swiper
					modules={[Autoplay]}
					spaceBetween={10}
					loop
					autoplay={{
						delay: 0,
						disableOnInteraction: false,
						pauseOnMouseEnter: true,
					}}
					speed={3000}
					breakpoints={{
						320: { slidesPerView: 2 },
						768: { slidesPerView: 3 },
						1024: { slidesPerView: 4 },
						1280: { slidesPerView: 5},
					}}
				>
					{products.map((product) => (
						<SwiperSlide key={product._id}>
							<Card product={product} />
						</SwiperSlide>
					))}
				</Swiper>
			)}
		</div>
	);
};

export default Home;
