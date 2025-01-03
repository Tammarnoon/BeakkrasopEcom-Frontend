import { Link, useNavigate } from "react-router-dom";
import useStore from "../store/store";
import { createUserCart } from "../api/user";
import { toast } from "react-toastify";
import { numberFormat } from "../utills/number";
import { useEffect } from "react";

const FormCart = () => {
  const cart = useStore((state) => state.carts);
  const user = useStore((state) => state.user);
  const token = useStore((state) => state.token);
  const getTotalPrice = useStore((state) => state.getTotalPrice);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cart || cart.length === 0) {
      navigate("/shop");
    }
  }, []);

  const handleSaveCart = async () => {
    try {
      const res = await createUserCart(token, { cart });
      toast.success("Save cart successfully!");
      navigate("/checkout");
    } catch (error) {
      console.log("🚀 ~ handleSaveCart ~ error:", error);
      toast.warning(error.response.data.message);
    }
  };

  return (
    <div className="p-8 bg-white shadow-md rounded-lg border border-gray-300 m-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-600">
          Product{cart.length > 1 ? "s" : ""} list{" "}
          <span className="text-gray-400">
            ({cart.length} item{cart.length > 1 ? "s" : ""})
          </span>
        </h2>
        <div className="text-gray-400 text-xl">🛒</div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product List */}
        <div className="lg:col-span-2 divide-y divide-gray-300">
          {cart.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                {/* Image */}
                <div className="w-20 h-20 flex-shrink-0">
                  {item.images && item.images.length > 0 ? (
                    <img
                      className="w-full h-full object-cover rounded-md"
                      src={item.images[0].url}
                      alt={item.title}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-md">
                      <span className="text-xs text-gray-500 text-center">
                        No Image
                      </span>
                    </div>
                  )}
                </div>
                {/* Product Info */}
                <div>
                  <p className="text-gray-800 ">{item.title}</p>
                  <p className="text-gray-500 text-sm">
                    ฿{numberFormat(item.price)} x {item.count}
                  </p>
                </div>
              </div>
              {/* Total Price */}
              <p className="text-gray-600 font-bold">
                ฿{numberFormat(item.price * item.count)}
              </p>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="p-6  border-l-2">
          <h3 className="text-xl font-bold text-gray-600 mb-4">Summary</h3>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600 font-medium">Total:</p>
            <p className="text-xl font-bold text-gray-600">
              ฿{numberFormat(getTotalPrice())}
            </p>
          </div>

          {/* Button */}
          {user ? (
            <button
              onClick={handleSaveCart}
              className="w-full bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-500 transition duration-200 mb-3"
            >
              Save
            </button>
          ) : (
            <Link to={"/login"}>
              <button className="w-full bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-500 transition duration-200 mb-3">
                Login
              </button>
            </Link>
          )}

          <Link to={"/shop"}>
            <button className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition duration-200">
              Cancel
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FormCart;
