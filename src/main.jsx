import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import Routes from "./Routes/Routes.jsx";
import AuthProvider from "./AuthContext/AuthProvider.jsx";


createRoot(document.getElementById("root")).render(
	<StrictMode>
		<AuthProvider>
			<RouterProvider router={Routes}></RouterProvider>
		</AuthProvider>
	</StrictMode>
);
