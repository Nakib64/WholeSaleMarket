import React from "react";
import { Link } from "react-router";

const Card = ({ product }) => {
	const { image, name, brand, price, rating, _id } = product;

	return (
		<div className="w-full max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-sm transition-transform duration-300 ease-in-out hover:scale-105">
			<div className="w-full p-3">
				<img
					className=" rounded-lg w-full h-48 object-cover"
					src={image}
					onError={(e) => {
						e.target.onerror = null; // prevent infinite loop
						e.target.src =
							"https://i.ibb.co/tpFRRSSV/depositphotos-531920820-stock-illustration-photo-available-vector-icon-default.webp";
					}}
					alt="product image"
				/>
			</div>
			<div className="px-5 pb-5">
				<div>
					<h5 className="text-xl font-semibold tracking-tight text-gray-500 ">
						{name}
					</h5>
					<h5 className="text-md font-semibold tracking-tight text-gray-500 ">
						{" "}
						Brand: <span className="italic">{brand}</span>
					</h5>
				</div>
				<div className="flex items-center my-2.5">
					<span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm  ms-3">
						Rating : {rating}
					</span>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-3xl font-bold text-gray-500 ">${price}</span>
					<Link to={`/details/${_id}`}>
						<button className="btn  bg-yellow-300">Details</button>
					</Link>
					
				</div>
			</div>
		</div>
	);
};

export default Card;
