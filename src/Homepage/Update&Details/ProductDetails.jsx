import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Loading from "../../Loading/Loading";
import Swal from "sweetalert2";
import { Bounce, toast } from "react-toastify";
import { AuthContext } from "../../AuthContext/AuthContext";


const ProductDetails = () => {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const {user} = useContext(AuthContext)
	const navigate = useNavigate()
	useEffect(() => {
		axios.get("http://localhost:3000/products").then((res) => {
			const found = res.data.find((item) => item._id == id);
			setProduct(found);
			setLoading(false);
		});
	}, [id]);
	if (loading) {
		return <Loading></Loading>;
	}

	const handleBuy = (e) => {
		e.preventDefault();
		const quantity = e.target.quantity.value;

       const obj = {quan : quantity,
		dec: true
	   }
	   console.log(obj);
		if (product.minSellingQuantity> quantity) {
			toast("Does not follow buying limit!", {
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
		}
        else{
            const formData = new FormData(e.target)
			const data = Object.fromEntries(formData.entries())
			data.productId = id;
			console.log(data);

			axios.post('http://localhost:3000/allOrders', data).then(res=>{
				console.log(res.data);	
			})
			axios.put(`http://localhost:3000/product/${id}`, obj).then(res=>{
					 toast("Ordered Successfully!", {
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
				}).catch(error=>console.log(error))
        }
	};

	return (
		<div className="w-full max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-sm transition-transform duration-300 ease-in-out hover:scale-105 my-20">
			<a>
				<img
					className="px-8 rounded-t-lg"
					src={product.image}
					onError={(e) => {
						e.target.onerror = null; // prevent infinite loop
						e.target.src =
							"https://i.ibb.co/tpFRRSSV/depositphotos-531920820-stock-illustration-photo-available-vector-icon-default.webp";
					}}
					alt="product image"
				/>
			</a>
			<div className="px-5 pb-5">
				<div>
					<h5 className="text-xl font-semibold tracking-tight text-gray-500 ">
						{product.name}
					</h5>
					<h5 className="text-md font-semibold tracking-tight text-gray-500 ">
						{" "}
						Des: <span className="italic">{product.description}</span>
					</h5>
					<h5 className="text-md font-semibold tracking-tight text-gray-500 ">
						{" "}
						Brand: <span className="italic">{product.brand}</span>
					</h5>
				</div>
				<div>
					<h5 className="text-xl font-semibold tracking-tight text-gray-500 ">
						Available : {product.mainQuantity}
					</h5>
					<h5 className="text-xl font-semibold tracking-tight text-gray-500 ">
						Minimum Buying Quantity: {product.minSellingQuantity}
					</h5>
					<h5 className="text-md font-semibold tracking-tight text-gray-500 ">
						{" "}
						Brand: <span className="italic">{product.brand}</span>
					</h5>
				</div>
				<div className="flex items-center my-2.5">
					<span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm  ms-3">
						Rating: {product.rating}
					</span>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-3xl font-bold text-gray-500 ">${product.price}</span>
					{/* Open the modal using document.getElementById('ID').showModal() method */}
					{/* Open the modal using document.getElementById('ID').showModal() method */}
					<button
						className="btn"
						onClick={() => document.getElementById("my_modal_2").showModal()}
					>
						open modal
					</button>
					<dialog id="my_modal_2" className="modal">
						<div className="modal-box">
							<form onSubmit={handleBuy}>
								<div>
									<label className="block font-medium mb-1">Product Name:</label>
									<input
										type="text"
										name="name"
										defaultValue={product.name}
										placeholder="Enter product name"
										className=" border border-gray-300 rounded-2xl focus:outline-none p-2 w-full"
										required readOnly
									/>
								</div>

								{/* Main Quantity */}
								<div>
									<label className="block font-medium mb-1">Main Quantity:</label>
									<input
										type="number"
										defaultValue={product.mainQuantity}
										name="mainQuantity"
										placeholder="Total quantity available"
										className=" border border-gray-300 rounded-2xl focus:outline-none p-2 w-full"
										required readOnly
									/>
								</div>

								{/* Minimum Selling Quantity */}
								<div>
									<label className="block font-medium mb-1">
										Minimum Selling Quantity:
									</label>
									<input
										type="number"
										defaultValue={product.minSellingQuantity}
										name="minSellingQuantity"
										placeholder="Minimum quantity for purchase"
										className=" border border-gray-300 rounded-2xl focus:outline-none p-2 w-full"
										required readOnly
									/>
								</div>

								{/* Brand Name */}
								<div>
									<label className="block font-medium mb-1">Brand Name:</label>
									<input
										type="text"
										defaultValue={product.brand}
										name="brand"
										placeholder="Enter brand name"
										className=" border border-gray-300 rounded-2xl focus:outline-none p-2 w-full"
										required readOnly
									/>
								</div>

								

								
								{/* Price */}
								<div>
									<label className="block font-medium mb-1">Price (per unit):</label>
									<input
										type="number"
										defaultValue={product.price}
										name="price"
										placeholder="Enter price"
										className=" border border-gray-300 rounded-2xl focus:outline-none p-2 w-full"
										required readOnly
									/>
								</div>

								
								<div>
									<label className="block font-medium mb-1">Email :</label>
									<input
										type="email"
										name="email"
										className=" border border-gray-300 rounded-2xl focus:outline-none p-2 w-full"
										required readOnly
										defaultValue={user.email}
									/>
								</div>

                                <div>
									<label className="block font-medium mb-1">Buying Quantity :</label>
									<input
										type="number"
									
										name="quantity"
										placeholder="quantity"
										className=" border border-gray-300 rounded-2xl focus:outline-none p-2 w-full"
										required 
									/>
								</div>

                                <button className="btn btn-primary" type="submit">Buy</button>
							</form>
						</div>

						<form method="dialog" className="modal-backdrop">
							<button>close</button>
						</form>
					</dialog>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
