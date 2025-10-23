"use client";

import axios from "axios";
import React, { useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import Loading from "../../Loading/Loading";
import { Bounce, toast } from "react-toastify";
import { AuthContext } from "../../AuthContext/AuthContext";
import { ShoppingCart } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ProductDetailsSkeleton from "@/Loading/ProductDetailsSkeleton";

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
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const location = useLocation();

	const {
		data: products,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["products", id],
		queryFn: async () => {
			const { data } = await axios.get(`https://b2-b-server-drab.vercel.app/products/${id}`);
			return data;
		},
	});

	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(productSchema),
		defaultValues: { quantity: 0 },
	});

	const mutation = useMutation({
		mutationFn: async (orderData) => {
			if (!user?.email) {
				navigate("/auth/login");
				return;
			}
			await axios.post("https://b2-b-server-drab.vercel.app/allOrders", orderData);
			await axios.put(`https://b2-b-server-drab.vercel.app/product/${id}`, {
				quan: orderData.quantity,
				dec: true,
			});
		},
		onSuccess: () => {
			toast.success("Ordered Successfully!", { position: "top-right", autoClose: 2000, theme: "light", transition: Bounce });
			queryClient.invalidateQueries(["products", id]);
			navigate("/");
		},
		onError: () => {
			toast.error("Something went wrong!");
		},
	});

	if (isLoading) return <ProductDetailsSkeleton />;
	if (isError) return <div>Error: {error.message}</div>;
	if (!products) return <div>Product not found</div>;

	const onSubmit = (data) => {
		const quantity = Number(data.quantity);

		if (quantity > products.mainQuantity) {
			setError("quantity", { type: "manual", message: `Sorry! We don't have enough quantity.` });
			return;
		}

		if (quantity < products.minSellingQuantity || quantity > products.mainQuantity) {
			setError("quantity", {
				type: "manual",
				message: `Quantity must be between ${products.minSellingQuantity} and ${products.mainQuantity}`,
			});
			return;
		}
		clearErrors("quantity");

		const orderData = {
			productsId: id,
			image: products.image,
			quantity,
			email: user.email,
			productsName: products.name,
			price: products.price,
		};

		mutation.mutate(orderData);
	};

	const readOnlyFields = [
		{ label: "Product Name", value: products.name, name: "name" },
		{ label: "Available Quantity", value: products.mainQuantity, name: "mainQuantity" },
		{ label: "Min Buy Quantity", value: products.minSellingQuantity, name: "minSellingQuantity" },
		{ label: "Brand", value: products.brand, name: "brand" },
		{ label: "Price (per unit)", value: `$${products.price}`, name: "price" },
		{ label: "Email", value: user?.email || "", name: "email" },
	];

	return (
		<div className="max-w-6xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
			<div className="flex flex-col md:flex-row gap-10">
				{/* Left Column: Product Image */}
				<div className="flex-1 flex justify-center items-start">
					<img
						className="w-full max-w-md h-auto object-contain rounded-lg shadow-md"
						src={products.image}
						alt={products.name}
						onError={(e) => {
							e.target.onerror = null;
							e.target.src =
								"https://i.ibb.co/tpFRRSSV/depositphotos-531920820-stock-illustration-photo-available-vector-icon-default.webp";
						}}
					/>
				</div>

				{/* Right Column: Details + Order Form */}
				<div className="flex-1 space-y-6">
					<div className="space-y-2">
						<h1 className="text-3xl font-bold">{products.name}</h1>
						<p className="text-gray-600 italic">{products.description}</p>
						<p className="text-gray-700">
							Brand: <strong>{products.brand}</strong>
						</p>
						<p className="text-2xl font-extrabold text-green-600">${products.price}</p>
						<p className="text-gray-600">
							Available Quantity: <strong>{products.mainQuantity}</strong>
						</p>
						<p className="text-gray-600">
							Minimum Purchase Quantity: <strong>{products.minSellingQuantity}</strong>
						</p>
					</div>

					{/* Order Form */}
					<div className="bg-gray-50 p-6 rounded-lg shadow-inner">
						<h2 className="text-2xl font-semibold mb-6 border-b pb-2">Confirm Your Order</h2>

						<form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{readOnlyFields.map(({ label, value, name }) => (
									<div key={name} className="flex flex-col">
										<label htmlFor={name} className="mb-1 font-medium text-gray-700">{label}</label>
										<Input id={name} name={name} value={value} readOnly className="cursor-not-allowed bg-gray-200" />
									</div>
								))}

								<div className="flex flex-col">
									<label htmlFor="quantity" className="mb-1 font-medium text-gray-700">Buying Quantity</label>
									<Input
										id="quantity"
										type="number"
										min={products.minSellingQuantity}
										max={products.mainQuantity}
										placeholder={`Min: ${products.minSellingQuantity}`}
										{...register("quantity", { valueAsNumber: true })}
										className={errors.quantity ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}
									/>
									{errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>}
								</div>
							</div>

							<div className="flex flex-col md:flex-row gap-4">
								<motion.div whileTap={{ scale: 0.95 }} className="flex-1">
									<Button
										type="submit"
										disabled={mutation.isLoading}
										className="flex items-center justify-center gap-2 w-full bg-teal-600 hover:bg-teal-700"
									>
										{mutation.isLoading ? <span className="loading loading-spinner" /> : <><ShoppingCart className="w-5 h-5" /> Add to Cart</>}
									</Button>
								</motion.div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
