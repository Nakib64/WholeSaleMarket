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
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router";
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
import Loading from "@/Loading/Loading";

import {
	FaShoePrints,
	FaShoppingBag,
	FaGem,
	FaPumpSoap,
	FaTshirt,
	FaFemale,
	FaBaby,
	FaGlasses,
	FaSnowflake,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";

const categories = [
	{ name: "Shoes", slug: "shoes", icon: <FaShoePrints /> },
	{ name: "Bags", slug: "bags", icon: <FaShoppingBag /> },
	{ name: "Jewelry", slug: "jewelry", icon: <FaGem /> },
	{ name: "Beauty", slug: "beauty", icon: <FaPumpSoap /> },
	{ name: "Men’s Clothing", slug: "mens-clothing", icon: <FaTshirt /> },
	{ name: "Women’s Clothing", slug: "womens-clothing", icon: <FaFemale /> },
	{ name: "Baby Items", slug: "baby-items", icon: <FaBaby /> },
	{ name: "Eyewear", slug: "eyewear", icon: <FaGlasses /> },
	{ name: "Seasonal", slug: "seasonal", icon: <FaSnowflake /> },
];

const Products = () => {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState("");
	const [products, setProducts] = useState([]);
	const [categoryFilter, setCategoryFilter] = useState("All");
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [totalPages, setTotalPages] = useState(1);

	// Inside your component, instead of returning <Loading /> for the full page:
	const rowSkeletons = Array(limit).fill(0);

	const { isLoading } = useQuery({
		queryKey: [searchTerm, page, limit, totalPages, categoryFilter],
		queryFn: async () => {
			try {
				const res = await axios.get(
					"https://b2-b-server-drab.vercel.app/manageProducts",
					{
						params: {
							page,
							limit,
							search: searchTerm,
							category: categoryFilter,
						},
					}
				);
				setProducts(res.data.products);
				setTotalPages(res.data.totalPages);
			} catch (err) {
				console.error(err);
			}
		},
		refetchOnWindowFocus: false,
	});

	const getStatusBadge = (product) => {
		return product.mainQuantity >= 100 ? (
			<Badge variant="secondary">Active</Badge>
		) : (
			<Badge variant="destructive">Out of Stock</Badge>
		);
	};

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
					<h1 className="text-2xl font-bold text-foreground">Products</h1>
				</div>
				<Link to={"/dashboard/addProduct"}>
					<Button className="flex items-center gap-2" variant={"outline"}>
						<Plus className="h-4 w-4" />
						Add Product
					</Button>
				</Link>
			</motion.div>

			{/* Category Filter */}
			<motion.div className="flex flex-wrap gap-2">
				{categories.map((cat) => (
					<TooltipProvider key={cat.slug}>
						<Tooltip>
							<TooltipTrigger>
								<Button
									variant={categoryFilter === cat.slug ? "default" : "outline"}
									size="sm"
									className="flex items-center gap-1"
									onClick={() => setCategoryFilter(cat.slug)}
								>
									{cat.icon} {cat.name}
								</Button>
							</TooltipTrigger>
							<TooltipContent>{cat.name}</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				))}
				<Button
					variant={categoryFilter === "All" ? "default" : "outline"}
					size="sm"
					onClick={() => setCategoryFilter("All")}
				>
					All
				</Button>
			</motion.div>

			{/* Search & Limit */}
			<motion.div className="flex gap-4 flex-wrap md:flex-nowrap">
				<div className="relative flex-1">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
					<Input
						placeholder="Search products..."
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

			{/* Products Table */}
			<motion.div>
				<Card>
					<CardHeader>
						<CardTitle className="text-foreground">All Products</CardTitle>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Product</TableHead>
									<TableHead>Category</TableHead>
									<TableHead>Price</TableHead>
									<TableHead>Stock</TableHead>
									<TableHead>Status</TableHead>
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
									: products.map((product) => (
											<TableRow key={product._id} className="hover:bg-muted/50">
												<TableCell>
													<div className="flex items-center gap-3">
														<div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center text-sm text-gray-500">
															<img src={product.image} alt="IMG" />
														</div>
														<div>
															<p className="font-medium text-foreground text-sm md:text-lg">
																{product.name}
															</p>
															<p className="text-sm text-muted-foreground truncate max-w-[200px]">
																{product.description}
															</p>
														</div>
													</div>
												</TableCell>
												<TableCell>
													<Badge variant="outline">{product.category}</Badge>
												</TableCell>
												<TableCell className="font-medium">${product.price}</TableCell>
												<TableCell>{product.mainQuantity}</TableCell>
												<TableCell>{getStatusBadge(product)}</TableCell>
												<TableCell className="text-right">
													<div className="flex items-center justify-end gap-2">
														<Button
															variant="ghost"
															size="sm"
															onClick={() => navigate(`/dashboard/update/${product._id}`)}
														>
															<Edit className="h-4 w-4" />
														</Button>
													</div>
												</TableCell>
											</TableRow>
									  ))}
							</TableBody>
						</Table>

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

export default Products;
