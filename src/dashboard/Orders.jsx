import { AuthContext } from "@/AuthContext/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Loader2, CheckCircle, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button"; // shadcn button
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function OrdersTable() {
	const { user } = useContext(AuthContext);
	const queryClient = useQueryClient();

	// ✅ Filter and pagination state
	const [statusFilter, setStatusFilter] = useState("all");
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);

	// ✅ Fetch Orders with filters and pagination
	const { data, isLoading } = useQuery({
		queryKey: ["placedOrders", statusFilter, page, limit],
		queryFn: async () => {
			const res = await axios.get(
				"https://b2-b-server-drab.vercel.app/placedOrders",
				{
					params: { status: statusFilter, page, limit },
				}
			);
			return res.data; // expected shape: { orders: [], totalPages: number }
		},
		keepPreviousData: true,
	});

	const placedOrders = data?.orders || [];
	const totalPages = data?.totalPages || 1;

	// ✅ Approve Mutation
	const approveMutation = useMutation({
		mutationFn: async (id) =>
			await axios.patch(
				`https://b2-b-server-drab.vercel.app/placedOrders?id=${id}&status=Approved`
			),
		onSuccess: () => {
			Swal.fire({ title: "Approved!", icon: "success" });
			queryClient.invalidateQueries(["placedOrders"]);
		},
	});

	// ✅ Delete Mutation
	const deleteMutation = useMutation({
		mutationFn: async (id) =>
			await axios.delete(
				`https://b2-b-server-drab.vercel.app/placedOrders?id=${id}`
			),
		onSuccess: () => {
			Swal.fire({ title: "Deleted!", icon: "success" });
			queryClient.invalidateQueries(["placedOrders"]);
		},
	});

	// ✅ Loading state
	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-40">
				<Loader2 className="animate-spin text-[#217b7e]" size={40} />
			</div>
		);
	}

	// ✅ No data state

	return (
		<div className="space-y-4 mt-6">
			{/* 🔹 Filter & Pagination Controls */}
			<div className="flex flex-wrap gap-4 items-center justify-between">
				{/* Filter by Status */}
				<div className="flex items-center gap-2">
					<span className="font-medium text-gray-700">Filter by:</span>
					<Select
						value={statusFilter}
						onValueChange={(v) => {
							setStatusFilter(v);
							setPage(1);
						}}
					>
						<SelectTrigger className="w-[160px]">
							<SelectValue placeholder="Status" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All</SelectItem>
							<SelectItem value="pending">Pending</SelectItem>
							<SelectItem value="Approved">Approved</SelectItem>
							<SelectItem value="canceled">Canceled</SelectItem>
						</SelectContent>
					</Select>
				</div>

				{/* Limit per page */}
				<div className="flex items-center gap-2">
					<span className="font-medium text-gray-700">Show:</span>
					<Select
						value={String(limit)}
						onValueChange={(v) => {
							setLimit(Number(v));
							setPage(1);
						}}
					>
						<SelectTrigger className="w-[120px]">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="5">5</SelectItem>
							<SelectItem value="10">10</SelectItem>
							<SelectItem value="20">20</SelectItem>
							<SelectItem value="50">50</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			{!placedOrders.length ? (
				<p className="text-center text-gray-500 mt-8 font-medium">
					No orders found.
				</p>
			) : (
				<div>
					{" "}
					<div className="overflow-x-auto">
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
										<td className="py-3 px-4 max-w-xs truncate" title={order.address}>
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
													variant={"success"}
													size="sm"
													className="bg-green-600 hover:bg-green-700 text-white rounded-none flex gap-1 justify-center items-center"
													onClick={() => approveMutation.mutate(order._id)}
													disabled={approveMutation.isLoading}
												>
													{approveMutation.isLoading ? (
														<Loader2 className="h-4 w-4 animate-spin" />
													) : (
														<CheckCircle className=" h-4 w-4" />
													)}
													Approve
												</Button>
											)}
											{order.status !== "Approved" && (
												<Button
													size="sm"
													variant="destructive"
													className={"rounded-none"}
													onClick={() => deleteMutation.mutate(order._id)}
													disabled={deleteMutation.isLoading}
												>
													{deleteMutation.isLoading ? (
														<Loader2 className=" h-4 w-4 animate-spin" />
													) : (
														<Trash2 className=" h-4 w-4" />
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
					{/* 🔹 Pagination Controls */}
					<div className="flex justify-center items-center gap-3 mt-4">
						<Button
							variant="outline"
							disabled={page === 1}
							onClick={() => setPage((p) => Math.max(1, p - 1))}
						>
							Prev
						</Button>
						<span className="text-sm font-medium">
							Page {page} of {totalPages}
						</span>
						<Button
							variant="outline"
							disabled={page === totalPages}
							onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
						>
							Next
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
