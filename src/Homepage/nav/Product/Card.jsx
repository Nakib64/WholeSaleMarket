import React from "react";
import { Link } from "react-router";

const Card = ({ product }) => {
	const { image, name, brand, price, rating, _id } = product;

	return (
		<div class="w-full max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-sm transition-transform duration-300 ease-in-out hover:scale-105">
			<a>
				<img
					class="px-8 rounded-t-lg"
					src={image}
					onError={(e) => {
						e.target.onerror = null; // prevent infinite loop
						e.target.src = "https://i.ibb.co/tpFRRSSV/depositphotos-531920820-stock-illustration-photo-available-vector-icon-default.webp";
					}}
					alt="product image"
				/>
			</a>
			<div class="px-5 pb-5">
				<div>
					<h5 class="text-xl font-semibold tracking-tight text-gray-500 ">{name}</h5>
					<h5 class="text-md font-semibold tracking-tight text-gray-500 "> Brand: <span className="italic">{brand}</span></h5>
				</div>
				<div class="flex items-center my-2.5">
					
					<span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm  ms-3">
						{rating}
					</span>
				</div>
				<div class="flex items-center justify-between">
					<span class="text-3xl font-bold text-gray-500 ">${price}</span>
					<Link to={`/details/${_id}`}><button className="btn  bg-yellow-100">Details</button></Link>
					<Link to={`/update/${_id}`}><button className="btn  bg-yellow-100">Update</button></Link>
				</div>
			</div>
		</div>
	);
};

export default Card;
