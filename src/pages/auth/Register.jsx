import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";
import { Watch } from "lucide-react";
import useStore from "../../store/store";
import { useNavigate } from "react-router-dom";

const registerSchema = z
  .object({
    email: z.string().email({ message: "Invaid email!" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password is not matach!",
    path: ["confirmPassword"],
  });

const Register = () => {
  const [passwordScore, setPasswordScore] = useState(0);
  const user = useStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user || user === true) {
      navigate("/");
    }
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const validatePassword = () => {
    let password = watch().password;
    return zxcvbn(password ? password : "").score;
  };

  useEffect(() => {
    setPasswordScore(validatePassword());
  }, [watch().password]);

  const onSubmit = async (data) => {
    // const passwordScore = zxcvbn(data.password).score;
    // if (passwordScore < 3) {
    //   toast.warning("Please use a stronger password!");
    //   return;
    // }

    //send to backend
    try {
      const res = await axios.post("https://beakkrasop-ecom-backend.vercel.app/api/register", data);

      console.log(res);
      toast.success("Register successfully");
      navigate("/login");
    } catch (error) {
      const errMsg = error.response?.data?.message;
      toast.error(errMsg);
      console.log(error);
    }
  };

  console.log(passwordScore);

  return (
    <div className="bg-gray-100 border border-gray-300 p-6 rounded-lg max-w-md mx-auto mt-10 shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Create Your Account
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Email Address
          </label>
          <input
            {...register("email")}
            type="email"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-gray-700 font-semibold mb-2"
          >
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}

          {/* Password Strength Bar */}
          {watch().password?.length > 0 && (
            <div className="flex mt-2">
              {Array.from(Array(4).keys()).map((_, index) => (
                <div
                  key={index}
                  className={`h-2 flex-1 mx-1 rounded ${
                    index < passwordScore
                      ? passwordScore <= 2
                        ? "bg-red-500"
                        : passwordScore < 4
                        ? "bg-yellow-500"
                        : "bg-green-500"
                      : "bg-gray-300"
                  }`}
                ></div>
              ))}
            </div>
          )}
          <p className="text-gray-500 text-sm mt-2">
            Use at least 8 characters
          </p>
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 font-semibold mb-2"
          >
            Confirm Password
          </label>
          <input
            {...register("confirmPassword")}
            type="password"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
