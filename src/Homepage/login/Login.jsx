import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../AuthContext/AuthContext";
import { Bounce, toast } from "react-toastify";
import { motion } from "framer-motion";

const Login = () => {
  const { login, user, setUser, googleLogin } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    login(email, password)
      .then((res) => {
        setUser(res.user);
        toast("Login Successful", {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
          transition: Bounce,
        });
        navigate(location.state ? `${location.state}` : "/");
      })
      .catch(() => {
        setError("Invalid email or password");
        toast(`Invalid email or password`, {
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
        setUser(res.user);
        toast("Login Successful", {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
          transition: Bounce,
        });
        navigate(location.state ? `${location.state}` : "/");
      })
      .catch((error) => {
        // Optional: handle google login errors here
        console.error(error);
      });
  };

  return (
    <div className=" flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="bg-white max-w-xl w-full rounded-3xl shadow-2xl p-10 sm:p-14"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-8 text-gray-900 select-none">
          Login now!
        </h1>

        <form className="space-y-6" onSubmit={handleLogin}>
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
              required
              placeholder="Email"
              className="input input-bordered w-full rounded-xl border-gray-300 p-3 text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
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
              required
              placeholder="Password"
              className="input input-bordered w-full rounded-xl border-gray-300 p-3 text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
            />
          </div>

          {error && (
            <p className="text-red-600 font-semibold text-center">{error}</p>
          )}

          <div className="flex flex-col gap-2 mt-2 text-sm text-gray-700">
            <Link
              to={"/reset"}
              className="text-indigo-600 hover:underline font-medium self-start"
            >
              Forgot password?
            </Link>
            <p className="mt-1">
              Don't have an account?{" "}
              <span className="text-indigo-600 font-bold">
                <Link to={"/register"}>Register</Link>
              </span>
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="btn bg-indigo-600 hover:bg-indigo-700 text-white font-semibold w-full rounded-xl py-3 mt-6 shadow-lg transition"
          >
            Login
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
          Login with Google
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Login;
