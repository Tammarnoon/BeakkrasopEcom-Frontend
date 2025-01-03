import { FaTrashAlt } from "react-icons/fa";
import useStore from "../store/store";
import { Link } from "react-router-dom";
import { numberFormat } from "../utills/number";

const CartCard = () => {
  const carts = useStore((state) => state.carts);
  const actionUpdateQuantity = useStore((state) => state.actionUpdateQuantity);
  const actionRemoveProductonCart = useStore(
    (state) => state.actionRemoveProductonCart
  );
  const getTotalPrice = useStore((state) => state.getTotalPrice);

  return (
    <div className="p-4 mt-4 bg-gray-100 rounded-md shadow-lg w-80 overflow-hidden">
      {carts.length > 0 ? (
        <>
          {/* Cart items */}
          {carts.map((item, index) => (
            <div key={index} className="bg-white rounded-md shadow-sm p-4 mb-3">
              <div className="flex items-center mb-6">
                {/* Image */}
                <div className="w-12 h-12 bg-gray-300 flex items-center rounded-md">
                  {item.images && item.images.length > 0 ? (
                    <img
                      className="w-full h-full object-cover"
                      src={item.images[0].url}
                    />
                  ) : (
                    <span className="text-xs text-white text-center">
                      No Image
                    </span>
                  )}
                </div>

                {/* Title and description */}
                <div className="ml-4 flex-1 overflow-hidden">
                  <h3 className="text-sm font-medium text-gray-800 truncate">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 truncate">
                    {item.description}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    Product defect :{" "}
                    {item.product_defect ? item.product_defect : "None"}
                  </p>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => actionRemoveProductonCart(item.id)}
                  className="text-red-400 hover:text-red-500"
                >
                  <FaTrashAlt size={16} />
                </button>
              </div>

              {/* Quantity and price */}
              <div className="flex items-center justify-between">
                {/* Quantity controls */}
                <div className="flex items-center border rounded-md px-1 py-1">
                  {/* - */}
                  <button
                    onClick={() =>
                      actionUpdateQuantity(item.id, item.count - 1)
                    }
                    className="text-gray-600 text-sm px-2 hover:bg-gray-200 hover:text-gray-700 rounded-md"
                  >
                    -
                  </button>

                  {/* Quantity */}
                  <span className="px-2 text-gray-600 text-sm">
                    {item.count}
                  </span>

                  {/* + */}
                  <button
                    onClick={() =>
                      actionUpdateQuantity(item.id, item.count + 1)
                    }
                    className="text-gray-600 text-sm px-2  hover:bg-gray-200 hover:text-gray-700 rounded-md"
                  >
                    +
                  </button>
                </div>

                {/* Price */}
                <div className="text-gray-600 text-sm">
                  ฿{numberFormat(item.price * item.count)}
                </div>
              </div>
            </div>
          ))}

          {/* Total */}
          <div className="flex justify-between items-center mt-4 text-gray-700">
            <span className="font-bold">Total:</span>
            <span className="text-gray-600 font-bold">
              ฿{numberFormat(getTotalPrice())}
            </span>
          </div>

          {/* Checkout button */}
          <Link to="/cart">
            <button className="w-full bg-blue-400 text-white py-2 mt-4 rounded-md hover:bg-blue-500">
              Proceed
            </button>
          </Link>
        </>
      ) : (
        <div className="text-center text-gray-500 text-lg py-8">
          <div className="bg-white rounded-md shadow-sm p-10 mb-3 ">
            No item in the cart.
          </div>
        </div>
      )}
    </div>
  );
};

export default CartCard;
