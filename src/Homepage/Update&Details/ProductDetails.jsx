import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Loading from "../../Loading/Loading";
import { Bounce, toast } from "react-toastify";
import { AuthContext } from "../../AuthContext/AuthContext";

const ProductDetails = () => {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [buttonLoading, setButtonLoading] = useState(false);
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		axios.get("https://b2-b-server.vercel.app/products").then((res) => {
			const found = res.data.find((item) => item._id === id);
			setProduct(found);
			setLoading(false);
		});
	}, [id]);

	if (loading) return <Loading />;

	if (!product) return <div>Product not found</div>;

	const handleBuy = (e) => {
		e.preventDefault();
		const quantity = parseInt(e.target.quantity.value);
		setButtonLoading(true);

		if (
			quantity < product.minSellingQuantity ||
			quantity > product.mainQuantity
		) {
			toast("Does not follow buying limit!", {
				position: "top-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				theme: "light",
				transition: Bounce,
			});
			setButtonLoading(false);
			return;
		}

		const data = {
			productId: id,
			image: product.image,
			quantity,
			email: user.email,
			productName: product.name,
			price: product.price,
		};

		const decrementObj = { quan: quantity, dec: true };

		axios
			.post("https://b2-b-server.vercel.app/allOrders", data)
			.then(() =>
				axios.put(`https://b2-b-server.vercel.app/product/${id}`, decrementObj)
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

				<form onSubmit={handleBuy} className="space-y-5 max-w-md">
					<div>
						<label className="block mb-1 font-medium text-gray-700">
							Product Name
						</label>
						<input
							type="text"
							name="name"
							defaultValue={product.name}
							readOnly
							className="input input-bordered w-full cursor-not-allowed bg-gray-200"
						/>
					</div>

					<div>
						<label className="block mb-1 font-medium text-gray-700">
							Main Quantity
						</label>
						<input
							type="number"
							name="mainQuantity"
							defaultValue={product.mainQuantity}
							readOnly
							className="input input-bordered w-full cursor-not-allowed bg-gray-200"
						/>
					</div>

					<div>
						<label className="block mb-1 font-medium text-gray-700">
							Min Buy Quantity
						</label>
						<input
							type="number"
							name="minSellingQuantity"
							defaultValue={product.minSellingQuantity}
							readOnly
							className="input input-bordered w-full cursor-not-allowed bg-gray-200"
						/>
					</div>

					<div>
						<label className="block mb-1 font-medium text-gray-700">Brand</label>
						<input
							type="text"
							name="brand"
							defaultValue={product.brand}
							readOnly
							className="input input-bordered w-full cursor-not-allowed bg-gray-200"
						/>
					</div>

					<div>
						<label className="block mb-1 font-medium text-gray-700">
							Price (per unit)
						</label>
						<input
							type="number"
							name="price"
							defaultValue={product.price}
							readOnly
							className="input input-bordered w-full cursor-not-allowed bg-gray-200"
						/>
					</div>

					<div>
						<label className="block mb-1 font-medium text-gray-700">Email</label>
						<input
							type="email"
							name="email"
							defaultValue={user.email}
							readOnly
							className="input input-bordered w-full cursor-not-allowed bg-gray-200"
						/>
					</div>

					<div>
						<label className="block mb-1 font-medium text-gray-700">
							Buying Quantity
						</label>
						<input
							type="number"
							name="quantity"
							required
							min={product.minSellingQuantity}
							max={product.mainQuantity}
							placeholder={`Min: ${product.minSellingQuantity}`}
							className="input input-bordered w-full"
						/>
					</div>

					<button
						type={!buttonLoading ? "submit" : "button"}
						disabled={buttonLoading}
						className="btn btn-primary"
					>
						{buttonLoading ? <span className="loading loading-spinner" /> : "Buy"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default ProductDetails;
