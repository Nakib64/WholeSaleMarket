import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Loading from "../../Loading/Loading";
import { Bounce, toast } from "react-toastify";
import { AuthContext } from "../../AuthContext/AuthContext";
import { ShoppingCart, CreditCard } from "lucide-react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const productSchema = z.object({
	quantity: z
		.number({
			required_error: "Quantity is required",
			invalid_type_error: "Quantity must be a number",
		})
		.min(1, "Quantity must be at least 1"),
});

const ProductDetails = () => {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [buttonLoading, setButtonLoading] = useState(false);
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(productSchema),
		defaultValues: {
			quantity: 0,
		},
	});

	useEffect(() => {
		axios.get("http://localhost:3000/products").then((res) => {
			const found = res.data.find((item) => item._id === id);
			setProduct(found);
			setLoading(false);
		});
	}, [id]);

	if (loading) return <Loading />;

	if (!product) return <div>Product not found</div>;

	const onSubmit = (data) => {
		const quantity = Number(data.quantity);

		if (
			quantity < product.minSellingQuantity ||
			quantity > product.mainQuantity
		) {
			setError("quantity", {
				type: "manual",
				message: `Quantity must be between ${product.minSellingQuantity} and ${product.mainQuantity}`,
			});
			return;
		}
		clearErrors("quantity");
		setButtonLoading(true);

		const orderData = {
			productId: id,
			image: product.image,
			quantity,
			email: user.email,
			productName: product.name,
			price: product.price,
		};

		const decrementObj = { quan: quantity, dec: true };

		axios
			.post("http://localhost:3000/allOrders", orderData)
			.then(() =>
				axios.put(`http://localhost:3000/product/${id}`, decrementObj)
			)
			.then(() => {
				toast("Ordered Successfully!", {
					position: "top-right",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: false,
					pauseOnHover: true,
					draggable: true,
					theme: "light",
					transition: Bounce,
				});
				navigate("/");
			})
			.catch(() => {
				toast.error("Something went wrong!");
				setButtonLoading(false);
			});
	};

	// Fields to render as read-only inputs
	const readOnlyFields = [
		{ label: "Product Name", value: product.name, name: "name" },
		{ label: "Main Quantity", value: product.mainQuantity, name: "mainQuantity" },
		{
			label: "Min Buy Quantity",
			value: product.minSellingQuantity,
			name: "minSellingQuantity",
		},
		{ label: "Brand", value: product.brand, name: "brand" },
		{ label: "Price (per unit)", value: product.price, name: "price" },
		{ label: "Email", value: user?.email || "", name: "email" },
	];

	return (
		<div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
			{/* Product Info */}
			<div className="mb-10">
				<img
					className="w-full max-w-full h-auto md:h-[400px] md:w-[400px] object-contain rounded-lg mx-auto"
					src={product.image}
					alt={product.name}
					onError={(e) => {
						e.target.onerror = null;
						e.target.src =
							"https://i.ibb.co/tpFRRSSV/depositphotos-531920820-stock-illustration-photo-available-vector-icon-default.webp";
					}}
				/>
				<h1 className="text-3xl font-bold mt-4">{product.name}</h1>
				<p className="text-gray-600 italic my-2">{product.description}</p>
				<p className="text-gray-700">
					Brand: <strong>{product.brand}</strong>
				</p>
				<p className="text-gray-700">
					Rating:{" "}
					<span className="text-yellow-500 font-semibold">{product.rating}</span>
				</p>
				<p className="text-2xl font-extrabold text-green-600 mt-2">
					${product.price}
				</p>
				<p className="text-gray-600 mt-4">
					Available Quantity: <strong>{product.mainQuantity}</strong>
				</p>
				<p className="text-gray-600">
					Minimum Purchase Quantity: <strong>{product.minSellingQuantity}</strong>
				</p>
			</div>

			{/* Order Form */}
			<div className="bg-gray-50 p-6 rounded-lg shadow-inner">
				<h2 className="text-2xl font-semibold mb-6 border-b pb-2">
					Confirm Your Order
				</h2>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className="space-y-6 max-w-full"
					noValidate
				>
					{/* Read-only fields in 2-column grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{readOnlyFields.map(({ label, value, name }) => (
							<div key={name} className="flex flex-col">
								<label htmlFor={name} className="mb-1 font-medium text-gray-700">
									{label}
								</label>
								<Input
									id={name}
									name={name}
									value={value}
									readOnly
									className="cursor-not-allowed bg-gray-200"
								/>
							</div>
						))}
						<div className="flex flex-col">
						<label htmlFor="quantity" className="mb-1 font-medium text-gray-700">
							Phone number
						</label>
						<Input
							id="quantity"
							type="number"
							min={product.minSellingQuantity}
							max={product.mainQuantity}
							placeholder={`Min: ${product.minSellingQuantity}`}
							{...register("quantity", { valueAsNumber: true })}
							className={
								errors.quantity
									? "border-red-500 focus:border-red-500 focus:ring-red-500"
									: ""
							}
						/>
						{errors.quantity && (
							<p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>
						)}
					</div>
					{/* buy quantity */}
					<div className="flex flex-col">
						<label htmlFor="quantity" className="mb-1 font-medium text-gray-700">
							Buying Quantity
						</label>
						<Input
							id="quantity"
							type="number"
							min={product.minSellingQuantity}
							max={product.mainQuantity}
							placeholder={`Min: ${product.minSellingQuantity}`}
							{...register("quantity", { valueAsNumber: true })}
							className={
								errors.quantity
									? "border-red-500 focus:border-red-500 focus:ring-red-500"
									: ""
							}
						/>
						{errors.quantity && (
							<p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>
						)}
					</div>

					</div>

					{/* phone number */}
					
					{/* Submit Button */}
					<div className="flex flex-col md:flex-row gap-4">
						<motion.div whileTap={{ scale: 0.95 }} className="flex-1">
							<Button
								type="button"
								disabled={buttonLoading}
								variant="outline"
								className="flex items-center justify-center gap-2 w-full"
								onClick={() => {
									/* add to cart handler here */
								}}
							>
								{buttonLoading ? (
									<span className="loading loading-spinner" />
								) : (
									<>
										<ShoppingCart className="w-5 h-5" />
										Add to Cart
									</>
								)}
							</Button>
						</motion.div>

						<motion.div whileTap={{ scale: 0.95 }} className="flex-1">
							<Button
								type="submit"
								disabled={buttonLoading}
								className="flex items-center justify-center gap-2 w-full hover:bg-[#c5aa6a]"
							>
								{buttonLoading ? (
									<span className="loading loading-spinner" />
								) : (
									<>
										<CreditCard className="w-5 h-5" />
										Buy
									</>
								)}
							</Button>
						</motion.div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ProductDetails;
