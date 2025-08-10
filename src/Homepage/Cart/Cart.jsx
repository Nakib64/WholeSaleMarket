import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthContext";
import Loading from "../../Loading/Loading";
import { Bounce, toast } from "react-toastify";

import { ImCross } from "react-icons/im";
import { ShoppingCart, CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { check } from "zod";

const Cart = () => {
	const [data, setData] = useState([]);
	const { user } = useContext(AuthContext);
	const [loading, setLoading] = useState(true);
	const [buyingId, setBuyingId] = useState(false);
	const [deletingId, setDeletingId] = useState(false);
	const [checkout, setCheckOUt] = useState(false)

	useEffect(() => {
		if (!user?.email) return;
		setLoading(true);
		axios
			.get("https://b2-b-server-drab.vercel.app/allOrders", {
				params: { email: user.email },
			})
			.then((res) => {
				setData(res.data);
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, [user?.email]);

	if (loading) return <Loading />;

	const handleDelete = async (product) => {
		setDeletingId(product._id);
		try {
			await axios.put(
				`https://b2-b-server-drab.vercel.app/product/${product.productId}`,
				{
					quan: product.quantity,
				}
			);
			await axios.delete(
				`https://b2-b-server-drab.vercel.app/allOrders/${product._id}`
			);
			toast("Deleted Successfully!", {
				position: "top-right",
				autoClose: 2000,
				theme: "light",
				transition: Bounce,
			});
			setData((prev) => prev.filter((p) => p._id !== product._id));
		} catch (err) {
			toast.error("Something went wrong!");
		} finally {
			setDeletingId(false);
		}
	};

	const handleBuy = async (product) => {
		setBuyingId(product._id);
		try {
			toast.success(`Bought "${product.name}" successfully!`, {
				position: "top-right",
				autoClose: 2000,
				theme: "light",
				transition: Bounce,
			});
			setData((prev) => prev.filter((p) => p._id !== product._id));
		} catch {
			toast.error("Purchase failed!");
		} finally {
			deletingId(null);
		}
	};

	const handleCheckoutAll = async () => {
		setDeletingId(true);
		try {
			toast.success("Checked out all products successfully!", {
				position: "top-right",
				autoClose: 2000,
				theme: "light",
				transition: Bounce,
			});
			setData([]);
		} catch {
			toast.error("Checkout failed!");
		} finally {
			setDeletingId(false);
		}
	};

	return (
		<div className="max-w-3xl mx-auto p-4">
			<h1 className="text-3xl font-semibold text-center mb-8">
				Your Cart ({data.length} items)
			</h1>
			{/* Checkout All */}
			{data.length > 0 && (
				<motion.div
					whileTap={{ scale: 0.95 }}
					className="mt-10 text-center flex justify-end my-6"
				>
					<Button
						size="lg"
						className="flex items-center justify-end gap-2 px-6"
						onClick={()=>setCheckOUt(true)}
						disabled={checkout}
					>
						{checkout ? (
							<span className="loading loading-spinner" />
						) : (
							<>
								<ShoppingCart className="w-5 h-5" />
								Checkout All
							</>
						)}
					</Button>
				</motion.div>
			)}

			<div className="flex flex-col gap-4">
				{data.length === 0 && (
					<p className="text-center text-gray-500">Your cart is empty.</p>
				)}

				{data.map((product) => {
					console.log(product);
					return (
						<div
							key={product._id}
							className="flex flex-row justify-between items-center bg-white rounded-md shadow-sm p-4 border border-gray-200"
						>
							{/* Product info */}
							<div className="flex-1 text-left  md:text-left">
								<p className="mt-1 text-gray-700">
									<span className="font-semibold">{product.productName}</span>
								</p>
								<p className="mt-1 text-gray-700">
									Quantity: <span className="font-semibold">{product.quantity}</span>
								</p>
								<p className="text-gray-900 font-bold">
									Total: ${product.price * product.quantity}
								</p>
							</div>

							{/* Action buttons */}
							<div className="flex gap-3 mt-4 md:mt-0">
								<Button
									variant="destructive"
									size="sm"
									disabled= {deletingId}
									className="flex items-center gap-1 px-3"
									onClick={() => handleDelete(product)}
									
								>
									{deletingId == product._id && (
										<span className="loading loading-spinner" />
									)}
									<ImCross />
									Delete
								</Button>

								<motion.div whileTap={{ scale: 0.95 }}>
									<Button
										size="sm"
										className="flex items-center gap-1 px-3"
										onClick={() => handleBuy(product)}
										disabled={buyingId === product._id}
									>
										{buyingId === product._id ? (
											<span className="loading loading-spinner" />
										) : (
											<>
												<CreditCard className="w-4 h-4" />
												Buy
											</>
										)}
									</Button>
								</motion.div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Cart;
