import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../AuthContext/AuthContext";
import { Bounce, toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import { motion } from "framer-motion";
import axios from "axios";

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_KEY; // <-- replace with your ImgBB API key

const Register = () => {
  const { googleLogin, setUser, signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [alert, setAlert] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  // Upload image to ImgBB and set URL
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setAlert(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        formData
      );
      setImageUrl(res.data.data.url);
      toast("Image uploaded successfully!", {
        position: "top-right",
        autoClose: 1500,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
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

    if (password.length < 6) {
      setAlert("Password must be at least 6 characters long.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setAlert("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setAlert("Password must contain at least one lowercase letter.");
      return;
    }
    if (!imageUrl) {
      setAlert("Please upload a profile image.");
      return;
    }

    signIn(email, password)
      .then((res) => {
        updateProfile(res.user, {
          photoURL: imageUrl,
          displayName: name,
        });
        toast("Successfully created Account", {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
          transition: Bounce,
        });
        navigate("/login");
      })
      .catch(() => {
        toast(alert || "Registration failed", {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
          transition: Bounce,
        });
      });
  };

  const handleGoogle = () => {
    googleLogin()
      .then((res) => {
        toast("Successfully logged in", {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
          transition: Bounce,
        });
        navigate("/login");
      })
      .catch(() => {
        toast(alert || "Google login failed", {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
          transition: Bounce,
        });
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="bg-white max-w-xl w-full rounded-3xl shadow-2xl p-10 sm:p-14"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-8 text-gray-900 select-none">
          Register now!
        </h1>

        <form className="space-y-6" onSubmit={handleRegister}>
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your full name"
              className="input input-bordered w-full rounded-xl border-gray-300 p-3 text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
              required
            />
          </div>

          <div>
            <label
              htmlFor="photo"
              className="block text-gray-700 font-semibold mb-2"
            >
              Profile Image
            </label>
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full rounded-xl border border-gray-300 p-2 cursor-pointer focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
              disabled={uploading}
            />
            {uploading && (
              <p className="text-indigo-600 mt-1 font-semibold">
                Uploading image...
              </p>
            )}
            {imageUrl && !uploading && (
              <img
                src={imageUrl}
                alt="Uploaded profile preview"
                className="mt-3 w-24 h-24 rounded-full object-cover shadow-md mx-auto"
              />
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full rounded-xl border-gray-300 p-3 text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full rounded-xl border-gray-300 p-3 text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
              required
            />
          </div>

          {alert && (
            <p className="text-red-600 font-semibold text-center">{alert}</p>
          )}

          <div className="text-sm mt-2 text-gray-700">
            Already have an account?{" "}
            <span className="text-indigo-600 font-bold hover:underline cursor-pointer">
              <Link to={"/login"}>Login Now</Link>
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="btn bg-indigo-600 hover:bg-indigo-700 text-white font-semibold w-full rounded-xl py-3 mt-6 shadow-lg transition"
            disabled={uploading}
          >
            {uploading ? "Uploading Image..." : "Register"}
          </motion.button>
        </form>

        <motion.button
          onClick={handleGoogle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex justify-center items-center gap-3 w-full border border-gray-300 rounded-xl py-3 mt-6 hover:shadow-md bg-white text-gray-900 font-semibold transition"
        >
          <svg
            aria-label="Google logo"
            width="20"
            height="20"
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
          Register with Google
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Register;
