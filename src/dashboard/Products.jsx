import { useState } from "react";
import { motion } from "framer-motion";
import { Package, Search, Filter, Plus, Eye, Edit } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Products = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Mock products data - replace with your API data
  const products = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      category: "Electronics",
      price: 89.99,
      stock: 125,
      status: "active",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
      sku: "WBH-001",
      description: "Premium wireless headphones with noise cancellation"
    },
    {
      id: 2,
      name: "Gaming Mechanical Keyboard",
      category: "Electronics",
      price: 129.99,
      stock: 75,
      status: "active",
      image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=100&h=100&fit=crop",
      sku: "GMK-002",
      description: "RGB mechanical keyboard for gaming"
    },
    {
      id: 3,
      name: "Cotton T-Shirt Bundle",
      category: "Clothing",
      price: 45.99,
      stock: 200,
      status: "active",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop",
      sku: "CTB-003",
      description: "Pack of 3 premium cotton t-shirts"
    },
    {
      id: 4,
      name: "Smartphone Stand",
      category: "Accessories",
      price: 19.99,
      stock: 0,
      status: "out_of_stock",
      image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=100&h=100&fit=crop",
      sku: "SPS-004",
      description: "Adjustable smartphone stand for desk"
    },
    {
      id: 5,
      name: "Fitness Tracker Watch",
      category: "Electronics",
      price: 199.99,
      stock: 50,
      status: "low_stock",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=100&h=100&fit=crop",
      sku: "FTW-005",
      description: "Smart fitness tracker with heart rate monitor"
    },
    {
      id: 6,
      name: "LED Desk Lamp",
      category: "Home & Garden",
      price: 34.99,
      stock: 90,
      status: "active",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      sku: "LDL-006",
      description: "Adjustable LED desk lamp with USB charging"
    },
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge variant="secondary" className="bg-secondary/20 text-secondary">Active</Badge>;
      case "out_of_stock":
        return <Badge variant="destructive">Out of Stock</Badge>;
      case "low_stock":
        return <Badge variant="outline" className="border-orange-500 text-orange-600">Low Stock</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
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
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
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
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">All Products</CardTitle>
            <CardDescription>
              Manage your wholesale product catalog
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>SKU</TableHead>
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
                          <p className="font-medium text-foreground">{product.name}</p>
                          <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.category}</Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                    <TableCell className="font-medium">${product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{getStatusBadge(product.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/dashboard/products/${product.id}`)}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/dashboard/products/${product.id}/edit`)}
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