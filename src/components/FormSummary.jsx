import { useState, useEffect } from "react";
import { listUserCart, saveAddress } from "../api/user";
import useStore from "../store/store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { numberFormat } from "../utills/number";

const FormSummary = () => {
  const token = useStore((state) => state.token);
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  // const [address, setAddress] = useState("");
  // const [addressSaved, setAddressSaved] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    handleUserCart(token);
  }, []);

  const handleUserCart = async (token) => {
    try {
      const res = await listUserCart(token);
      setProducts(res.data.products);
      setCartTotal(res.data.cartTotal);
    } catch (error) {
      console.log("🚀 ~ handleUserCart ~ error:", error);
    }
  };

  // const handleSaveAddress = async () => {
  //   try {
  //     if (!address) {
  //       return toast.warning("Please fill address!");
  //     }
  //     const res = await saveAddress(token, address);
  //     console.log("🚀 ~ handleSaveAddress ~ res:", res);
  //     toast.success("Address save successfully!");
  //     setAddressSaved(true);
  //   } catch (error) {
  //     console.log("🚀 ~ handleSaveAddress ~ error:", error);
  //   }
  // };

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-lg max-w-2xl mx-auto mt-8 border border-gray-300">
      {/* Header */}
      <h2 className="text-xl font-bold text-gray-700 mb-6 text-center">
        Order Summary
      </h2>

      {/* Address Section */}
      {/* <div className="bg-white p-4 rounded-md shadow-sm mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Address</h3>
        <div>
          <textarea
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Input address"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSaveAddress}
            className="w-full bg-blue-400 text-white py-2 mt-6 rounded-md hover:bg-blue-500"
          >
            Save address
          </button>
        </div>
      </div> */}

      {/* Order Section */}
      <div className="bg-white p-4 rounded-md shadow-sm">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Order</h3>
        {products?.map((item, index) => (
          <div key={index} className="mb-3">
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex justify-between">
                {/* Left Section */}
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">
                    Title: {item.product.title}
                  </span>
                  <div className="flex justify-between w-full">
                    <p>
                      Quantity : ฿{numberFormat(item.product.price)} x{" "}
                      {item.count}
                    </p>
                  </div>
                </div>
                {/* Right Section */}
                <p className="font-bold text-gray-600">
                  ฿{numberFormat(item.product.price * item.count)}
                </p>
              </li>
            </ul>
          </div>
        ))}
        <li className="flex justify-between font-bold text-gray-700 border-t pt-2">
          <span>Total</span>
          <span>฿{numberFormat(cartTotal)}</span>
        </li>
      </div>

      {/* Confirm Button */}
      <div className="w-full">
        {/* <button
          onClick={() => navigate("/user/payment")}
          disabled={!addressSaved}
          className={`w-full py-2 mt-6 rounded-md text-white ${
            addressSaved
              ? "bg-blue-400 hover:bg-blue-500"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Confirm Order
        </button>
        {!addressSaved && (
          <p className="mt-2 text-sm text-gray-500">
            Please provide your address first.
          </p>
        )} */}

        <button
          onClick={() => navigate("/user/payment")}
          className={`w-full py-2 mt-6 rounded-md text-white bg-blue-400 hover:bg-blue-500`}
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default FormSummary;
