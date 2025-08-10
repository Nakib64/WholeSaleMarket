import React, { useContext } from "react";
import { FaOpencart } from "react-icons/fa";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "@/AuthContext/AuthContext";

const fetchOrderCount = async (email) => {
  const res = await axios.get("https://b2-b-server-drab.vercel.app/allOrders", {
    params: { email },
  });
  return res.data.length || 0;
};

const CartIcon = () => {
  const { user } = useContext(AuthContext);

  const { data: orderCount = 0, isLoading } = useQuery({
    queryKey: ["orderCount", user?.email],
    queryFn: () => fetchOrderCount(user.email),
    enabled: !!user?.email, // only run if user.email exists
    staleTime: 1000 * 60, // 1 minute cache for smoother UX, optional
  });

  if (!user) return null; // hide if not logged in

  return (
    <Link to="/cart" className="relative inline-block text-black">
      <FaOpencart size={35} />
      {!isLoading && orderCount > 0 && (
        <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center pointer-events-none select-none">
          {orderCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
