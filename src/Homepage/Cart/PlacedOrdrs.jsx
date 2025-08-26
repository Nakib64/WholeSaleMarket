import { AuthContext } from "@/AuthContext/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";


export default function OrdersTable() {

    const {user} = useContext(AuthContext)
   

      const {data: placedOrders, isLoading: place} = useQuery({
    queryKey:['status'],
    queryFn:async()=>{
     const result = await axios.get('https://b2-b-server-drab.vercel.app/placedOrders', {params:{email : user?.email}})
      return result.data
    }
  })
  if (place || placedOrders.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-8">
        No orders found.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-[#217b7e] text-white">
          <tr>
            <th className="py-3 px-4 text-left">Product ID</th>
            <th className="py-3 px-4 text-left">Product Name</th>
            <th className="py-3 px-4 text-right">Price ($)</th>
            <th className="py-3 px-4 text-right">Delivery ($)</th>
            <th className="py-3 px-4 text-right">Total ($)</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Phone</th>
            <th className="py-3 px-4 text-left">Address</th>
            <th className="py-3 px-4 text-left">Payment Gateway</th>
            <th className="py-3 px-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {placedOrders.map((order) => (
            <tr
              key={order._id} // unique key
              className="border-t border-gray-200 hover:bg-indigo-50 transition"
            >
              <td className="py-2 px-4">{order.productId}</td>
              <td className="py-2 px-4 font-semibold">{order.productName}</td>
              <td className="py-2 px-4 text-right">{order.productPrice}</td>
              <td className="py-2 px-4 text-right">{order.deliveryCharge}</td>
              <td className="py-2 px-4 text-right font-semibold">{order.total}</td>
              <td className="py-2 px-4">{order.email}</td>
              <td className="py-2 px-4">{order.phone}</td>
              <td className="py-2 px-4 max-w-xs truncate" title={order.address}>
                {order.address}
              </td>
              <td className="py-2 px-4 capitalize">{order.gateway}</td>
              <td className="py-2 px-4">
                <span
                  className={`inline-block px-2 py-1 rounded text-sm font-semibold ${
                    order.status === "pending"
                      ? "bg-[#217b7e] text-white/50"
                      : order.status === "completed" || order.status === "done"
                      ? "bg-green-200 text-green-800"
                      : order.status === "canceled"
                      ? "bg-red-200 text-red-800"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
