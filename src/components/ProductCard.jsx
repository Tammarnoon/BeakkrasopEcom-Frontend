import { ShoppingCart } from "lucide-react";
import useStore from "../store/store";
import { numberFormat } from "../utills/number";
import { motion } from "framer-motion";
import { useState } from "react";

import Modal from "../components/Model";

const ProductCard = ({ item }) => {
  const user = useStore((state) => state.user);
  const actionAddToCart = useStore((state) => state.actionAddToCart);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Product Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
          scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
        }}
      >
        <div
          className="flex flex-col w-64 h-80 rounded-lg overflow-hidden shadow-md border border-gray-200 bg-white cursor-pointer"
          onClick={handleCardClick}
        >
          {/* Image */}
          <div className="w-full h-48 bg-gray-300 flex justify-center items-center overflow-hidden group">
            {item.images && item.images.length > 0 ? (
              <img
                src={item.images[0].url}
                alt="Product"
                className="object-cover w-full h-full transform transition-all duration-300 group-hover:scale-110"
              />
            ) : (
              <span className="text-white text-lg">No Image</span>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between flex-grow p-4 overflow-hidden">
            <p className="text-lg font-semibold text-gray-700 truncate">
              {item.title}
            </p>
            <p className="text-sm text-gray-600 mb-2 truncate">
              {item.description}
            </p>
            <p className="text-sm text-gray-600 mb-2 truncate">
              Product defect:{" "}
              {item.product_defect ? item.product_defect : "None"}
            </p>
            <div className="flex justify-between items-center">
              <p className="text-lg font-medium text-gray-600">
                ฿{numberFormat(item.price)}
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!user) {
                    alert("Please log in to add items to the cart!");
                    return;
                  }
                  actionAddToCart(item);
                }}
                className="p-2 rounded-full border border-gray-300 hover:border-gray-500"
                aria-label="Add to Cart"
              >
                <ShoppingCart className="text-gray-600 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="flex flex-col items-center px-5">
          {/* Title */}
          <h2 className="text-2xl font-semibold text-gray-600 mb-4 text-center">
            {item.title}
          </h2>

          {/* Product Image */}
          <div className="w-full h-64 bg-gray-200 rounded-md overflow-hidden shadow-md mb-4">
            {item.images && item.images.length > 0 ? (
              <img
                src={item.images[0].url}
                alt="Product"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No Image Available
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-700 text-center mb-4">{item.description}</p>

          {/* Product Defect */}
          <p className="text-gray-600 text-center mb-4">
            Product defect: {item.product_defect ? item.product_defect : "None"}
          </p>

          {/* Price */}
          <p className="text-xl font-semibold text-gray-600 mb-6">
            Price: ฿{numberFormat(item.price)}
          </p>

          {/* Add to Cart Button */}
          <button
            className="px-6 py-3 bg-blue-400 text-white rounded-md hover:bg-blue-500"
            onClick={() => {
              if (!user) {
                alert("Please log in to add items to the cart!");
                return;
              }
              actionAddToCart(item);
              handleCloseModal();
            }}
          >
            Add to Cart
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ProductCard;
