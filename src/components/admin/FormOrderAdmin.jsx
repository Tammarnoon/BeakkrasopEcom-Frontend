import { useEffect, useState } from "react";
import useStore from "../../store/store";
import { getOrderAdmin, changeOrderStatus } from "../../api/admin";
import { toast } from "react-toastify";
import { numberFormat } from "../../utills/number";
import { dateFormat } from "../../utills/date";

const FormOrderAdmin = () => {
  const token = useStore((state) => state.token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    handleGetOrder(token);
  }, [token]);

  const handleGetOrder = async (token) => {
    try {
      const res = await getOrderAdmin(token);
      console.log("🚀 ~ handleGetOrder ~ res:", res);
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleChangeOrderStatus = async (token, orderId, orderStatus) => {
    try {
      const res = await changeOrderStatus(token, orderId, orderStatus);
      console.log("🚀 ~ handleChangeOrderStatus ~ res:", res);
      toast.success("Status update!");
      handleGetOrder(token);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div className="container mx-auto mt-3 bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">
        Order Management
      </h1>

      <div className="overflow-x-auto text-gray-600">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left border-b">Date</th>
              <th className="px-4 py-2 text-left border-b">User</th>
              <th className="px-4 py-2 text-left border-b">Address</th>
              <th className="px-4 py-2 text-left border-b">Product</th>
              <th className="px-4 py-2 text-left border-b">Total</th>
              <th className="px-4 py-2 text-left border-b">Status</th>
              <th className="px-4 py-2 text-left border-b">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {orders.length > 0 ? (
              orders.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b align-top">
                    {dateFormat(item.created)}
                  </td>
                  <td className="px-4 py-2 border-b align-top">
                    {item.orderedBy.email}
                  </td>
                  <td className="px-4 py-2 border-b align-top">
                    {item.address ? item.address : "No Address Provided"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    <div>
                      {item.products.map((product, idx) => (
                        <div key={idx}>
                          * {product.product.title} {" : "}
                          <span className="font-medium">
                            ฿{numberFormat(product.product.price)} x{" "}
                            {product.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-2 border-b">
                    ฿{numberFormat(item.cartTotal)}
                  </td>
                  <td className="px-4 py-2 border-b">
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
                  </td>
                  <td className="px-4 py-2 border-b">
                    <select
                      className="px-2 py-1 text-sm border rounded w-full"
                      onChange={(e) =>
                        handleChangeOrderStatus(token, item.id, e.target.value)
                      }
                      defaultValue={item.orderStatus}
                    >
                      <option value="Not Process">Not Process</option>
                      <option value="Processing">Processing</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancel">Cancel</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-4 py-2 text-center text-gray-500 border-b"
                >
                  No orders available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormOrderAdmin;
