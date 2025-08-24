import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit, Package, DollarSign, Warehouse, Tag } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock product data - replace with your API call
  const product = {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    price: 89.99,
    cost: 45.00,
    stock: 125,
    status: "active",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    sku: "WBH-001",
    description: "Premium wireless headphones with advanced noise cancellation technology. Perfect for music lovers and professionals who demand high-quality audio.",
    specifications: {
      brand: "TechSound",
      color: "Black",
      weight: "250g",
      battery: "30 hours",
      connectivity: "Bluetooth 5.0",
      warranty: "2 years"
    },
    supplier: "Audio Tech Supplies",
    created: "2024-01-15",
    updated: "2024-08-20"
  };

  const getStatusBadge = (status: string) => {
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
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard/products")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center gap-2">
            <Package className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Product Details</h1>
          </div>
        </div>
        <Button
          onClick={() => navigate(`/dashboard/products/${id}/edit`)}
          className="flex items-center gap-2"
        >
          <Edit className="h-4 w-4" />
          Edit Product
        </Button>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Product Image and Basic Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-1"
        >
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-foreground">{product.name}</h2>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{product.category}</Badge>
                    {getStatusBadge(product.status)}
                  </div>
                  <p className="text-muted-foreground">{product.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Product Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Pricing and Inventory */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Pricing & Inventory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Selling Price</label>
                  <p className="text-2xl font-bold text-foreground">${product.price}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Cost Price</label>
                  <p className="text-2xl font-bold text-muted-foreground">${product.cost}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Stock Quantity</label>
                  <div className="flex items-center gap-2">
                    <Warehouse className="h-4 w-4 text-primary" />
                    <p className="text-xl font-semibold text-foreground">{product.stock} units</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Profit Margin</label>
                  <p className="text-xl font-semibold text-secondary">
                    {(((product.price - product.cost) / product.price) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-primary" />
                Product Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">SKU</label>
                  <p className="font-mono text-foreground">{product.sku}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Supplier</label>
                  <p className="text-foreground">{product.supplier}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Created</label>
                  <p className="text-foreground">{new Date(product.created).toLocaleDateString()}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                  <p className="text-foreground">{new Date(product.updated).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Specifications */}
          <Card>
            <CardHeader>
              <CardTitle>Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <label className="text-sm font-medium text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </label>
                    <p className="text-foreground">{value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;