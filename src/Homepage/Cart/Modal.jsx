import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";

export default function BuyModal({ open, onClose, product, userEmail }) {
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [gateway, setGateway] = useState("stripe");
	const [processing, setProcessing] = useState(false);
	const [error, setError] = useState(null);
const queryClient = useQueryClient();

	useEffect(() => {
		if (!open) {
			setPhone("");
			setAddress("");
			setGateway("stripe");
			setError(null);
		}
	}, [open]);

	if (!open || !product) return null;

	const productPrice = Number(product.price || 0);
	const delivery = 5;
	const total = (productPrice + delivery).toFixed(2);

	const validate = () => {
		if (!phone.trim()) return "Phone is required";
		if (!address.trim()) return "Address is required";
		return null;
	};

	async function handleSubmit(e) {
		e.preventDefault();
		setError(null);
		const v = validate();
		if (v) {
			setError(v);
			return;
		}

		setProcessing(true);

		const payload = {
			productId: product._id,
			productName: product.name,
			productPrice: product.price,
			quantity:product.quantity,
			deliveryCharge: delivery ,
			total: Number(total),
			email: userEmail || null,
			phone,
			address,
			gateway,
			status: "pending",
		};

		try {
			if (gateway == "cash") {
				axios
					.post("https://b2-b-server-drab.vercel.app/placedOrder", payload)
					.then((res) => {
						Swal.fire({
							title: "Order Placed!",
							icon: "success",
							draggable: true,
						});
						axios.delete(
							`https://b2-b-server-drab.vercel.app/allOrders/${product._id}`
						).then(()=>{
							queryClient.invalidateQueries(['status']);
								onClose();
						})
					
					});
			}
		} catch (err) {
			setError(err.message || "Payment start failed");
		} finally {
			setProcessing(false);
		}
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3 ">
			<Card className="w-full max-h-[70vh] max-w-3xl p-6 rounded-xl shadow-lg overflow-auto">
				<div className="flex justify-between items-start h-full">
					<h3 className="text-xl font-semibold">Confirm Purchase</h3>
					<button onClick={onClose} className="text-gray-500 hover:text-gray-800">
						✕
					</button>
				</div>

				<div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* Product Preview */}
					<CardContent className="flex flex-col items-center gap-3">
						<div className="w-40 h-40 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
							{product.image ? (
								<img
									src={product.image}
									alt={product.name}
									className="w-full h-full object-cover"
								/>
							) : (
								<span className="text-sm text-gray-500">No Image</span>
							)}
						</div>
						<div className="text-center">
							<h4 className="font-medium">{product.name}</h4>
							<p className="text-sm text-gray-500">{product.category || ""}</p>
						</div>
						<div className="mt-2 text-gray-700">
							<div>
								Price: <span className="font-medium">{productPrice.toFixed(2)}</span>
							</div>
							<div>
								Delivery: <span className="font-medium">{delivery.toFixed(2)}</span>
							</div>
							<div className="text-lg font-semibold mt-1">Total: {total}</div>
						</div>
					</CardContent>

					{/* Form */}
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<Label>Your Email</Label>
							<Input
								value={userEmail || ""}
								readOnly
								className="bg-gray-50 border-none"
							/>
						</div>

						<div className="space-y-2">
							<Label>Phone Number</Label>
							<PhoneInput
								country={"bd"}
								value={phone}
								onChange={setPhone}
								enableSearch={true}
								inputClass="w-full !py-5"
							/>
						</div>

						<div className="space-y-2">
							<Label>Delivery Address</Label>
							<Textarea
								value={address}
								onChange={(e) => setAddress(e.target.value)}
								rows={3}
							/>
						</div>

						{/* Payment Method */}
						<div>
							<Label>Payment Method</Label>
							<div className="flex gap-3 mt-2">
								{/* Stripe */}
								{/* <div className="relative group">
									<button
										type="button"
										onClick={() => setGateway("stripe")}
										className={`flex items-center justify-center border rounded-lg p-1 w-14 h-14 transition ${
											gateway === "stripe"
												? "border-indigo-500 bg-indigo-50"
												: "border-gray-300"
										}`}
									>
										<img
											src="https://i.ibb.co.com/Q3rK85bJ/8d57eac4b78e83e49793fb8503c6b82d.png"
											alt="Stripe"max-h-[70vh]
											className="h-6"
										/>
									</button>
									<span className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs px-2 py-1 bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition">
										Stripe
									</span>
								</div>

							
								<div className="relative group">
									<button
										type="button"
										onClick={() => setGateway("sslcommerz")}
										className={`flex items-center justify-center border rounded-lg p-1 w-14 h-14 transition ${
											gateway === "sslcommerz"
												? "border-indigo-500 bg-indigo-50"
												: "border-gray-300"
										}`}
									>
										<img
											src="https://i.ibb.co.com/GNNV9Jj/download.png"
											alt="SSLCOMMERZ"
											className="h-6"
										/>
									</button>
									<span className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs px-2 py-1 bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition">
										SSLCOMMERZ
									</span>
								</div> */}

								{/* Cash on Delivery */}
								<div className="relative group">
									<button
										type="button"
										onClick={() => setGateway("cash")}
										className={`flex items-center justify-center border rounded-lg p-1 w-14 h-14 transition ${
											gateway === "cash"
												? "border-indigo-500 bg-indigo-50"
												: "border-gray-300"
										}`}
									>
										<img
											src="https://i.ibb.co.com/4nnYm2fC/Pngtree-cash-on-delivery-order-logo-6357220.png"
											alt="Cash on Delivery"
											className="h-6"
										/>
									</button>
									<span className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs px-2 py-1 bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition">
										Cash on Delivery
									</span>
								</div>
							</div>
						</div>

						{error && <p className="text-sm text-red-500">{error}</p>}

						<div className="flex justify-end gap-3 pt-2">
							<Button type="button" variant="outline" onClick={onClose}>
								Cancel
							</Button>
							<Button type="submit" disabled={processing}>
								{processing ? "Processing..." : `Place order`}
							</Button>
						</div>
					</form>
				</div>
			</Card>
		</div>
	);
}
