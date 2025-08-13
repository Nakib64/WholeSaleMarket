import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router";

const Card = ({ product }) => {
	const { image, name, brand, price, rating, _id } = product;

	return (
		<div
			className="w-full bg-white border border-gray-200 rounded-lg shadow-sm transition-transform duration-300 ease-in-out hover:scale-[1.02]
			grid grid-rows-[auto_1fr_auto]
			h-auto sm:h-[450px] md:h-[420px] lg:h-[400px]"
		>
			{/* Image */}
			<div className="p-3">
				<img
					className="rounded-lg w-full h-44 sm:h-48 md:h-52 object-cover"
					src={image}
					onError={(e) => {
						e.target.onerror = null;
						e.target.src =
							"https://i.ibb.co/tpFRRSSV/depositphotos-531920820-stock-illustration-photo-available-vector-icon-default.webp";
					}}
					alt="product image"
				/>
			</div>

			{/* Product Info */}
			<div className="px-5 overflow-hidden">
				<h5
					className="text-lg font-semibold text-gray-800 truncate"
					title={name}
				>
					{name}
				</h5>
				<p className="text-sm text-gray-500">
					Brand: <span className="italic">{brand}</span>
				</p>
				<div className="flex items-center mt-2">
					<span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
						Rating: {rating}
					</span>
				</div>
			</div>

			{/* Price + Button */}
			<div className="px-5 pb-5 mt-auto flex items-center justify-between">
				<span className="text-xl md:text-2xl font-bold text-[#8dc63f]">
					${price}
				</span>
				<Link to={`/details/${_id}`}>
					<Button>
						Details
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default Card;
