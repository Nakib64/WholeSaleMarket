import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../AuthContext/AuthContext";
import { Bounce, toast } from "react-toastify";

const Register = () => {
	const { googleLogin, setUser, signIn } = useContext(AuthContext);
	const navigate = useNavigate();
	const [alert, setAlert] = useState();

	const handleRegister = (e) => {
		e.preventDefault();
		const email = e.target.email.value;
		const passowrd = e.target.password.value;
		const name = e.target.name.value;
		const PhotoUrl = e.target.PhotoUrl.value;

		if (passowrd.length < 6) {
			setAlert("Password must be at least 6 characters long.");
			return;
		}
		if (!/[A-Z]/.test(passowrd)) {
			setAlert("Password must contain at least one uppercase letter.");
			return;
		}
		if (!/[a-z]/.test(passowrd)) {
			setAlert("Password must contain at least one lowercase letter.");
			return;
		}
		signIn(email, passowrd)
			.then((res) => {
				setUser(res.user);
				navigate("/");
                toast("Successfully created Account", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
			})
			.catch((error) => {
                toast(alert, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
            });
	};

	const handleGoogle = () => {
		googleLogin()
			.then((res) => {
				setUser(res.user);
				navigate("/");
                     toast("Successfully created Account", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
			})
			.catch((error) => {
                toast(alert, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
            });
	};

	return (
		<div className=" my-10  max-w-full mx-auto px-4">
			<div className="bg-base-100 w-full max-w-xl mx-auto shadow-2xl flex flex-col p-6 sm:p-10 items-center rounded-lg">
				<h1 className="text-4xl sm:text-5xl font-bold p-3 text-center">
					Register now!
				</h1>
				<div className="w-full">
					<form className="w-full space-y-4" onSubmit={handleRegister}>
						<label className="label">Name</label>
						<input
							type="text"
							className="input input-bordered w-full"
							placeholder="Name"
							name="name"
						/>

						<label className="label">Photo Url</label>
						<input
							type="text"
							className="input input-bordered w-full"
							placeholder="Photo Url"
							name="PhotoUrl"
						/>

						<label className="label">Email</label>
						<input
							type="email"
							className="input input-bordered w-full"
							placeholder="Email"
							name="email"
							required
						/>

						<label className="label">Password</label>
						<input
							type="password"
							className="input input-bordered w-full"
							placeholder="Password"
							name="password"
							required
						/>
						{alert && <p className="text-red-700 font-semibold">{alert}</p>}
						<div className="text-sm mt-2">
							Already have an account?
							<span className="text-blue-600 font-bold">
								<Link to={"/login"}>Login Now</Link>
							</span>
						</div>

						<button className="btn btn-neutral w-full mt-4" type="submit">
							Register
						</button>
					</form>
					<button
						className="btn bg-white text-black border-[#e5e5e5] w-full "
						onClick={handleGoogle}
					>
						<svg
							aria-label="Google logo"
							width="16"
							height="16"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 512 512"
						>
							<g>
								<path d="m0 0H512V512H0" fill="#fff"></path>
								<path
									fill="#34a853"
									d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
								></path>
								<path
									fill="#4285f4"
									d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
								></path>
								<path
									fill="#fbbc02"
									d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
								></path>
								<path
									fill="#ea4335"
									d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
								></path>
							</g>
						</svg>
						Login with Google
					</button>
				</div>
			</div>
		</div>
	);
};

export default Register;
