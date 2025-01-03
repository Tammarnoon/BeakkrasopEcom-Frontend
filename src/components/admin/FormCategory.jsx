/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { createCategory, removeCategory } from "../../api/category";
import useStore from "../../store/store";
import { toast } from "react-toastify";

const FormCategory = () => {
  const token = useStore((state) => state.token);
  const [name, setName] = useState("");
  // const [categories, setCategories] = useState([]);
  const categories = useStore((state) => state.categories);
  const getCategory = useStore((state) => state.getCategory);

  useEffect(() => {
    getCategory(token);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(token, name);

    try {
      const res = await createCategory(token, { name });
      console.log(res.data.name);
      toast.success(`Category ${res.data.name} added successfully!`);
      setName("");
      getCategory(token); // Refresh categories
    } catch (error) {
      console.log("Error adding category:", error);
      toast.error("Failed to add category.");
    }
  };

  const handleRemove = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const res = await removeCategory(token, id);
        console.log(res);
        toast.success(`Deleted ${res.data.name} successfully!`);
        getCategory(token);
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete category.");
      }
    }
  };

  return (
    <div className="container mx-auto mt-3 bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">
        Category Management
      </h1>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Category</h2>
      {/*Create form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Category Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter category name"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-500 transition-all"
        >
          Add Category
        </button>
      </form>

      {/* Category Table */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Category List
        </h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="text-gray-700">
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left w-[20%]">
                No.
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left w-[20%]">
                ID
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left w-[40%]">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left w-[20%]">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {categories.length > 0 ? (
              categories.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="bg-red-400 text-white font-semibold py-1 px-3 rounded-lg hover:bg-red-500 transition-all"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                >
                  No categories available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormCategory;
