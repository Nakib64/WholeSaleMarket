import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../../AuthContext/AuthContext";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_KEY; // <-- Put your API key here

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

const AddProduct = () => {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	const [rating, setRating] = useState(0);
	const [imageUrl, setImageUrl] = useState("");
	const [uploading, setUploading] = useState(false);

	useEffect(() => {
		document.title = "Add Product";
	}, []);

	const handleChangeRating = (value) => {
		setRating(value < 1 ? 1 : value);
	};
	const handleImageChange = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		// Prepare form data for imgbb
		const formData = new FormData();
		formData.append("image", file);

		setUploading(true);

		try {
			const res = await axios.post(
				`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
				formData
			);
			setImageUrl(res.data.data.url);
			toast.success("Image uploaded successfully!");
		} catch (err) {
			toast.error("Image upload failed. Try again.");
			setImageUrl("");
		} finally {
			setUploading(false);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const Product = Object.fromEntries(formData.entries());
		Product.mainQuantity = parseInt(Product.mainQuantity);
		Product.rating = rating;

		try {
			await axios.post("https://b2-b-server-drab.vercel.app/allProducts", Product);
			toast.success("Product Added Successfully!", {
				position: "top-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				transition: Bounce,
			});
			navigate("/");
		} catch {
			toast.error("Failed to add product. Please try again.", {
				position: "top-right",
				autoClose: 4000,
			});
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="  opacity-20 p-2 rounded-3xl shadow-lg "
		>
			<h2 className="text-3xl font-extrabold mb-8 text-center text-gray-900">
				Add New Product
			</h2>
			<form
				onSubmit={handleSubmit}
				className=" grid grid-cols-1 md:grid-cols-2 gap-6"
			>
				{/* Product Image URL */}
				<div>
					<label htmlFor="image" className="block font-semibold mb-1 text-gray-700">
						Product Image:
					</label>
					<input
						id="image"
						name="imageFile"
						type="file"
						accept="image/*"
						onChange={handleImageChange}
						className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						required={!imageUrl}
						disabled={uploading}
					/>
					{uploading && (
						<p className="text-sm text-blue-600 mt-1">Uploading image...</p>
					)}
					{imageUrl && (
						<img
							src={imageUrl}
							alt="Uploaded preview"
							className="mt-3 rounded-lg max-h-40 object-contain"
						/>
					)}
				</div>

				{/* Product Name */}
				<div>
					<label htmlFor="name" className="block font-semibold mb-1 text-gray-700">
						Product Name:
					</label>
					<input
						id="name"
						name="name"
						type="text"
						placeholder="Enter product name"
						required
						className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				{/* Main Quantity */}
				<div>
					<label
						htmlFor="mainQuantity"
						className="block font-semibold mb-1 text-gray-700"
					>
						Main Quantity:
					</label>
					<input
						id="mainQuantity"
						name="mainQuantity"
						type="number"
						min={1}
						placeholder="Total quantity available"
						required
						className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				{/* Minimum Selling Quantity */}
				<div>
					<label
						htmlFor="minSellingQuantity"
						className="block font-semibold mb-1 text-gray-700"
					>
						Minimum Selling Quantity:
					</label>
					<input
						id="minSellingQuantity"
						name="minSellingQuantity"
						type="number"
						min={1}
						placeholder="Minimum quantity for purchase"
						required
						className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				{/* Brand Name */}
				<div>
					<label htmlFor="brand" className="block font-semibold mb-1 text-gray-700">
						Brand Name:
					</label>
					<input
						id="brand"
						name="brand"
						type="text"
						placeholder="Enter brand name"
						required
						className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				{/* Category */}
				<div>
					<label
						htmlFor="category"
						className="block font-semibold mb-1 text-gray-700"
					>
						Category:
					</label>
					<select
						id="category"
						name="category"
						required
						className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<option value="">Select a category</option>
						{categories.map((cat) => (
							<option key={cat} value={cat}>
								{cat.replace(/-/g, " ").toUpperCase()}
							</option>
						))}
					</select>
				</div>

				{/* Description */}
				<div className="md:col-span-2">
					<label
						htmlFor="description"
						className="block font-semibold mb-1 text-gray-700 "
					>
						Short Description:
					</label>
					<textarea
						id="description"
						name="description"
						rows={4}
						placeholder="Enter a brief description"
						required
						className="w-full rounded-xl border border-gray-300 px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				{/* Price */}
				<div>
					<label htmlFor="price" className="block font-semibold mb-1 text-gray-700">
						Price (per unit):
					</label>
					<input
						id="price"
						name="price"
						type="number"
						min={0}
						step="0.01"
						placeholder="Enter price"
						required
						className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				{/* Rating */}
				<div>
					<label className="block font-semibold mb-2 text-gray-700">
						Rating (1 to 5):
					</label>
					<Rating
						style={{ maxWidth: 180 }}
						value={rating}
						onChange={handleChangeRating}
					/>
					<input type="hidden" name="rating" value={rating} />
				</div>

				{/* Email */}
				<div>
					<label htmlFor="email" className="block font-semibold mb-1 text-gray-700">
						Email:
					</label>
					<input
						id="email"
						name="email"
						type="email"
						value={user.email}
						readOnly
						className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-2 cursor-not-allowed"
					/>
				</div>

				{/* Submit */}
				<button
					type="submit"
					className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition md:col-span-2"
				>
					Add Product
				</button>

				{/* Note */}
			</form>
			<p className="mt-6 text-center text-gray-500 text-sm">
				<strong>Note:</strong> Please ensure all product information is accurate.
				Submitted products will be reviewed before listing.
			</p>
		</motion.div>
	);
};

export default AddProduct;
