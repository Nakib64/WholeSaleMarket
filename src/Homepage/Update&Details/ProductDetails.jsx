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
	const [buttonLoading, setButtonLoading] = useState(false)
	const {user} = useContext(AuthContext)
	const navigate = useNavigate()
	useEffect(() => {
		axios.get("https://b2-b-server.vercel.app/products").then((res) => {
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
		setButtonLoading(true)
       const obj = {quan : quantity,
		dec: true
	   }
	   console.log(obj);
		if ((product.minSellingQuantity> quantity) || (product.mainQuantity < quantity)) {
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
			document.getElementById("my_modal_2").close();
		}
        else{
            const formData = new FormData(e.target)
			const data = Object.fromEntries(formData.entries())
			data.productId = id;
			console.log(data);

			axios.post('https://b2-b-server.vercel.app/allOrders', data).then(res=>{
					
			})
			axios.put(`https://b2-b-server.vercel.app/product/${id}`, obj).then(res=>{
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
							setButtonLoading(false)
				}).catch(error=>console.log(error))
        }
	};

	return (
		<div className="w-full max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-sm transition-transform duration-300 ease-in-out hover:scale-105 my-10">
  <a>
    <img
      className="w-full h-60 object-cover rounded-t-lg"
      src={product.image}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src =
          "https://i.ibb.co/tpFRRSSV/depositphotos-531920820-stock-illustration-photo-available-vector-icon-default.webp";
      }}
      alt="product"
    />
  </a>

  <div className="px-5 py-4 space-y-2">
    <h5 className="text-lg md:text-xl font-semibold text-gray-700">{product.name}</h5>
    <p className="text-sm text-gray-500">
      Des: <span className="italic">{product.description}</span>
    </p>
    <p className="text-sm text-gray-500">
      Brand: <span className="italic">{product.brand}</span>
    </p>

    <div className="space-y-1">
      <p className="text-sm text-gray-500">
        Available: <span className="font-semibold">{product.mainQuantity}</span>
      </p>
      <p className="text-sm text-gray-500">
        Min Buy Qty: <span className="font-semibold">{product.minSellingQuantity}</span>
      </p>
    </div>

    <div className="flex items-center gap-3">
      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
        Rating: {product.rating}
      </span>
    </div>

    <div className="flex items-center justify-between mt-3">
      <span className="text-2xl font-bold text-gray-700">${product.price}</span>
      <button
        className="btn btn-sm bg-yellow-400 hover:bg-yellow-500"
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        Buy
      </button>
    </div>
  </div>

  {/* Modal */}
  <dialog id="my_modal_2" className="modal">
    <div className="modal-box">
      <form onSubmit={handleBuy} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            defaultValue={product.name}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Main Quantity */}
        <div>
          <label className="block font-medium mb-1">Main Quantity</label>
          <input
            type="number"
            name="mainQuantity"
            defaultValue={product.mainQuantity}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Minimum Selling Quantity */}
        <div>
          <label className="block font-medium mb-1">Min Buy Quantity</label>
          <input
            type="number"
            name="minSellingQuantity"
            defaultValue={product.minSellingQuantity}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Brand */}
        <div>
          <label className="block font-medium mb-1">Brand</label>
          <input
            type="text"
            name="brand"
            defaultValue={product.brand}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium mb-1">Price (per unit)</label>
          <input
            type="number"
            name="price"
            defaultValue={product.price}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            defaultValue={user.email}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Buying Quantity */}
        <div>
          <label className="block font-medium mb-1">Buying Quantity</label>
          <input
            type="number"
            name="quantity"
            required
            placeholder="Enter quantity"
            className="input input-bordered w-full"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button type={!buttonLoading ? 'submit': 'button'} disabled={buttonLoading && true} className="btn btn-primary ">
            {
				buttonLoading? <span className="loading loading-spinner"></span>: 'Buy'
			}
          </button>
        </div>
      </form>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </div>
  </dialog>
</div>

	);
};

export default ProductDetails;
