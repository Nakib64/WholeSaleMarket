import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthContext";
import Loading from "../../Loading/Loading";
import { Bounce, toast } from "react-toastify";
import { ImCross } from "react-icons/im";
import { CreditCard, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import BuyModal from "./Modal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import OrdersTable from "./PlacedOrdrs";

export default function Cart() {
	const queryClient = useQueryClient();
	const { user, loading } = useContext(AuthContext);
	const [deletingId, setDeletingId] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);

	const { data: orders = [], isLoading } = useQuery({
		queryKey: ["cartOrders", user?.email],
		enabled: !!user?.email,
		queryFn: async () => {
			const res = await axios.get("https://b2-b-server-drab.vercel.app/allOrders", {
				params: { email: user.email },
			});
			return res.data;
		},
	});

	if (loading || isLoading) return <Loading />;

	const handleDelete = async (product) => {
		setDeletingId(product._id);
		try {
			await axios.put(`https://b2-b-server-drab.vercel.app/product/${product._id}`, {
				quan: product.quantity,
			});
			await axios.delete(`https://b2-b-server-drab.vercel.app/allOrders/${product._id}`);
			queryClient.invalidateQueries(["cartOrders"]);
			toast("🗑️ Item removed from cart!", {
				position: "top-right",
				autoClose: 2000,
				theme: "light",
				transition: Bounce,
			});
		} catch (err) {
			toast.error("Something went wrong!");
		} finally {
			setDeletingId(false);
		}
	};

	const handleBuy = (product) => {
		setSelectedProduct(product);
		setModalOpen(true);
	};

	const onBuySuccess = () => {
		setModalOpen(false);
		setSelectedProduct(null);
		queryClient.invalidateQueries(["cartOrders"]);
		toast.success("🎉 Purchase successful!", {
			position: "top-right",
			autoClose: 2000,
			theme: "light",
			transition: Bounce,
		});
	};

	return (
		<div className="w-full px-4 py-10 space-y-4">
			{/* Header */}
			<div className="flex flex-col md:flex-row justify-between items-center mb-10">
				<h1 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center gap-2">
					<ShoppingCart className="text-[#217b7e] w-8 h-8" />
					My Cart
					<span className="ml-2 bg-[#217b7e]/10 text-[#217b7e] px-3 py-1 rounded-full text-sm font-medium">
						{orders.length} items
					</span>
				</h1>
			</div>

			{/* Empty Cart */}
			{orders.length === 0 && (
				<div className="flex flex-col items-center justify-center py-20 text-gray-500">
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.4 }}
						className="flex flex-col items-center gap-4"
					>
						<ShoppingCart className="w-16 h-16 text-gray-400" />
						<p className="text-lg font-medium">Your cart is empty</p>
						<p className="text-sm text-gray-400 mb-4">
							Start shopping to fill your cart with amazing products!
						</p>
						<Button
							onClick={() => (window.location.href = "/")}
							className="bg-[#217b7e] hover:bg-[#176669] text-white"
						>
							Continue Shopping
						</Button>
					</motion.div>
				</div>
			)}

			{/* Cart Items */}
			<div className="grid gap-4 md:gap-6">
				{orders.map((product) => (
					<motion.div
						key={product._id}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}
						className="flex flex-col sm:flex-row justify-between items-center bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100 p-5"
					>
						{/* Product Info */}
						<div className="flex-1 text-left w-full sm:w-auto">
							<h2 className="text-lg font-semibold text-gray-800">
								{product.productsName}
							</h2>
							<p className="text-sm text-gray-600 mt-1">
								Quantity: <span className="font-medium">{product.quantity}</span>
							</p>
							<p className="text-lg font-bold text-[#217b7e] mt-1">
								${(product.price * product.quantity).toFixed(2)}
							</p>
						</div>

						{/* Action Buttons */}
						<div className="flex gap-3 mt-4 sm:mt-0">
							<Button
								variant="outline"
								size="sm"
								disabled={deletingId === product._id}
								onClick={() => handleDelete(product)}
								className="flex items-center gap-2 text-red-600 border-red-300 hover:bg-red-50"
							>
								{deletingId === product._id ? (
									<span className="loading loading-spinner" />
								) : (
									<>
										<Trash2 className="w-4 h-4" />
										Remove
									</>
								)}
							</Button>

							<Button
								size="sm"
                variant={"success"}
								className="bg-[#217b7e] text-white flex items-center gap-2"
								onClick={() => handleBuy(product)}
								disabled={selectedProduct?._id === product._id && modalOpen}
							>
								<CreditCard className="w-4 h-4" />
								Buy Now
							</Button>
						</div>
					</motion.div>
				))}
			</div>

			{/* Buy Modal */}
			<BuyModal
				open={modalOpen}
				onClose={() => setModalOpen(false)}
				product={selectedProduct}
				userEmail={user?.email}
				onSuccess={onBuySuccess}
			/>

			{/* Orders Table */}
			{!loading && <OrdersTable />}
		</div>
	);
}
