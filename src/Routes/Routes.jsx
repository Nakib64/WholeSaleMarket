import React from "react";
import { createBrowserRouter } from "react-router";
import Homepage from "../Homepage/Homepage";
import Register from "../Homepage/Register/Register";
import NotFound from "../Error/Error";
import Home from "../Homepage/Home/Home";
import CategorySec from "../Homepage/Category/CategorySec";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AllProduct from "../Homepage/nav/Product/AllProduct";
import AddProduct from "../Homepage/nav/Product/AddProduct";
import MyProduct from "../Homepage/nav/Product/MyProduct";

import CategoryItems from "../Homepage/details/Details";
import Update from "../Homepage/Update&Details/Update";
import ProductDetails from "../Homepage/Update&Details/ProductDetails";
import Cart from "../Homepage/Cart/Cart";
import About from "../Homepage/About/About";
import Contact from "../Homepage/Contact/Contact";
import SearchedProducts from "@/Homepage/searchProduct/SearchedProducts";
import PricingPlans from "@/Homepage/Home/Pricing";
import DashboardLayout from "@/dashboard/DashboardLayout";
import Products from "@/dashboard/Products";
import Overview from "@/dashboard/Overview";
import OrdersTable from "@/dashboard/Orders";
import AuthLayout from "@/AuthenticationLayout/AuthLayout";
import Login from "@/Homepage/login/Login";
import Users from "@/dashboard/Users";

const Routes = createBrowserRouter([
	{
		path: "/",
		Component: Homepage,
		children: [
			{
				index: true,
				Component: Home,
			},
			{
				path: "/category",
				Component: CategorySec,
			},
			{
				path: "/allProduct",
				element: <AllProduct></AllProduct>,
			},
			{
				path: "/pricing",
				Component: PricingPlans,
			},
			{
				path: "/searchedProducts/:searchedKey",
				Component: SearchedProducts,
			},

			{
				path: "/myProduct",
				element: (
					<PrivateRoute>
						<MyProduct></MyProduct>
					</PrivateRoute>
				),
			},
			{
				path: "/category/:cat",
				element: <CategoryItems></CategoryItems>,
			},

			{
				path: "/details/:id",
				element: <ProductDetails></ProductDetails>,
			},
			{
				path: "/cart",
				element: (
					<PrivateRoute>
						<Cart></Cart>
					</PrivateRoute>
				),
			},
			{
				path: "/about",
				element: <About></About>,
			},
			{
				path: "/contact",
				Component: Contact,
			},
		],
	},
	{
		path: "/auth",
		element: <AuthLayout></AuthLayout>,
		children: [
			{
				path: "/auth/register",
				element: <Register></Register>,
			},
			{
				index: true,
				element: <Login></Login>,
			},
			{
				path: "/auth/login",
				element: <Login></Login>,
			},
		],
	},
	{
		path: "/dashboard",
		element: (
			<PrivateRoute>
				<DashboardLayout></DashboardLayout>
			</PrivateRoute>
		),
		children: [
			{
				index: true,
				Component: Overview,
			},
			{
				path: "/dashboard/addProduct",
				element: <AddProduct></AddProduct>,
			},
			{
				path: "/dashboard/orders",
				Component: OrdersTable,
			},
			{
				path: "/dashboard/products",
				Component: Products,
			},
			{
				path: "/dashboard/users",
				Component: Users,
			},
			{
				path: "/dashboard/products/:id",
				Component: ProductDetails,
			},
			{
				path: "/dashboard/details/:id",
				element: <ProductDetails></ProductDetails>,
			},
			{
				path: "/dashboard/update/:id",
				element: <Update></Update>,
			},
		],
	},
	{
		path: "*",
		Component: NotFound,
	},
]);

export default Routes;
