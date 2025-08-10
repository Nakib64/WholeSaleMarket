import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaTableList } from "react-icons/fa6";
import { useParams } from "react-router";
import Card from "../nav/Product/Card";
import Table from "../nav/Product/Table";
import Loading from "../../Loading/Loading";

const CategoryItems = () => {
	const { cat } = useParams();
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [isGrid, setIsGrid] = useState(true);
	useEffect(() => {
		const fetchData = async () => {
			await axios
				.get("https://b2-b-server-drab.vercel.app/products", {
					params: { category: cat },
				})
				.then((res) => {
					setData(res.data);
					setLoading(false);
				});
		};
		fetchData();
	}, [cat]);

	const handlGrid = () => {
		setIsGrid(!isGrid);
	};

    if (loading) {
		return <Loading></Loading>;
	}
    if(data.length == 0){
        return (
            <div className="flex justify-center items-center py-20">
                <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-400">No Product Available right Now</h1>
            </div>
        )
    }
	return (
		<div>
			<h1 className="text-2xl md:text-4xl px-3 font-bold py-3">
				{cat.toUpperCase()}
			</h1>
			<div className="flex justify-end gap-5 px-1 items-center  md:px-5">
				<div className="space-x-5">
					<button onClick={handlGrid} disabled={isGrid}>
						<BsFillGrid3X3GapFill
							className={!isGrid ? "text-gray-400" : "text-red-500"}
							size={25}
						/>
					</button>
					<button onClick={handlGrid} disabled={!isGrid}>
						<FaTableList
							className={isGrid ? "text-gray-400" : "text-red-500"}
							size={25}
						/>
					</button>
				</div>
			</div>
			{isGrid ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:p-6 lg:p-3 xl:grid-cols-4 justify-center gap-4">
					{data.map((product) => {
						return <Card product={product}></Card>;
					})}
				</div>
			) : (
				<div className="flex flex-col gap-4 p-3">
					{data.map((product) => {
						return <Table product={product}></Table>
					})}
				</div>
			)}
		</div>
	);
};

export default CategoryItems;
