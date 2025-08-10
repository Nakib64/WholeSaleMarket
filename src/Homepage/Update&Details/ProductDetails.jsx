import axios from "axios";
import React, { useContext } from "react";
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

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const productSchema = z.object({
	quantity: z
		.number({
			required_error: "Quantity is required",
			invalid_type_error: "Quantity must be a number",
		})
		.min(1, "Quantity must be at least 1"),
});

const fetchAllProducts = async () => {
	const { data } = await axios.get("https://b2-b-server-drab.vercel.app/products");
	return data; // assuming array of products
};

const ProductDetails = () => {
	const { id } = useParams();
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	// Fetch all products and then find product by id
	const {
		data: products,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["products"],
		queryFn: fetchAllProducts,
	});

	// Find product by id from fetched products
	const product = products?.find((p) => p._id === id);

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

	const mutation = useMutation({
  mutationFn: (orderData) =>
    axios
      .post("https://b2-b-server-drab.vercel.app/allOrders", orderData)
      .then(() =>
        axios.put(`https://b2-b-server-drab.vercel.app/product/${id}`, {
          quan: orderData.quantity,
          dec: true,
        })
      ),
		
			onSuccess: () => {
				toast.success("Ordered Successfully!", {
					position: "top-right",
					autoClose: 2000,
					theme: "light",
					transition: Bounce,
				});
				queryClient.invalidateQueries(["products"]); // refetch products list
				navigate("/");
			},
			onError: () => {
				toast.error("Something went wrong!");
			},
		}
	);

	if (isLoading) return <Loading />;
	if (isError) return <div>Error: {error.message}</div>;
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

		const orderData = {
			productId: id,
			image: product.image,
			quantity,
			email: user.email,
			productName: product.name,
			price: product.price,
		};

		mutation.mutate(orderData);
	};

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

			<div className="bg-gray-50 p-6 rounded-lg shadow-inner">
				<h2 className="text-2xl font-semibold mb-6 border-b pb-2">
					Confirm Your Order
				</h2>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className="space-y-6 max-w-full"
					noValidate
				>
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

					<div className="flex flex-col md:flex-row gap-4">
						<motion.div whileTap={{ scale: 0.95 }} className="flex-1">
							<Button
								type="button"
								disabled={mutation.isLoading}
								variant="outline"
								className="flex items-center justify-center gap-2 w-full"
								onClick={() => toast.info("Add to cart not implemented yet")}
							>
								{mutation.isLoading ? (
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
								disabled={mutation.isLoading}
								className="flex items-center justify-center gap-2 w-full hover:bg-[#c5aa6a]"
							>
								{mutation.isLoading ? (
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
