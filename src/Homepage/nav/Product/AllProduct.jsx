import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../../../Loading/Loading";
import Card from "./Card";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaTableList } from "react-icons/fa6";
import Table from "./Table";
import CardSkeleton from "@/Loading/Skeleton";

const AllProduct = () => {
	document.title = "All products";

	const [data, setData] = useState(null);
	const [isLoading, setLoading] = useState(true);
	const [isGrid, setIsGrid] = useState(true);
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		axios.get("https://b2-b-server-drab.vercel.app/products").then((res) => {
			setData(res.data);
			setLoading(false);
		});
	}, []);

	if (isLoading) {
		return (
			<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{Array.from({ length: 8 }).map((_, index) => (
					<CardSkeleton key={index} />
				))}
			</div>
		);
	}

	const handlGrid = () => {
		setIsGrid(!isGrid);
	};

	const handleFilter = async () => {
		const newChecked = !checked; // compute the new value first
		setChecked(newChecked); // update state

		if (newChecked) {
			// Now the logic matches the checked state
			const response = await axios.get(
				"https://b2-b-server-drab.vercel.app/products",
				{
					params: { minSellingQuantity: 100 },
				}
			);
			setData(response.data);
		} else {
			const response = await axios.get(
				"https://b2-b-server-drab.vercel.app/products"
			);
			setData(response.data);
		}
	};

	return (
		<>
			<div>
				<h1 className="text-2xl md:text-4xl text-center font-bold py-10">
					All Products {data.length}
				</h1>
				<div className="flex justify-between gap-5 px-3 items-center my-10 md:px-10">
					<div className="flex gap-3 items-center">
						<input
							id="available-products"
							type="checkbox"
							className="checkbox"
							onClick={handleFilter}
						/>
						<label htmlFor="available-products" className="text-xl cursor-pointer">
							Available Products
						</label>
					</div>
				</div>

				<div className="grid  grid-cols-2 lg:grid-cols-3 sm:p-6 lg:p-3 xl:grid-cols-5 justify-center gap-4">
					{data.map((product) => {
						return <Card product={product}></Card>;
					})}
				</div>
			</div>
		</>
	);
};

export default AllProduct;
