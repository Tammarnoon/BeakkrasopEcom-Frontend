import { useState } from "react";
import { toast } from "react-toastify";
import useStore from "../../store/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const actionLogin = useStore((state) => state.actionLogin);
  const user = useStore((state) => state.user);
  console.log("user :", user);

  useEffect(() => {
    if (user || user === true) {
      navigate("/");
    }
  }, []);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await actionLogin(form);
      console.log("res", res);

      const role = res.data.payload.role;
      console.log("role", role);

      roleRedirect(role);
      toast.success("Welcome Back");
    } catch (error) {
      console.log(error);
      const errorMsg = error.response?.data?.message;
      toast.error(errorMsg);
    }
  };

  const roleRedirect = (role) => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="bg-gray-100 border border-gray-300 p-6 rounded-lg max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
        Login
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Email
          </label>
          <input
            onChange={handleOnChange}
            type="email"
            name="email"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-semibold mb-2"
          >
            Password
          </label>
          <input
            onChange={handleOnChange}
            type="password"
            name="password"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
