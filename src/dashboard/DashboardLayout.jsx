import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { motion } from "framer-motion";
import {
	BarChart3,
	Package,
	Home,
	Menu,
	X,
	ShoppingCart,
	Users,
	Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";


const DashboardLayout = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const navItems = [
		{ name: "Overview", href: "/dashboard", icon: Home },
		{ name: "Products", href: "/dashboard/products", icon: Package },
		{ name: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
		{ name: "Customers", href: "/dashboard/customers", icon: Users },
		{ name: "Settings", href: "/dashboard/settings", icon: Settings },
	];
	return (
		<div className="min-h-screen flex w-full">
			{sidebarOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm "
					onClick={() => setSidebarOpen(false)}
				/>
			)}
			<aside
				className="fixed inset-y-0 left-0 z-50  bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 w-1/6"
			>
				<div className="flex items-center justify-between p-6 border-b border-border">
          <Link to={'/'}>
          					<h1 className="text-xl font-bold text-foreground">Wholesale Dashboard</h1>

          </Link>
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setSidebarOpen(false)}
						className="lg:hidden"
					>
						<X className="h-5 w-5" />
					</Button>
				</div>

				<nav className="p-4 space-y-2">
					{navItems.map((item) => (
						<NavLink
							key={item.name}
							to={item.href}
							end={item.href === "/dashboard"}
							className="flex items-center  gap-3 px-3 py-2  text-sm font-medium transition-colors"
						>
							<item.icon className="h-4 w-4" />
							{item.name}
						</NavLink>
					))}
				</nav>
			</aside>

			<div className="w-full">
			
				
				
					<div className="flex items-center gap-4 px-6 py-4">
						
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setSidebarOpen(true)}
							className="lg:hidden"
						>
							<Menu className="h-5 w-5" />
						</Button>
						<div className="flex-1">
							<h2 className="text-lg font-semibold text-foreground">Dashboard</h2>
						</div>
						<Button variant="outline" size="sm">
							<Settings className="h-4 w-4 mr-2" />
							Settings
						</Button>
					</div>
	
				<main className="p-6">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default DashboardLayout;
