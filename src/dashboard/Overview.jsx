import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Package, ShoppingCart, DollarSign, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const Overview = () => {
  // Mock data - replace with your API data
  const stats = [
    {
      title: "Total Orders",
      value: "1,234",
      change: "+12%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-primary",
    },
    {
      title: "Total Products",
      value: "567",
      change: "+5%",
      trend: "up",
      icon: Package,
      color: "text-secondary",
    },
    {
      title: "Revenue",
      value: "$45,231",
      change: "+23%",
      trend: "up",
      icon: DollarSign,
      color: "text-accent-foreground",
    },
    {
      title: "Customers",
      value: "890",
      change: "+8%",
      trend: "up",
      icon: Users,
      color: "text-muted-foreground",
    },
  ];

  const chartData = [
    { month: "Jan", orders: 186, revenue: 80 },
    { month: "Feb", orders: 305, revenue: 200 },
    { month: "Mar", orders: 237, revenue: 120 },
    { month: "Apr", orders: 73, revenue: 190 },
    { month: "May", orders: 209, revenue: 130 },
    { month: "Jun", orders: 214, revenue: 140 },
  ];

  const productCategories = [
    { name: "Electronics", value: 400, color: "hsl(var(--primary))" },
    { name: "Clothing", value: 300, color: "hsl(var(--secondary))" },
    { name: "Home & Garden", value: 300, color: "hsl(var(--accent))" },
    { name: "Sports", value: 200, color: "hsl(var(--muted))" },
  ];

  const chartConfig = {
    orders: {
      label: "Orders",
      color: "hsl(var(--primary))",
    },
    revenue: {
      label: "Revenue",
      color: "hsl(var(--secondary))",
    },
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2"
      >
        <BarChart3 className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3 text-secondary" />
                  <span className="text-secondary">{stat.change}</span>
                  <span>from last month</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Orders & Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Monthly Performance</CardTitle>
              <CardDescription>Orders and revenue trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="orders" fill="hsl(var(--primary))" />
                    <Bar dataKey="revenue" fill="hsl(var(--secondary))" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Product Categories Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Product Categories</CardTitle>
              <CardDescription>Distribution by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={productCategories}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {productCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Recent Activity</CardTitle>
            <CardDescription>Latest orders and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "New order", item: "Wireless Headphones", time: "2 minutes ago", status: "pending" },
                { action: "Product updated", item: "Gaming Keyboard", time: "15 minutes ago", status: "completed" },
                { action: "Stock alert", item: "USB Cables", time: "1 hour ago", status: "warning" },
                { action: "Order shipped", item: "Smartphone Cases", time: "2 hours ago", status: "completed" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'completed' ? 'bg-secondary' :
                      activity.status === 'warning' ? 'bg-destructive' : 'bg-primary'
                    }`} />
                    <div>
                      <p className="text-sm font-medium text-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.item}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Overview;