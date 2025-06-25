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
	const [loading, setLoading] = useState(true);
	const [buttonLoading, setButtonLoading] = useState(false);
	axios
		.get("https://b2-b-server.vercel.app/allOrders", {
			params: { email: user.email },
		})
		.then((res) => {
			setData(res.data);
			setLoading(false);
		});
	if (loading) {
		return <Loading></Loading>;
	}

	const handleDelete = (product) => {
		console.log(data);
		const obj = { quan: product.quantity };
		setButtonLoading(true);
		axios.put(`https://b2-b-server.vercel.app/product/${product.productId}`, obj);
		axios
			.delete(`https://b2-b-server.vercel.app/allOrders/${product._id}`)
			.then((res) => {
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
				setButtonLoading(false);
			});
	};

	return (
		<div>
			<h1 className="text-2xl md:text-4xl text-center font-bold py-10">
				Ordered Products {data?.length}
			</h1>
			<div className="flex flex-col gap-4 p-3">
				{data.map((product) => {
					return (
						<div className="px-3">
  <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4 mx-auto py-6 bg-white border border-gray-200 rounded-lg shadow-sm transition-transform duration-300 ease-in-out hover:scale-101">
    
    {/* Image */}
    <div className="flex justify-center items-center">
      <img
        className="w-40 h-40 object-cover rounded-lg"
        src={product.image}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://i.ibb.co/tpFRRSSV/depositphotos-531920820-stock-illustration-photo-available-vector-icon-default.webp";
        }}
        alt="product"
      />
    </div>

    {/* Product Info */}
    <div className="flex flex-col justify-center items-center">
      <h5 className="text-base md:text-xl font-semibold text-gray-700">{product.name}</h5>
      <h5 className="text-sm md:text-lg font-semibold text-gray-500">
        Brand: <span className="italic">{product.brand}</span>
      </h5>
    </div>

    {/* Quantity & Price */}
    <div className="flex flex-col justify-center items-center">
      <span className="text-base md:text-2xl font-bold text-gray-700">
        ${product.price}
      </span>
      <span className="text-sm md:text-lg font-bold text-gray-500">
        Quantity: {product.quantity}
      </span>
      <span className="text-sm md:text-lg font-bold text-gray-500">
        Total Cost: ${parseInt(product.quantity) * parseInt(product.price)}
      </span>
    </div>

    {/* Delete Button */}
    <div className="flex items-center justify-center">
      <button disabled={buttonLoading} onClick={() => handleDelete(product)}>
        {!buttonLoading ? (
          <ImCross color="red" size={30} />
        ) : (
          <span className="loading loading-spinner"></span>
        )}
      </button>
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
