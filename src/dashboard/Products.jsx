import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, Search, Filter, Plus, Eye, Edit } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
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
import axios from "axios";
import Loading from "@/Loading/Loading";

const Products = () => {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState("");
	const [products, setProducts] = useState();
	const [loading, setloading] = useState(true);

	useEffect(() => {
		axios.get("https://b2-b-server-drab.vercel.app/products").then((res) => {
			setProducts(res.data);
			setloading(false);
		});
	}, []);
	if (loading) {
		return <Loading></Loading>;
	}
	console.log(products);

	const filteredProducts = products.filter(
		(product) =>
			product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
			product.sku.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const getStatusBadge = (product) => {
		switch (product.mainQuantity >= 100) {
			case true:
				return (
					<Badge variant="secondary" className="">
						Active
					</Badge>
				);
			case false:
				return <Badge variant="destructive">Out of Stock</Badge>;
		}
	};

	return (
		<div className="space-y-6 overflow-auto">
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
					{" "}
					<Button className="flex items-center gap-2">
						<Plus className="h-4 w-4" />
						Add Product
					</Button>
				</Link>
			</motion.div>

			{/* Search and Filter */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.1 }}
				className="flex gap-4"
			>
				<div className="relative flex-1">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
					<Input
						placeholder="Search products..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="pl-10"
					/>
				</div>
				<Button variant="outline" className="flex items-center gap-2">
					<Filter className="h-4 w-4" />
					Filter
				</Button>
			</motion.div>

			{/* Products Table */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
        className="max-h-[70vh] overflow-auto"
			>
				<Card>
					<CardHeader>
						<CardTitle className="text-foreground">All Products</CardTitle>
						<CardDescription>Manage your wholesale product catalog</CardDescription>
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
								{filteredProducts.map((product, index) => (
									<motion.tr
										key={product.id}
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.3, delay: index * 0.05 }}
										className="hover:bg-muted/50"
									>
										<TableCell>
											<div className="flex items-center gap-3">
												<img
													src={product.image}
													alt={product.name}
													className="w-10 h-10 rounded-lg object-cover"
												/>
												<div>
													<p className="font-medium text-foreground text-sm md:text-lg">{product.name}</p>
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
													onClick={() => navigate(`/dashboard/details/${product._id}`)}
													className="h-8 w-8 p-0"
												>
													<Eye className="h-4 w-4" />
												</Button>
												<Button
													variant="ghost"
													size="sm"
													onClick={() => navigate(`/dashboard/update/${product._id}`)}
													className="h-8 w-8 p-0"
												>
													<Edit className="h-4 w-4" />
												</Button>
											</div>
										</TableCell>
									</motion.tr>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</motion.div>
		</div>
	);
};

export default Products;
