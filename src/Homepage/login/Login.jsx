import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../AuthContext/AuthContext";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

const Login = () => {
	const { login, setUser, googleLogin } = useContext(AuthContext);
	const navigate = useNavigate();
	const location = useLocation();
	const [error, setError] = useState("");

	const handleLogin = (e) => {
		e.preventDefault();
		const email = e.target.email.value;
		const password = e.target.password.value;

		login(email, password)
			.then((res) => {
				setUser(res.user);
				toast("Login Successful");
				navigate(location.state ? location.state : "/");
			})
			.catch(() => {
				setError("Invalid email or password");
				toast("Invalid email or password");
			});
	};

	const handleGoogle = () => {
		googleLogin()
			.then((res) => {
				setUser(res.user);
				axios
					.post("https://b2-b-server-drab.vercel.app/users", {
						userName: res?.user?.displayName,
						photoUrl: res?.user?.photoURL,
						role: "user",
						userEmail: res?.user?.email,
						phone: "",
						street: "",
						subDistrict: "",
						district: "",
					})
					.then(() => {
						toast("Login Successful");
						navigate(location.state ? location.state : "/");
					});
			})
			.catch((err) => console.error(err));
	};

	return (
		<div className="relative min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-50 via-white to-teal-50">
			{/* Home Button */}
			<Link
				to="/"
				className="absolute top-6 left-6 text-indigo-600 font-bold py-2 px-4 rounded-lg hover:bg-indigo-100 transition"
			>
				Home
			</Link>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.7, ease: "easeOut" }}
				className="w-full max-w-md px-6 sm:px-0"
			>
				<Card className="rounded-3xl shadow-2xl">
					<CardHeader className="text-center">
						<CardTitle className="text-3xl font-extrabold">Welcome Back!</CardTitle>
						<p className="text-gray-500 mt-1">Login to your account</p>
					</CardHeader>

					<CardContent className="space-y-6">
						<form onSubmit={handleLogin} className="space-y-4">
							<div className="flex flex-col">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									name="email"
									type="email"
									placeholder="you@example.com"
									required
								/>
							</div>
							<div className="flex flex-col">
								<Label htmlFor="password">Password</Label>
								<Input
									id="password"
									name="password"
									type="password"
									placeholder="Enter password"
									required
								/>
							</div>
							{error && <p className="text-red-600 text-center">{error}</p>}

							<div className="flex justify-between text-sm text-gray-600">
								<Link to="/reset" className="text-indigo-600 hover:underline">
									Forgot password?
								</Link>
								<p>
									No account?{" "}
									<Link to="/auth/register" className="text-indigo-600 font-semibold">
										Register
									</Link>
								</p>
							</div>

							<Button
								type="submit"
								className="w-full mt-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white"
							>
								Login
							</Button>
						</form>

						<div className="flex items-center gap-4 my-4">
							<div className="flex-1 h-px bg-gray-300" />
							<p className="text-gray-400 text-sm">or continue with</p>
							<div className="flex-1 h-px bg-gray-300" />
						</div>

						<Button
							variant="outline"
							onClick={handleGoogle}
							className="w-full flex justify-center items-center gap-2 py-3"
						>
							<span className="text-red-500 font-bold text-lg">G</span>
							Continue with Google
						</Button>
					</CardContent>
				</Card>
			</motion.div>
		</div>
	);
};

export default Login;
