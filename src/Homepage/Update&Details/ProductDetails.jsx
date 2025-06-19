import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loading from "../../Loading/Loading";

const ProductDetails = () => {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);


	useEffect(() => {
		axios.get("http://localhost:3000/products").then((res) => {
			const found = res.data.find((item) => item._id == id);
			setProduct(found);
			setLoading(false);
		});
	}, [id]);
    if (loading) {
		return <Loading></Loading>;
	}
	return (
		<div class="w-full max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-sm transition-transform duration-300 ease-in-out hover:scale-105 mt-20">
			<a>
				<img
					class="px-8 rounded-t-lg"
					src={product.image}
					onError={(e) => {
						e.target.onerror = null; // prevent infinite loop
						e.target.src =
							"https://i.ibb.co/tpFRRSSV/depositphotos-531920820-stock-illustration-photo-available-vector-icon-default.webp";
					}}
					alt="product image"
				/>
			</a>
			<div class="px-5 pb-5">
				<div>
					<h5 class="text-xl font-semibold tracking-tight text-gray-500 ">{product.name}</h5>
					<h5 class="text-md font-semibold tracking-tight text-gray-500 ">
						{" "}
						Des: <span className="italic">{product.description}</span>
					</h5>
					<h5 class="text-md font-semibold tracking-tight text-gray-500 ">
						{" "}
						Brand: <span className="italic">{product.brand}</span>
					</h5>
				</div>
				<div>
					<h5 class="text-xl font-semibold tracking-tight text-gray-500 ">Minimum Buying Quantity: {product.minSellingQuantity}</h5>
					<h5 class="text-md font-semibold tracking-tight text-gray-500 ">
						{" "}
						Brand: <span className="italic">{product.brand}</span>
					</h5>
				</div>
				<div class="flex items-center my-2.5">
					<span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm  ms-3">
						{product.rating}
					</span>
				</div>
				<div class="flex items-center justify-between">
					<span class="text-3xl font-bold text-gray-500 ">${product.price}</span>
					<button className="btn btn-primary">Buy</button>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
