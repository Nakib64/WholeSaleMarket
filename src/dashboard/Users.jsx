import { useState } from "react";
import { motion } from "framer-motion";
import { Package, Search, Plus, Eye, Edit } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import axios from "axios";

import { useQuery } from "@tanstack/react-query";

const Users = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [Users, setUsers] = useState([]);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [totalPages, setTotalPages] = useState(1);
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Inside your component, instead of returning <Loading /> for the full page:
	const rowSkeletons = Array(limit).fill(0);

	const { isLoading } = useQuery({
		queryKey: [searchTerm, page, limit, totalPages],
		queryFn: async () => {
			try {
				const res = await axios.get(
					"https://b2-b-server-drab.vercel.app/manageUsers",
					{
						params: {
							page,
							limit,
							search: searchTerm,
						},
					}
				);
				setUsers(res.data.users);
				setTotalPages(res.data.totalPages);
                return res.data
			} catch (err) {
				console.error(err);
			}
		},
		refetchOnWindowFocus: false,
	});

	return (
		<div className="space-y-6 overflow-auto">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="flex items-center justify-between"
			>
				<div className="flex items-center gap-2">
					<Package className="h-6 w-6 text-primary" />
					<h1 className="text-2xl font-bold text-foreground">Users</h1>
				</div>
			</motion.div>

			{/* Search & Limit */}
			<motion.div className="flex gap-4 flex-wrap md:flex-nowrap">
				<div className="relative flex-1">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
					<Input
						placeholder="Search Users..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="pl-10"
					/>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline">{limit} per page</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						{[5, 10, 20, 50].map((n) => (
							<DropdownMenuItem
								key={n}
								onClick={() => setLimit(n)}
								className={limit === n ? "font-bold text-[#217b7e]" : ""}
							>
								{n} per page
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</motion.div>

			{/* Users Table */}
			<motion.div>
				<Card>
					<CardHeader>
						<CardTitle className="text-foreground">All Users</CardTitle>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>User</TableHead>
									<TableHead>Email</TableHead>
									<TableHead>Orders</TableHead>
									<TableHead className="text-right">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{isLoading
									? rowSkeletons.map((_, i) => (
											<TableRow key={i}>
												<TableCell>
													<div className="flex items-center gap-3">
														<Skeleton className="w-10 h-10 rounded-lg" />
														<div className="flex-1 space-y-1">
															<Skeleton className="w-32 h-4" />
															<Skeleton className="w-48 h-3" />
														</div>
													</div>
												</TableCell>
												<TableCell>
													<Skeleton className="w-16 h-4" />
												</TableCell>
												<TableCell>
													<Skeleton className="w-12 h-4" />
												</TableCell>
												<TableCell>
													<Skeleton className="w-8 h-4" />
												</TableCell>
												<TableCell>
													<Skeleton className="w-16 h-4" />
												</TableCell>
												<TableCell className="text-right">
													<div className="flex justify-end gap-2">
														<Skeleton className="w-8 h-8 rounded-full" />
														<Skeleton className="w-8 h-8 rounded-full" />
													</div>
												</TableCell>
											</TableRow>
									  ))
									: Users.map((user) => (
											<TableRow key={user._id} className="hover:bg-muted/50">
												<TableCell>
													<div className="flex items-center gap-3">
														<div className="w-10 h-8 overflow-hidden rounded-lg bg-gray-200 flex items-center justify-center text-sm text-gray-500">
															<img src={user.photoUrl} alt="IMG" />
														</div>
														<div>
															<p className=" text-foreground text-sm md:text-lg">
																{user.userName}
															</p>
														</div>
													</div>
												</TableCell>

												<TableCell className="font-medium">{user.userEmail}</TableCell>
												<TableCell className="font-medium ">{user.orders}</TableCell>
												<TableCell className="text-right">
													<div className="flex items-center justify-end gap-2">
														<TooltipProvider>
															<Tooltip>
																<TooltipTrigger asChild>
																	<Button
																		variant="ghost"
																		size="sm"
																		onClick={()=>setIsModalOpen(true)}
																	>
																		<Eye className="h-4 w-4" />
																	</Button>
																</TooltipTrigger>
																<TooltipContent>View</TooltipContent>
															</Tooltip>
														</TooltipProvider>
													</div>
												</TableCell>

												<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
													<DialogContent className="!max-w-6xl w-[80vw] max-h-[50vh] lg:max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl px-10 border border-gray-200">
														<DialogHeader className="border-b pb-4 mb-8 text-center">
															<DialogTitle className="text-4xl font-bold text-gray-900">
																User Details
															</DialogTitle>
															<DialogDescription className="text-gray-500 text-lg"></DialogDescription>
														</DialogHeader>

														<div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
															{/* Left column - Profile image */}
															<div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl border border-gray-200">
																<img
																	src={user.photoUrl || "/placeholder.jpg"}
																	alt="User"
																	className="w-full max-w-md h-[380px] object-cover rounded-2xl border-4 border-primary/30 shadow-lg transition-transform duration-300 hover:scale-[1.02]"
																/>
																<div className="mt-6 text-center">
																	<h2 className="text-3xl font-semibold text-gray-800">
																		{user.userName || "Unnamed User"}
																	</h2>
																</div>
															</div>

															{/* Right column - Info section */}
															<div className="flex flex-col justify-between">
																{/* Info fields */}
																<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
																	{[
																		["Full Name", "userName"],
																		["Email", "userEmail"],
																		["Phone", "phone"],
																		["Street", "street"],
																		["Sub-District", "subDistrict"],
																		["District", "district"],
																	].map(([label, field]) => (
																		<div key={field}>
																			<p className="font-semibold text-gray-700 mb-1">{label}:</p>

																			<p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
																				{user[field] || (
																					<span className="text-gray-400 italic">Not provided</span>
																				)}
																			</p>
																		</div>
																	))}
																</div>
															</div>
														</div>
													</DialogContent>
												</Dialog>
											</TableRow>
									  ))}
							</TableBody>
						</Table>

						{/* Modal */}

						{/* Pagination */}
						<div className="flex justify-center gap-2 mt-4">
							<Button
								onClick={() => setPage((p) => Math.max(1, p - 1))}
								disabled={page === 1}
							>
								Prev
							</Button>
							<span className="px-2 py-1">
								{page} / {totalPages}
							</span>
							<Button
								onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
								disabled={page === totalPages}
							>
								Next
							</Button>
						</div>
					</CardContent>
				</Card>
			</motion.div>
		</div>
	);
};

export default Users;
