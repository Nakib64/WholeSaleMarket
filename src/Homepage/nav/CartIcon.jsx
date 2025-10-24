import React, { useContext } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { GiShoppingCart } from "react-icons/gi";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
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
		enabled: !!user?.email,
		staleTime: 1000 * 60,
	});

	if (!user) return null;

	return (
		<Link to="/cart" className="relative inline-block text-black">
			<GiShoppingCart size={35} className="text-gray-900" />
			
			{!isLoading && orderCount > 0 && (
				<Badge
					variant="destructive"
					className="absolute -top-1 tabular-nums -right-2 text-[10px] font-bold w-5 h-5 p-0 rounded-full flex items-center justify-center"
				>
					{orderCount}
				</Badge>
			)}
		</Link>
	);
};

export default CartIcon;
