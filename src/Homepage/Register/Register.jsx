import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router";
import { AuthContext } from "../../AuthContext/AuthContext";
import { updateProfile } from "firebase/auth";
import { motion } from "framer-motion";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_KEY;

export default function Register() {
	const { googleLogin, signIn } = useContext(AuthContext);
	const navigate = useNavigate();
	const [alert, setAlert] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [uploading, setUploading] = useState(false);
	const [isRegistering, setIsRegistering] = useState(false);

	const handleImageUpload = async (e) => {
		const file = e.target.files[0];
		if (!file) return;
		setUploading(true);
		setAlert("");

		const formData = new FormData();
		formData.append("image", file);

		try {
			const res = await axios.post(
				`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
				formData
			);
			setImageUrl(res.data.data.url);
			toast("Image uploaded successfully!");
		} catch {
			setAlert("Image upload failed. Please try again.");
		} finally {
			setUploading(false);
		}
	};

	const handleRegister = (e) => {
		e.preventDefault();
		
		const email = e.target.email.value;
		const password = e.target.password.value;
		const name = e.target.name.value;

		if (
			password.length < 6 ||
			!/[A-Z]/.test(password) ||
			!/[a-z]/.test(password)
		) {
			setAlert("Password must be 6+ chars, include upper and lowercase letters.");
			return;
		}
		if (!imageUrl) {
			setAlert("Please upload a profile image.");
			return;
		}
setIsRegistering(true);
		signIn(email, password)
			.then((res) => {
				updateProfile(res.user, { photoURL: imageUrl, displayName: name });
				axios
					.post("https://b2-b-server-drab.vercel.app/users", {
						userName: name,
						photoUrl: imageUrl,
						role: "user",
						userEmail: email,
						phone: "",
						street: "",
						subDistrict: "",
						district: "",
					})
					.then(() => {
						setIsRegistering(false);
						toast("Successfully created account");
						navigate("/auth/login");
					});
			})
			.catch(() => {
				toast(alert || "Try another email");
        setIsRegistering(false)
			});
	};

	const handleGoogle = () => {
		googleLogin()
			.then((res) => {
				console.log(res);
				axios.post("https://b2-b-server-drab.vercel.app/users", {
					userName: res?.user?.displayName,
					photoUrl: res?.user?.photoURL,
					role: "user",
					userEmail: res?.user?.email,
					phone: "",
					street: "",
					subDistrict: "",
					district: "",
				});
				toast("Successfully logged in");
				navigate("/auth/login");
			})
			.catch(() => toast(alert || "Google login failed"));
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 py-16">
			<Link
				to="/"
				className="absolute top-6 left-6 px-4 py-2 rounded-lg text-indigo-600 font-bold hover:bg-indigo-100 transition"
			>
				Home
			</Link>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="w-full max-w-4xl"
			>
				<Card className="shadow-2xl rounded-3xl p-10 sm:p-14 space-y-8">
					<CardHeader>
						<CardTitle className="text-3xl font-extrabold text-center mb-4">
							Register
						</CardTitle>
					</CardHeader>

					<CardContent className="space-y-6">
						<form onSubmit={handleRegister}>
							{/* --- Two Column Layout --- */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
								{/* Left: Profile Image */}
								<div className="flex flex-col items-center space-y-4">
									<Label htmlFor="photo">Profile Image</Label>
									<Input
										id="photo"
										type="file"
										accept="image/*"
										onChange={handleImageUpload}
										disabled={uploading}
									/>
									{uploading && (
										<p className="text-indigo-600 font-medium mt-1">Uploading image...</p>
									)}
									{imageUrl && !uploading && (
										<div className="w-32 h-32 rounded-full overflow-hidden shadow-md">
											<img
												src={imageUrl}
												alt="Preview"
												className="w-full h-full object-cover"
											/>
										</div>
									)}
								</div>

								{/* Right: Form Fields */}
								<div className="flex flex-col space-y-4">
									<div className="flex flex-col space-y-2">
										<Label htmlFor="name">Full Name</Label>
										<Input id="name" name="name" placeholder="Your Name" required />
									</div>

									<div className="flex flex-col space-y-2">
										<Label htmlFor="email">Email</Label>
										<Input
											id="email"
											name="email"
											type="email"
											placeholder="you@example.com"
											required
										/>
									</div>

									<div className="flex flex-col space-y-2">
										<Label htmlFor="password">Password</Label>
										<Input
											id="password"
											name="password"
											type="password"
											placeholder="Password"
											required
										/>
									</div>
								</div>
							</div>

							{/* --- Single Column Layout --- */}
							{alert && (
								<p className="text-red-600 font-medium text-center">{alert}</p>
							)}

							<Button
								type="submit"
								className="w-full mt-4 py-3 rounded-xl"
								disabled={isRegistering}
							>
								{isRegistering ? (
									<span className="loading loading-spinner loading-lg"></span>
								) : (
									"Register"
								)}
							</Button>
						</form>
						<div className="flex items-center gap-4 my-5">
							<div className="flex-1 h-px bg-gray-300" />
							<span className="text-gray-400 text-sm">or continue with</span>
							<div className="flex-1 h-px bg-gray-300" />
						</div>

						<Button
							variant="outline"
							onClick={handleGoogle}
							className="w-full flex justify-center gap-2 py-3 rounded-xl"
						>
							<span className="text-red-500 font-bold text-lg">G</span> Register with
							Google
						</Button>
					</CardContent>
				</Card>
			</motion.div>
		</div>
	);
}
