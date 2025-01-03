import { useEffect, useState } from "react";
import useStore from "../store/store";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { numberFormat } from "../utills/number";

const SearchCard = () => {
  const getProduct = useStore((state) => state.getProduct);
  const products = useStore((state) => state.products);
  const actionSearchFilter = useStore((state) => state.actionSearchFilter);
  const getCategory = useStore((state) => state.getCategory);
  const categories = useStore((state) => state.categories);

  const [text, setText] = useState("");
  const [categorySelected, setCategorySelected] = useState([]);
  const [price, setPrice] = useState([50, 200]);
  const [ok, setOk] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    getCategory();
  }, []);

  // Search by Text
  useEffect(() => {
    const delay = setTimeout(() => {
      if (text) {
        actionSearchFilter({ query: text });
      } else {
        getProduct();
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [text]);

  // Search by Category
  const handleCheck = (e) => {
    // console.log("🚀 ~ handleCheck ~ e:", e.target.value);

    const inCheck = e.target.value; // checked
    const inState = [...categorySelected]; // arrary [ ]
    const findCheck = inState.indexOf(inCheck); //if not found return -1

    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }
    setCategorySelected(inState);

    if (inState.length > 0) {
      actionSearchFilter({ category: inState });
    } else {
      getProduct();
    }
  };

  // Search by Price
  useEffect(() => {
    actionSearchFilter({ price });
  }, [ok]);
  const handlePrice = (value) => {
    console.log("🚀 ~ handlePrice ~ value:", value);
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 500);
  };

  return (
    <div>
      {/* Search by Text */}
      <label className="block text-gray-700 font-medium mb-4 text-xl">
        Search
      </label>
      <input
        onChange={(e) => setText(e.target.value)}
        type="text"
        name="search"
        placeholder="Search here..."
        className="border w-full mb-4 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <hr />

      {/* Search by Category */}
      <div className="mt-4">
        <label className="block text-gray-700 font-medium mb-4 text-xl">
          Category Filter
        </label>
        <div>
          <div
            className="cursor-pointer text-gray-500 font-medium mb-4"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {categorySelected.length > 0
              ? `Selected (${categorySelected.length})`
              : "Select Categories"}
            <svg
              className={`w-5 h-5 inline-block ml-2 transform ${
                dropdownOpen ? "rotate-0" : "-rotate-90"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {dropdownOpen && (
            <div className="mt-2 mb-4 ">
              {categories.map((item, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    onChange={handleCheck}
                    type="checkbox"
                    value={item.id}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded"
                  />
                  <label className="ml-2 text-gray-700">{item.name}</label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <hr />

      {/* Search by Price */}
      <div>
        <label className="block text-gray-700 font-medium mt-4 mb-4 text-xl">
          Price
        </label>
        <div className="flex justify-between text-gray-700 font-medium mb-2">
          <span>฿ {numberFormat(price[0])}</span>
          <span>฿ {numberFormat(price[1])}</span>
        </div>
        <div className="px-2">
          <Slider
            range
            min={0}
            max={1500}
            defaultValue={[50, 200]}
            onChange={handlePrice}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
