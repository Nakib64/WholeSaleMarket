import Loading from "@/Loading/Loading";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaTableList } from "react-icons/fa6";
import { useParams } from "react-router";
import Card from "../nav/Product/Card";
import Table from "../nav/Product/Table";
const SearchedProducts = () => {
	document.title = "Searched products";

	const [data, setData] = useState(null);
	const [isLoading, setLoading] = useState(true);
	const [isGrid, setIsGrid] = useState(true);
	const [checked, setChecked] = useState(false);
    const param = useParams()
    console.log(param.searchedKey);

	useEffect(() => {
		axios.get("https://b2-b-server-drab.vercel.app/search", {
                params:{
                    searchedKey: param.searchedKey
                }
            
        }).then((res) => {
			setData(res.data);
			setLoading(false);
		});
	}, [param]);

	if (isLoading) {
		return <Loading></Loading>;
	}

	const handlGrid = () => {
		setIsGrid(!isGrid);
	};

	const handleFilter = async () => {
  const newChecked = !checked; // compute the new value first
  setChecked(newChecked);      // update state

  if (newChecked) {
    // Now the logic matches the checked state
    const response = await axios.get("https://b2-b-server-drab.vercel.app/search", {
      params: { minSellingQuantity: 100 },
    });
    setData(response.data);
  } else {
    const response = await axios.get("https://b2-b-server-drab.vercel.app/search");
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
					<div className="flex gap-3 items-center" >
						<input id="available-products" type="checkbox" className="checkbox" onClick={handleFilter} />
						<label htmlFor="available-products" className="text-xl cursor-pointer">
							Available Products
						</label>
					</div>

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
					<div className="grid  grid-cols-2 lg:grid-cols-3 sm:p-6 lg:p-3 xl:grid-cols-4 justify-center gap-4">
						{data.map((product) => {
							return <Card product={product}></Card>;
						})}
					</div>
				) : (
					<div className="flex flex-col gap-4 p-3">
						{data.map((product) => {
							return <Table product={product}></Table>;
						})}
					</div>
				)}
			</div>
		</>
	);
};

export default SearchedProducts;
