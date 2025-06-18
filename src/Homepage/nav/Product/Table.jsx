import React from "react";
import { Link } from "react-router";

const Table = ({ product }) => {
	const { image, name, brand, price, rating, _id } = product;
	return (
		<div className="px-10">
			<div class="w-full grid grid-cols-4 mx-auto  bg-white border border-gray-200 rounded-lg shadow-sm transition-transform duration-300 ease-in-out hover:scale-101">
				<div>
					<img
						class="px-8 w-sm rounded-t-lg"
						src={image}
						onError={(e) => {
							e.target.onerror = null; // prevent infinite loop
							e.target.src =
								"https://i.ibb.co/tpFRRSSV/depositphotos-531920820-stock-illustration-photo-available-vector-icon-default.webp";
						}}
						alt="product image"
					/>
				</div>

				<div className="flex flex-col justify-center">
					<h5 class="text-xl font-semibold tracking-tight text-gray-500 ">{name}</h5>
					<h5 class="text-md font-semibold tracking-tight text-gray-500 ">
						Brand: <span className="italic">{brand}</span>
					</h5>
				</div>
				<div class="flex flex-col justify-center ">
					<span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm w-fit">
						{rating}
					</span>
					<span class="text-3xl font-bold text-gray-500 ">${price}</span>
				</div>
				<div class="flex items-center justify-end pr-10">
					<Link to={`/product/${_id}`}>
						<button className="btn  bg-yellow-100">View Details</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Table;
