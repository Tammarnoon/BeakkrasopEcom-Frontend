/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useStore from "../../store/store";
import { ReadProduct, UpdateProduct } from "../../api/product";
import { toast } from "react-toastify";
import UploadImg from "./UploadImg";
import { useParams, useNavigate } from "react-router-dom";

//ค่าเรื่มต่น
const initialSate = {
  title: "",
  description: "",
  price: "",
  quantity: "",
  categoryId: "",
  images: [],
  product_defect: "",
};

const FormUpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useStore((state) => state.token);
  const getCategory = useStore((state) => state.getCategory);
  const categories = useStore((state) => state.categories);

  const [form, setForm] = useState(initialSate);

  useEffect(() => {
    getCategory();
    fetchProduct(token, id, form);
  }, []);

  const fetchProduct = async (token, id, form) => {
    try {
      const res = await ReadProduct(token, id, form);
      // set data into form
      setForm(res.data);
    } catch (error) {
      console.log("🚀 ~ fetchProduct ~ error:", error);
    }
  };

  console.log("🚀 ~ fetchProduct ~ form:", form);

  //console.log(categories);

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    // console.log("🚀 ~ handleOnChange ~ form:", form)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await UpdateProduct(token, id, form);
      console.log(res);
      toast.success(`Product ${res.data.title} update successfully!`);
      navigate("/admin/product");
    } catch (error) {
      console.log("Error updateing product:", error);
      toast.error("Failed updateing product.");
    }
  };

  return (
    <div className="mx-auto mt-3 bg-white shadow-md rounded-lg p-6">
      {/* Create form */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Update Product
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Product Name */}
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

        {/* Description */}
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

        {/* Price */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Price</label>
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

        {/* Quantity */}
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

        {/* Category */}
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

        {/* Upload Img */}
        <UploadImg form={form} setForm={setForm} />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default FormUpdateProduct;
