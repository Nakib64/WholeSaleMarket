import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../../../Loading/Loading";
import Card from "./Card";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaTableList } from "react-icons/fa6";
import Table from "./Table";

const AllProduct = () => {
	document.title = "All products";

	const [data, setData] = useState(null);
	const [isLoading, setLoading] = useState(true);
    const [isGrid, setIsGrid] = useState(true)
	useEffect(() => {
		axios.get("http://localhost:3000/products").then((res) => {
			setData(res.data);
			setLoading(false);
		});
	}, []);

	if (isLoading) {
		return <Loading></Loading>;
	}

    const handlGrid=()=>{
        setIsGrid(!isGrid)
    }

	return (
		<>
			<h1 className="text-4xl text-center font-bold lg:text-5xl">All Products</h1>
			<div className="md:hidden">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:p-6 lg:p-3 xl:grid-cols-4 justify-center gap-4">
					{data.map((product) => {
						return <Card product={product}></Card>;
					})}
				</div>
			</div>

			<div>
				<div className="hidden md:flex justify-end gap-5 px-10">
					<button onClick={handlGrid} disabled= {isGrid}>
						<BsFillGrid3X3GapFill className={!isGrid? 'text-gray-400':'text-red-500'} size={25} />
					</button>
					<button onClick={handlGrid} disabled={!isGrid}>
						<FaTableList className={isGrid? 'text-gray-400':'text-red-500'} size={25} />
					</button>
				</div>
                {
                    isGrid ? (
                        <div className="grid  md:grid-cols-3  lg:p-3 xl:grid-cols-4 justify-center gap-4">
					{data.map((product) => {
						return <Card product={product}></Card>;
					})}
				</div>
                    ): (
                           <div className="flex flex-col gap-4">
					{data.map((product) => {
						return <Table product={product}></Table>;
					})}
				</div>
                    )
                }
			</div>
		</>
	);
};

export default AllProduct;
