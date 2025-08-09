import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BsSearch } from "react-icons/bs";

const SearchBar = () => {
	const navigate = useNavigate();
	const [searchedKey, setSearchedKey] = useState("");
	const [isFocused, setIsFocused] = useState(false);

	const wrapperRef = useRef(null);

	const { data, error, isError } = useQuery({
		queryKey: [searchedKey],
		queryFn: async () => {
			const res = await axios.get("http://localhost:3000/search", {
				params: {
					searchedKey,
				},
			});
			return res.data;
		},
	});

	console.log(data);

	// Fetch suggestions from backend

	// Show suggestions on input focus
	const handleFocus = () => {
		setIsFocused(true);
	};
	// Hide suggestions on click outside
	useEffect(() => {
		function handleClickOutside(event) {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
				setIsFocused(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Hide suggestions on click outside

	// Handle selecting suggestion
	const handleSelect = (product) => {
		navigate(`/details/${product._id}`);
	};

	// Handle submit (go to product detail page if exact match or search page)
	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div
			className="relative w-full flex justify-center items-center md:bg-[#c5aa6a] py-2"
			ref={wrapperRef}
		>
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-7xl mx-auto flex gap-2 justify-center px-4"
			>
				<Input
					type="text"
					className="input input-bordered max-w-4xl mx-auto m-0"
					placeholder="Search products..."
					value={searchedKey}
					onChange={(e) => {
						setSearchedKey(e.target.value);
					}}
					onFocus={handleFocus}
					autoComplete="off"
				/>
				<Button>
					<BsSearch />
				</Button>
			</form>

			{isFocused && data?.length > 0 && (
				<div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-full max-w-4xl max-h-[60vh] overflow-y-auto bg-white shadow-md rounded-md z-50">
					{data.map((product) => (
						<div
							key={product._id}
							className="p-2 hover:bg-gray-100 cursor-pointer"
							onClick={() => handleSelect(product)}
						>
							{product.name}
						</div>
					))}
			
				</div>
			)}
		</div>
	);
};

export default SearchBar;
