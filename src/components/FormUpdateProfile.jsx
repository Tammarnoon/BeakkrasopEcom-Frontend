import { useEffect, useState } from "react";
import useStore from "../store/store";
import { currentUser } from "../api/auth";
import UserImg from "./UserImg";
import { toast } from "react-toastify";
import { UpdateProfile } from "../api/user";

//ค่าเรื่มต่น
const initialSate = {
  user: {
    email: "",
    name: "",
  },
};
const FormUpdateProfile = () => {
  const [ok, setOk] = useState(initialSate);
  const user = useStore((state) => state.user);
  const token = useStore((state) => state.token);

  useEffect(() => {
    const checkUser = async () => {
      if (user && token) {
        try {
          const res = await currentUser(token); // เรียกใช้งาน API
          setOk(res.data);
        } catch (error) {
          console.error("Error checking user:", error);
          setOk(false);
        }
      }
    };

    checkUser();
  }, [user, token]); // เพิ่ม dependencies เพื่อให้ useEffect ทำงานเมื่อ user หรือ token เปลี่ยน

  const handleOnChange = (e) => {
    const { name, value, address } = e.target;
    console.log("🚀 ~ handleOnChange ~ e.target:", e.target);

    setOk((prevState) => ({
      ...prevState,
      user: {
        ...prevState.user,
        [name]: value,
        [address]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = { name: ok.user.name, address: ok.user.address }; // เตรียมข้อมูลที่จะส่ง
      const res = await UpdateProfile(token, data); // เรียกใช้งาน API
      console.log(res);
      toast.success(`Profile updated successfully`);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 mx-auto mt-6 bg-white shadow-md rounded-lg p-6 max-w-4xl">
      {/* Left Side: Profile Picture Update */}
      <UserImg />

      {/* Right Side: Update Profile Form */}
      <div className="flex flex-col md:w-2/3">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Update Profile
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="Enter your email"
              required
              value={ok.user.email}
              name="email"
              disabled
            />
          </div>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="Enter your name"
              required
              onChange={handleOnChange}
              value={ok.user.name}
              name="name"
            />
          </div>

          {/* Address Section */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Address
            </label>
            <div>
              <textarea
                placeholder="Input address"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={handleOnChange}
                value={ok.user.address}
                name="address"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-500 transition-all"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormUpdateProfile;
