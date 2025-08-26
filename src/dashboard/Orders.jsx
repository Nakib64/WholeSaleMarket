import { AuthContext } from "@/AuthContext/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { Loader2, CheckCircle, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button"; // ✅ shadcn button

export default function OrdersTable() {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // Fetch Orders
  const { data: placedOrders = [], isLoading } = useQuery({
    queryKey: ["placedOrders"],
    queryFn: async () => {
      const result = await axios.get(
        "https://b2-b-server-drab.vercel.app/placedOrders"
      );
      return result.data;
    },
  });

  // Approve Mutation
  const approveMutation = useMutation({
    mutationFn: async (id) =>
      await axios.patch(
        `https://b2-b-server-drab.vercel.app/placedOrders?id=${id}&status=Approved`,
        
      ),
    onSuccess: () => {
      Swal.fire({
        title: "Approved!",
        icon: "success",
        draggable: true,
      });
      queryClient.invalidateQueries(["placedOrders"]);
    },
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) =>
      await axios.delete(
        `https://b2-b-server-drab.vercel.app/placedOrders?id=${id}`
      ),
    onSuccess: () => {
      Swal.fire({
        title: "Deleted!",
        icon: "success",
        draggable: true,
      });
      queryClient.invalidateQueries(["placedOrders"]);
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin text-[#217b7e]" size={40} />
      </div>
    );
  }

  if (!placedOrders.length) {
    return (
      <p className="text-center text-gray-500 mt-8 font-medium">
        No orders found.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full border border-gray-200 rounded-lg shadow-lg overflow-hidden">
        <thead className="bg-[#217b7e] text-white text-sm uppercase">
          <tr>
            <th className="py-3 px-4 text-left">Product</th>
            <th className="py-3 px-4 text-right">Price</th>
            <th className="py-3 px-4 text-right">Delivery</th>
            <th className="py-3 px-4 text-right">Total</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Phone</th>
            <th className="py-3 px-4 text-left">Address</th>
            <th className="py-3 px-4 text-left">Gateway</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {placedOrders.map((order) => (
            <tr
              key={order._id}
              className="border-t border-gray-200 hover:bg-gray-50 transition"
            >
              <td className="py-3 px-4 font-semibold">{order.productId}</td>
              <td className="py-3 px-4 text-right">${order.productPrice}</td>
              <td className="py-3 px-4 text-right">${order.deliveryCharge}</td>
              <td className="py-3 px-4 text-right font-bold text-[#217b7e]">
                ${order.total}
              </td>
              <td className="py-3 px-4">{order.email}</td>
              <td className="py-3 px-4">{order.phone}</td>
              <td
                className="py-3 px-4 max-w-xs truncate"
                title={order.address}
              >
                {order.address}
              </td>
              <td className="py-3 px-4 capitalize">{order.gateway}</td>
              <td className="py-3 px-4">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    order.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : order.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : order.status === "canceled"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="py-3 px-4 flex gap-2 justify-center">
                {order.status === "pending" && (
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => approveMutation.mutate(order._id)}
                    disabled={approveMutation.isLoading}
                  >
                    {approveMutation.isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <CheckCircle className="mr-2 h-4 w-4" />
                    )}
                    Approve
                  </Button>
                )}
                {order.status !== "Approved" && (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteMutation.mutate(order._id)}
                    disabled={deleteMutation.isLoading}
                  >
                    {deleteMutation.isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="mr-2 h-4 w-4" />
                    )}
                    Delete
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
