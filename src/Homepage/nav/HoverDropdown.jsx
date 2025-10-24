import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthContext";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Loading from "@/Loading/Loading";

const HoverDropdown = () => {
	const { user, logout } = useContext(AuthContext);
	const [userDetails, setUserDetails] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState({});
	const [loading, setLoading] = useState(true);
	const [updating, setupdating] = useState(false);

	// Fetch user details
	useEffect(() => {
		if (user?.email) {
			axios
				.get(`https://b2-b-server-drab.vercel.app/users?email=${user?.email}`)
				.then((res) => {
					console.log(res);
					setUserDetails(res.data);
					setFormData(res.data);
					setLoading(false);
				})
				.catch(() => setLoading(false));
		}
	}, [user]);

	const handleProfileClick = () => {
		if (userDetails?.role === "admin") {
			console.log(userDetails);
			window.location.href = "/dashboard";
		} else {
			console.log(userDetails);
			setIsModalOpen(true);
		}
	};

	const handleEditToggle = () => setIsEditing(!isEditing);

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleUpdate = async () => {
		try {
			setupdating(true)
			await axios.put(
				`https://b2-b-server-drab.vercel.app/users?email=${user.email}`,
				formData
			);
			toast("Updated Successfully!")
			setUserDetails(formData);
			setIsEditing(false);
		} catch (err) {
			toast(err.message)
		}
		finally{
			setupdating(false)
		}
	};

	const handleLogout = async () => {
		await logout();
	};

	return (
		<>
			<div onClick={handleProfileClick} className="z-40 cursor-pointer">
				<div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
					<div className="w-10 lg:w-12 rounded-full">
						<img src={user?.photoURL} alt="User" />
					</div>
				</div>
			</div>

			{/* Modal */}
			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<DialogContent className="!max-w-6xl w-[80vw] max-h-[50vh] lg:max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl px-10 border border-gray-200">
					<DialogHeader className="border-b pb-4 mb-8 text-center">
						<DialogTitle className="text-4xl font-bold text-gray-900">
							{isEditing ? "Edit Profile" : "User Profile"}
						</DialogTitle>
						<DialogDescription className="text-gray-500 text-lg">
							Manage your personal information and account settings
						</DialogDescription>
					</DialogHeader>

					{loading ? (
						<Loading></Loading>
					) : (
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
							{/* Left column - Profile image */}
							<div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl border border-gray-200">
								<img
									src={formData.photoUrl || "/placeholder.jpg"}
									alt="User"
									className="w-full max-w-md h-[380px] object-cover rounded-2xl border-4 border-primary/30 shadow-lg transition-transform duration-300 hover:scale-[1.02]"
								/>
								<div className="mt-6 text-center">
									<h2 className="text-3xl font-semibold text-gray-800">
										{formData.userName || "Unnamed User"}
									</h2>
									
								</div>
							</div>

							{/* Right column - Info section */}
							<div className="flex flex-col justify-between">
								{/* Buttons */}
								<div className="flex justify-between items-center mb-6">
									<button
										onClick={handleEditToggle}
										className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 text-sm font-medium transition"
									>
										{isEditing ? "Cancel" : "Edit"}
									</button>
									<button
										onClick={handleLogout}
										className="px-6 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
									>
										Logout
									</button>
								</div>

								{/* Info fields */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									{[
										["Full Name", "userName"],
										["Email", "userEmail"],
										["Phone", "phone"],
										["Street", "street"],
										["Sub-District", "subDistrict"],
										["District", "district"],
									].map(([label, field]) => (
										<div key={field}>
											<p className="font-semibold text-gray-700 mb-1">{label}:</p>
											{isEditing && field !== "userEmail" ? (
												<Input
													type="text"
													name={field}
													value={formData?.field || ""}
													onChange={handleInputChange}
													className="input input-bordered shadow-xl w-full rounded-lg focus:outline-none focus:ring-0 focus:border-none focus:ring-primary/40"
												/>
											) : (
												<p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
													{userDetails[field] || (
														<span className="text-gray-400 italic">Not provided</span>
													)}
												</p>
											)}
										</div>
									))}
								</div>

								{/* Save button */}
								{isEditing && (
									<div className="flex justify-end mt-8">
										<button
											onClick={handleUpdate}
											className="px-8 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/80 transition"
											disabled={updating}
										>
										{updating && <span className="loading loading-spinner loading-lg"></span>}	Save Changes
										</button>
									</div>
								)}
							</div>
						</div>
					)}
				</DialogContent>
			</Dialog>
		</>
	);
};

export default HoverDropdown;
