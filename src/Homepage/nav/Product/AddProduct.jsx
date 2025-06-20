import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../AuthContext/AuthContext";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router";

const AddProduct = () => {
	const { user } = useContext(AuthContext);
	document.title = "Add product";
	const navigate = useNavigate()
	const categories = [
		"shoes",
		"bags",
		"jewelry",
		"beauty",
		"mens-clothing",
		"womens-clothing",
		"baby-items",
		"eyewear",
		"seasonal",
		"phone-accessories",
	];

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const Product = Object.fromEntries(formData.entries());
		Product.mainQuantity = parseInt(Product.mainQuantity)
		console.log(Product);

		axios.post("http://localhost:3000/allProducts", Product).then((res) => {
			  toast("Product Added Successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
		navigate('/')
		});

	};

	const [value, setValue] = useState(0);

	// When user clicks, update the rating value
	const handleChange = (newValue) => {
		if (newValue < 1) {
      setValue(1);
    } else {
      setValue(newValue);
    }
	};

	return (
		<div className="max-w-3xl mx-auto bg-white p-8 rounded shadow mt-10">
			<h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				{/* Product Image Upload */}
				<div>
					<label className="block font-medium mb-1">Product Image:</label>
					<input
						type="text"
						name="image"
						className=" border border-gray-300 rounded-2xl focus:outline-none p-2 w-full"
						required
					/>
				</div>

				{/* Product Name */}
				<div>
					<label className="block font-medium mb-1">Product Name:</label>
					<input
						type="text"
						name="name"
						placeholder="Enter product name"
						className=" border border-gray-300 rounded-2xl focus:outline-none p-2 w-full"
						required
					/>
				</div>

				{/* Main Quantity */}
				<div>
					<label className="block font-medium mb-1">Main Quantity:</label>
					<input
						type="number"
						name="mainQuantity"
						placeholder="Total quantity available"
						className=" border border-gray-300 rounded-2xl focus:outline-none p-2 w-full"
						required
					/>
				</div>

				{/* Minimum Selling Quantity */}
				<div>
					<label className="block font-medium mb-1">Minimum Selling Quantity:</label>
					<input
						type="number"
						name="minSellingQuantity"
						placeholder="Minimum quantity for purchase"
						className=" border border-gray-300 rounded-2xl focus:outline-none p-2 w-full"
						required
					/>
				</div>

				{/* Brand Name */}
				<div>
					<label className="block font-medium mb-1">Brand Name:</label>
					<input
						type="text"
						name="brand"
						placeholder="Enter brand name"
						className=" border border-gray-300 rounded-2xl focus:outline-none p-2 w-full"
						required
					/>
				</div>

				{/* Category Dropdown */}
				<div>
					<label className="block font-medium mb-1">Category:</label>
					<select
						name="category"
						className=" border border-gray-300 rounded-2xl focus:outline-none p-2 w-full"
						required
					>
						<option value="">Select a category</option>
						{categories.map((cat, index) => (
							<option key={index} value={cat}>
								{cat.toUpperCase()}
							</option>
						))}
					</select>
				</div>

				{/* Short Description */}
				<div>
					<label className="block font-medium mb-1">Short Description:</label>
					<textarea
						name="description"
						placeholder="Enter a brief description"
						className=" border border-gray-300 rounded-2xl focus:outline-none p-2 w-full"
						required
					/>
				</div>

				{/* Price */}
				<div>
					<label className="block font-medium mb-1">Price (per unit):</label>
					<input
						type="number"
						name="price"
						placeholder="Enter price"
						className=" border border-gray-300 rounded-2xl focus:outline-none p-2 w-full"
						required
					/>
				</div>

				{/* Rating */}
				<div>
          <h1 className="font-bold">Rating (1 to 5):</h1>
					<Rating style={{ maxWidth: 180 }} value={value} onChange={handleChange} />
					{/* Hidden input to submit value like a normal input */}
					<input type="hidden" name="rating" value={value} />
				</div>
				<div>
					<label className="block font-medium mb-1">Email :</label>
					<input
						type="email"
						name="email"
						className=" border border-gray-300 rounded-2xl focus:outline-none p-2 w-full"
						required
						value={user.email}
						readOnly
					/>
				</div>

				{/* Submit Button */}
				<button
					type="submit"
					className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
				>
					Add Product
				</button>

				{/* Product Content - Static Text */}
				<div className="mt-6 text-gray-600 text-sm">
					<p>
						<strong>Note:</strong> Please make sure all product information is
						accurate. Once submitted, the product will be reviewed before being listed
						on our wholesale platform.
					</p>
				</div>
			</form>
		</div>
	);
};

export default AddProduct;
