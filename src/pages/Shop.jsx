import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import ProductCard from "../components/ProductCard";
import { ShoppingCart } from "lucide-react";
import useStore from "../store/store";
import SearchCard from "../components/SearchCard";
import CartCard from "../components/CartCard";
import { numberFormat } from "../utills/number";

const Shop = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const getProduct = useStore((state) => state.getProduct);
  const products = useStore((state) => state.products);
  const carts = useStore((state) => state.carts);

  useEffect(() => {
    getProduct();
  }, []);

  const toggleCartVisibility = () => {
    setIsCartVisible((prev) => !prev);
  };

  return (
    <div className="relative flex gap-3">
      {/* Search */}
      <div className="w-[300px] p-4 h-screen">
        <SearchCard />
      </div>

      {/* Product */}
      <div className="flex-1 p-4 h-screen ">
        <label className="block text-gray-700 font-bold text-2xl mb-2">
          Our products
        </label>
        <div className="flex flex-wrap gap-10">
          {products.map((item, index) => (
            <ProductCard key={index} item={item} />
          ))}
        </div>
      </div>

      {/* Cart Icon */}
      <button
        onClick={toggleCartVisibility}
        className="fixed bottom-4 right-4 bg-white text-white p-3 rounded-full shadow-lg border border-gray-400 hover:border-gray-500"
      >
        <ShoppingCart className="text-gray-600 w-5 h-5" size={24} />
        {/* Badge */}
        {carts.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
            {carts.length}
          </span>
        )}
      </button>

      {/* Cart */}
      {isCartVisible && (
        <div className="fixed top-0 right-0 w-[360px] h-screen bg-gray-100 p-4 overflow-y-auto shadow-lg z-50">
          <div className="flex justify-between items-center mt-2 mb-4">
            <h2 className="text-lg font-medium text-gray-700 truncate">
              Product Cart
            </h2>
            {/* Close Button */}
            <button
              onClick={toggleCartVisibility}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              <AiOutlineClose size={24} />
            </button>
          </div>
          <CartCard />
        </div>
      )}
    </div>
  );
};

export default Shop;
