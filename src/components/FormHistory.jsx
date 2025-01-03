import { useEffect, useState } from "react";
import { getOrders, saveAddress } from "../api/user";
import { numberFormat } from "../utills/number";
import useStore from "../store/store";
import { dateFormat } from "../utills/date";
import { currentUser } from "../api/auth";

const FormHistory = () => {
  const token = useStore((state) => state.token);
  const [orders, setOrders] = useState([]);
  const [isAddingAddress, setIsAddingAddress] = useState(null);
  const [newAddress, setNewAddress] = useState("");
  console.log("🚀 ~ FormHistory ~ newAddress:", newAddress)
  const [userAddress, setUserAddress] = useState("");
  const [addressOption, setAddressOption] = useState("current");

  const user = useStore((state) => state.user);

  useEffect(() => {
    const checkUser = async () => {
      if (user && token) {
        try {
          const res = await currentUser(token);
          setUserAddress(res.data);
        } catch (error) {
          console.error("Error checking user:", error);
          setUserAddress("No address available");
        }
      }
    };

    checkUser();
  }, [user, token]);

  useEffect(() => {
    handlegetOrders(token);
  }, []);

  const handlegetOrders = async (token) => {
    try {
      const res = await getOrders(token);
      setOrders(res.data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleAddAddress = async (orderId) => {
    try {
      const addressToSave =
        addressOption === "current" ? userAddress.user.address : newAddress;
      await saveAddress(token, addressToSave, orderId);
      setIsAddingAddress(false);
      handlegetOrders(token);
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4 text-gray-700">Order History</h1>
      {orders?.length > 0 ? (
        orders.map((item, index) => (
          <div
            key={index}
            className="mb-6 border border-gray-300 rounded-lg p-4 shadow-sm"
          >
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <div className="flex justify-end space-x-4">
                <div>
                  <p className="text-gray-500 text-sm">Order Date</p>
                  <p className="text-gray-800 font-medium">
                    {dateFormat(item.updated)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Address</p>
                  <p className="text-gray-800 font-medium">
                    {item.address || "No Address Provided"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`px-2 py-1 text-sm font-semibold rounded block text-center ${
                    item.address
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {item.address ? "Address Provided" : "No Address Provided"}
                </span>
                <span
                  className={`px-2 py-1 text-sm font-semibold rounded block text-center ${
                    item.orderStatus === "Completed"
                      ? "bg-green-100 text-green-600"
                      : item.orderStatus === "Processing"
                      ? "bg-yellow-100 text-yellow-600"
                      : item.orderStatus === "Cancel"
                      ? "bg-red-100 text-red-600"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {item.orderStatus}
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-700">
                <thead>
                  <tr className="border-b">
                    <th className="py-2">PRODUCT</th>
                    <th className="py-2 text-right">PRICE</th>
                    <th className="py-2 text-center">QTY</th>
                    <th className="py-2 text-right">TOTAL</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  {item.products?.map((product, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">{product.product.title}</td>
                      <td className="py-2 text-right">
                        ฿{numberFormat(product.product.price)}
                      </td>
                      <td className="py-2 text-center">{product.count}</td>
                      <td className="py-2 text-right">
                        {product.count * product.product.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="text-gray-700 text-sm text-left">
                {!item.address ? (
                  <button
                    className="text-blue-500 underline"
                    onClick={() => setIsAddingAddress(item.id)}
                  >
                    Add Address
                  </button>
                ) : (
                  <p></p>
                )}
              </div>
              <p className="text-gray-700 font-bold text-lg text-right">
                Total Amount: ฿{numberFormat(item.cartTotal)}
              </p>
            </div>

            {isAddingAddress === item.id && (
              <div className="mt-4">
                <div className="flex flex-col mb-4">
                  <div className="flex items-center mb-2">
                    <label className="mr-2">
                      <input
                        type="radio"
                        name="addressOption"
                        value="current"
                        className="mr-2"
                        checked={addressOption === "current"}
                        onChange={() => setAddressOption("current")}
                      />
                      Use Current Address
                    </label>
                  </div>
                  {addressOption === "current" && (
                    <p className="text-gray-600 bg-gray-100 p-2 rounded mb-2">
                      {userAddress.user.address || "No address available"}
                    </p>
                  )}
                  <div className="flex items-center mb-2">
                    <label>
                      <input
                        type="radio"
                        name="addressOption"
                        value="new"
                        className="mr-2"
                        checked={addressOption === "new"}
                        onChange={() => setAddressOption("new")}
                      />
                      Enter New Address
                    </label>
                  </div>
                  {addressOption === "new" && (
                    <textarea
                      value={newAddress}
                      onChange={(e) => setNewAddress(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Enter your address"
                    />
                  )}
                </div>
                <button
                  onClick={() => handleAddAddress(item.id)}
                  className="mt-2 text-white bg-blue-400 py-2 px-4 rounded mr-2"
                >
                  Save Address
                </button>
                <button
                  onClick={() => setIsAddingAddress(null)}
                  className="mt-2 text-white bg-red-400 py-2 px-4 rounded-md"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default FormHistory;
