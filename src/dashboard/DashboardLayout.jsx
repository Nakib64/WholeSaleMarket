"use client";

import { Link, NavLink, Outlet } from "react-router";
import {
  Package,
  Home,
  Menu,
  X,
  ShoppingCart,
  Users,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useContext } from "react";
import { AuthContext } from "@/AuthContext/AuthContext";

const DashboardLayout = () => {
	const {logout}= useContext(AuthContext)
  const navItems = [
    { name: "Overview", href: "/dashboard", icon: Home },
    { name: "Products", href: "/dashboard/products", icon: Package },
    { name: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const Sidebar = ({ onClose }) => (
    <div className="flex flex-col bg-card border-b border-border w-full">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <Link to="/">
          <h1 className="text-xl font-bold text-foreground">
            Wholesale Dashboard
          </h1>
        </Link>
        {onClose && (
          <SheetClose asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              {/* <X className="h-5 w-5" /> */}
            </Button>
          </SheetClose>
        )}
      </div>

      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.href === "/dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`
            }
          >
            <item.icon className="h-4 w-4" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );

 

  return (
    <div className="min-h-screen flex w-full">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-1/6">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="flex items-center gap-4 px-6 py-4 border-b border-border">
          {/* Sheet Trigger for Mobile */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="top" className="p-0">
              <SheetHeader className="sr-only">
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <Sidebar onClose />
            </SheetContent>
          </Sheet>

          <div className="flex-1">
            <h2 className="text-lg font-semibold text-foreground">Dashboard</h2>
          </div>

          <Button variant="outline" size="sm"   onClick={() => {
			logout()
}}>
            Logout
          </Button>
        </div>

        <main className="p-6 max-w-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
