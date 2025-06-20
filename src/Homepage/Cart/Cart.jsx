import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthContext";
import Table from "../nav/Product/Table";
import Loading from "../../Loading/Loading";
import { Link } from "react-router";
import { ImCross } from "react-icons/im";
import { Bounce, toast } from "react-toastify";
const Cart = () => {
	const [data, setData] = useState(null);
	const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true)
	axios
		.get("http://localhost:3000/allOrders", {
			params: { email: user.email },
		})
		.then((res) => {
			setData(res.data);
            setLoading(false)
		});
        if(loading){
            return <Loading></Loading>
        }

        const handleDelete=(product)=>{
            console.log(product);
            const obj = {quan : product.quantity
               
            }
            console.log(obj);
            axios.put(`http://localhost:3000/product/${product.productId}`, obj)
            axios.delete(`http://localhost:3000/allOrders/${product._id}`).then(res=>{
                toast("deleted Successfully!", {
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
            })
        }

	return (
		<div>
			<h1 className="text-2xl md:text-4xl text-center font-bold py-10">
				Ordered Products {data?.length}
			</h1>
			<div className="flex flex-col gap-4 p-3">
				{data.map((product) => {
					return (
						<div className="px-3">
							<div class="w-full grid grid-cols-4 mx-auto py-10 bg-white border border-gray-200 rounded-lg shadow-sm transition-transform duration-300 ease-in-out hover:scale-101">
								<div className="flex items-center">
									<img
										class=" w-full rounded-t-lg "
										src={product.image}
										onError={(e) => {
											e.target.onerror = null; // prevent infinite loop
											e.target.src =
												"https://i.ibb.co/tpFRRSSV/depositphotos-531920820-stock-illustration-photo-available-vector-icon-default.webp";
										}}
										alt="product image"
									/>
								</div>

								<div className="flex flex-col justify-center">
									<h5 class="text-sm md:text-xl font-semibold tracking-tight text-gray-500 ">
										{product.name}
									</h5>
									<h5 class="text-xs md:text-lg font-semibold tracking-tight text-gray-500 ">
										Brand: <span className="italic">{product.brand}</span>
									</h5>
								</div>
								<div class="flex flex-col justify-center ">
									
									<span class="text-sm md:text-3xl font-bold text-gray-500 ">
										${product.price}
									</span>
									<span class="text-sm md:text-3xl font-bold text-gray-500 ">
										Quantity: {product.quantity}
									</span>
									<span class="text-sm md:text-3xl font-bold text-gray-500 ">
										Total Cost: {parseInt(product.quantity)* parseInt(product.price)}
									</span>
								</div>
								<div class="flex items-center justify-center">
									
									
										<button onClick={()=>handleDelete(product)}><ImCross color="red" size={30}/></button>
									
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Cart;
