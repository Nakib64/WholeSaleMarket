import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthContext";
import Loading from "../../Loading/Loading";
import { Bounce, toast } from "react-toastify";

import { ImCross } from "react-icons/im";
import { ShoppingCart, CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import BuyModal from "./Modal"; // import the modal component
import { useQuery, useQueryClient } from "@tanstack/react-query";
import OrdersTable from "./PlacedOrdrs";

const Cart = () => {
  const queryClient = useQueryClient();

  const { user, loading } = useContext(AuthContext);
  const [deletingId, setDeletingId] = useState(false);
  // const [checkout, setCheckOUt] = useState(false);

  // Modal-related state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const {data: orders, isLoading, refetch} = useQuery({
    queryKey:['productId'],
    queryFn:async()=>{
   const res = await axios
      .get("https://b2-b-server-drab.vercel.app/allOrders", {
        params: { email: user.email },
      })
    return res.data
    }
  })




  if (isLoading) return <Loading />;

  const handleDelete = async (product) => {
    setDeletingId(product._id);
    try {
      await axios.put(
        `https://b2-b-server-drab.vercel.app/product/${product._id}`,
        {
          quan: product.quantity,
        }
      );
      await axios.delete(
        `https://b2-b-server-drab.vercel.app/allOrders/${product._id}`
      );
      queryClient.invalidateQueries(["productId"]);  // ✅ auto refresh

      toast("Deleted Successfully!", {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
        transition: Bounce,
      });
      refetch()
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setDeletingId(false);
    }
  };

  // Open modal to buy product
  const handleBuy = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  // Called by BuyModal on successful purchase
  const onBuySuccess = (productId) => {
    setData((prev) => prev.filter((p) => p._id !== productId));
    setModalOpen(false);
    setSelectedProduct(null);
    toast.success("Purchase completed!", {
      position: "top-right",
      autoClose: 2000,
      theme: "light",
      transition: Bounce,
    });
  };

 

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-10  ">
      <h1 className="text-3xl font-semibold text-center mb-8">
        Your Cart ({orders.length} items)
      </h1>
     
      <div className="flex flex-col gap-4 max-w-3xl mx-auto">
        {orders?.length === 0 && (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}

        {orders?.map((product) => (
          <div
            key={product._id}
            className="flex flex-row justify-between items-center bg-white rounded-md shadow-sm p-4 border border-gray-200"
          >
            {/* Product info */}
            <div className="flex-1 text-left  md:text-left">
              <p className="mt-1 text-gray-700">
                <span className="font-semibold">{product.productsName}</span>
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
                variant="outline"
                size="sm"
                disabled={deletingId === product._id}
                className="flex items-center gap-1 px-3"
                onClick={() => handleDelete(product)}
              >
                {deletingId === product._id && (
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
                  disabled={selectedProduct?._id === product._id && modalOpen}
                >
                  {selectedProduct?._id === product._id && modalOpen ? (
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

        {loading == false && <OrdersTable></OrdersTable>}
        
      
      
    </div>
  );
};

export default Cart;
