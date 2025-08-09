import React from "react";
import { Link } from "react-router";

const Table = ({ product }) => {
	const { image, name, brand, price, rating, _id } = product;
	return (
		<div className="px-3">
	<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto bg-white border border-gray-200 rounded-lg shadow-sm transition-transform duration-300 ease-in-out hover:scale-101">
		
		<div className="flex items-center">
			<div className="w-full p-3 rounded-2xl">
				<img
					className="rounded-lg w-full h-56 object-cover"
					src={image}
					onError={(e) => {
						e.target.onerror = null;
						e.target.src =
							"https://i.ibb.co/tpFRRSSV/depositphotos-531920820-stock-illustration-photo-available-vector-icon-default.webp";
					}}
					alt="product image"
				/>
			</div>
		</div>

		<div className="flex flex-col justify-center px-3">
			<h5 className="text-sm md:text-xl font-semibold tracking-tight text-gray-500">{name}</h5>
			<h5 className="text-xs md:text-lg font-semibold tracking-tight text-gray-500">
				Brand: <span className="italic">{brand}</span>
			</h5>
		</div>

		<div className="flex flex-col justify-center px-3">
			<span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm w-fit">
				Rating : {rating}
			</span>
			<span className="text-sm md:text-3xl font-bold text-[#8dc63f]">${price}</span>
		</div>

		<div className="flex items-center justify-end pr-5 md:pr-10">
			<Link to={`/details/${_id}`}>
				<button className="btn bg-[#c5aa6a] text-white btn-sm md:btn-md lg:btn-lg">Details</button>
			</Link>
		</div>
		
	</div>
</div>

	);
};

export default Table;
