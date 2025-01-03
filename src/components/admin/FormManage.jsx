import { useEffect, useState } from "react";
import useStore from "../../store/store";
import { changeUserRole, changeUserStatus, getUser } from "../../api/admin";
import { toast } from "react-toastify";

function FormManage() {
  const token = useStore((state) => state.token);
  const [user, setUser] = useState([]);

  useEffect(() => {
    handleGetUser(token);
  }, []);

  const handleGetUser = async (token) => {
    try {
      const res = await getUser(token);
      //   console.log("🚀 ~ handleGetUser ~ res:", res);
      setUser(res.data);
    } catch (error) {
      console.log("🚀 ~ handleGetUser ~ error:", error);
    }
  };

  const handleChangeStatus = async (userId, userStatus) => {
    console.log(userId, userStatus);
    const value = {
      id: userId,
      enabled: userStatus,
    };

    try {
      const res = await changeUserStatus(token, value);
      console.log("🚀 ~ handleChangeStatus ~ res:", res);
      toast.success("Change status successfully!");
      handleGetUser(token);
    } catch (error) {
      console.log("🚀 ~ handleChangeStatus ~ error:", error);
    }
  };

  const handleChangeRole = async (userId, userRole) => {
    const value = {
      id: userId,
      role: userRole,
    };

    try {
      const res = await changeUserRole(token, value);
      console.log(res);
      handleGetUser(token);
      toast.success("Change role successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto mt-3 bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">
        User Management
      </h1>
      <div className="mt-6">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="text-gray-700">
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left w-[10%]">
                No.
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left w-[30%]">
                Email
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left w-[10%]">
                Role
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left w-[20%]">
                Role action
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left w-[10%]">
                Status
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left w-[20%]">
                Status action
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {user.length > 0 ? (
              user.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.role}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <select
                      onChange={(e) =>
                        handleChangeRole(item.id, e.target.value)
                      }
                      className="px-2 py-1 text-sm border rounded w-full"
                      defaultValue={item.role}
                    >
                      <option value="admin">admin</option>
                      <option value="user">user</option>
                    </select>
                  </td>
                  <td>
                    <span
                      className={`py-1 text-sm font-semibold rounded block text-center ${
                        item.enabled
                          ? "bg-blue-100 text-blue-500"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {item.enabled ? "Enabled" : "Disabled"}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <select
                      onChange={(e) =>
                        handleChangeStatus(item.id, e.target.value === "true")
                      }
                      className="px-2 py-1 text-sm border rounded w-full"
                      defaultValue={item.enabled}
                    >
                      <option value="true">Enabled</option>
                      <option value="false">Disabled</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                >
                  No categories available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FormManage;
