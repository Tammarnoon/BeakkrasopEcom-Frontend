/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useStore from "../../store/store";
import { createProduct, DeleteProduct } from "../../api/product";
import { toast } from "react-toastify";
import UploadImg from "./UploadImg";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { numberFormat } from "../../utills/number";
import { dateFormat } from "../../utills/date";

//ค่าเรื่มต่น
const initialSate = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  categoryId: "",
  images: [],
  product_defect: "",
};

const FormProduct = () => {
  const token = useStore((state) => state.token);
  const getCategory = useStore((state) => state.getCategory);
  const categories = useStore((state) => state.categories);
  const getProduct = useStore((state) => state.getProduct);
  const products = useStore((state) => state.products);
  console.log("🚀 ~ FormProduct ~ products:", products);
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => setShowForm(!showForm);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: "",
    images: [],
    product_defect: "",
  });

  useEffect(() => {
    getCategory();
    getProduct(20);
  }, []);

  //console.log(categories);

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log("🚀 ~ handleOnChange ~ form:", form);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createProduct(token, form);
      console.log(res);
      setForm(initialSate);
      getProduct();
      toast.success(`Product ${res.data.title} added successfully!`);
    } catch (error) {
      console.log("Error adding product:", error);
      toast.error("Failed to add pategory.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Do yo want to delete this product ?")) {
      try {
        const res = await DeleteProduct(token, id);
        toast.success(`Product delete successfully!`);
        console.log("🚀 ~ handleDelete ~ res:", res);
        getProduct();
      } catch (error) {
        console.log("🚀 ~ handleDelete ~ error:", error);
      }
    }
  };

  return (
    <div className="container mx-auto mt-3 bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">
        Product Management
      </h1>
      {/* ปุ่ม Add Product */}
      <div className="flex justify-end">
        <button
          onClick={toggleForm}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
        >
          {showForm ? "Close Form" : "Add Product"}
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Product Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter product name"
              required
              value={form.title}
              onChange={handleOnChange}
              name="title"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Product Defect
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Skip this section if the product has no defects."
              value={form.product_defect}
              onChange={handleOnChange}
              name="product_defect"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter product description"
              rows="4"
              required
              value={form.description}
              onChange={handleOnChange}
              name="description"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Price
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter product price"
              min="0"
              step="0.01"
              required
              value={form.price}
              onChange={handleOnChange}
              name="price"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Quantity
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter product quantity"
              min="0"
              required
              value={form.quantity}
              onChange={handleOnChange}
              name="quantity"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Category
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              name="categoryId"
              onChange={handleOnChange}
              value={form.categoryId}
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <UploadImg form={form} setForm={setForm} />

          <button
            type="submit"
            className="w-full bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-500 transition-all"
          >
            Add Product
          </button>
        </form>
      )}

      {/* Product Table */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Product List
        </h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="text-gray-700">
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left w-[5%]">
                No.
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left w-[10%]">
                Image
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left w-[10%]">
                Product Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left w-[5%]">
                Category
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left w-[10%]">
                Price
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left w-[10%]">
                Quantity
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left w-[10%]">
                Sold
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left w-[10%]">
                Defect
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left w-[15%]">
                Updated
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left w-[10%]">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {products.length > 0 ? (
              products.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.images.length > 0 ? (
                      <img
                        src={item.images[0].url}
                        className="w-24 h-24 rounded-md flex items-center justify-center"
                      />
                    ) : (
                      <div className="w-24 h-24  bg-gray-100 rounded-md flex items-center justify-center">
                        No image
                      </div>
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.title}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {categories.find((cate) => cate.id === item.categoryId)
                      ?.name || "Unknown"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    ฿ {numberFormat(item.price)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.quantity}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.sold}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.product_defect}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {dateFormat(item.updated)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex justify-center gap-2">
                      <button className="bg-yellow-300 text-white font-semibold p-2 rounded-lg hover:bg-yellow-400 transition-all flex items-center justify-center">
                        <Link to={"/admin/product/" + item.id}>
                          <FaEdit size={16} />
                        </Link>
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-400 text-white font-semibold p-2 rounded-lg hover:bg-red-500 transition-all flex items-center justify-center"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                >
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormProduct;
