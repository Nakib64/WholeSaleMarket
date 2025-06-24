import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../AuthContext/AuthContext";
import { Bounce, toast } from "react-toastify";


const Login = () => {
  const {login, user, setUser, googleLogin} = useContext(AuthContext)

  const navigate = useNavigate();
  const location = useLocation()
  const [error, setError] = useState();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    login(email, password)
      .then((res) => {
         ("logged in", res.user);
        setUser(res.user);
        toast("Login Successfull", {
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
        
         navigate(location.state? `${location.state}`:'/')
      })
      .catch((error) => {
        setError("Invalid email or password");

        toast(`Invalid email or password`, {
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
        toast("Login Successfull", {
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
        navigate(location.state? `${location.state}`:'/')
      })
      .catch((error) =>  (error));
  };
  return (
    <>
      <div className="my-20 px-4">
        <div className="bg-base-100 w-full max-w-xl mx-auto shadow-2xl flex flex-col p-6 sm:p-10 items-center rounded-lg">
          <h1 className="text-4xl sm:text-5xl font-bold p-3 text-center">
            Login now!
          </h1>
          <div className="w-full">
            <form className="w-full space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="Email"
                  name="email"
                />
              </div>
              <div>
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input input-bordered w-full"
                  placeholder="Password"
                  name="password"
                />
              </div>
              {error && <p className="text-red-700 font-semibold">{error}</p>}
              <div className="flex flex-col gap-2 mt-2 text-sm">
                <Link className="text-blue-600 hover:underline" to={"/reset"}>
                  Forgot password?
                </Link>
                <p>
                  Don't have an account?{" "}
                  <span className="text-blue-600 font-bold">
                    <Link to={"/register"}>Register</Link>
                  </span>
                </p>
              </div>

              <button className="btn btn-neutral w-full mt-2" type="submit">
                Login
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
    </>
  );
};

export default Login;
