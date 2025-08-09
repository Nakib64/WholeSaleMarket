import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import Routes from "./Routes/Routes.jsx";
import AuthProvider from "./AuthContext/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={Routes}></RouterProvider>
			</QueryClientProvider>
		</AuthProvider>
	</StrictMode>
);
