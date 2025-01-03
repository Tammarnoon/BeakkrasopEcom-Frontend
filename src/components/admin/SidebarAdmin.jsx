import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaUsers, FaTags, FaBox, FaShoppingCart } from "react-icons/fa"; // Import icons
import useStore from "../../store/store";

const SidebarAdmin = () => {
  const logout = useStore((state) => state.logout);
  const navigate = useNavigate();

  return (
    <aside className="h-screen bg-gray-100 border-r border-gray-300 p-4 w-64 relative">
      {/* Logo */}
      <div className="flex items-center space-x-2 mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
      </div>

      <hr />

      {/* Navigation */}
      <nav className="mt-6">
        <ul className="space-y-4">
          <li>
            <NavLink
              to={"/admin/"}
              end
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-semibold border-l-4 border-blue-500 pl-4 flex items-center space-x-2"
                  : "text-gray-700 hover:text-blue-500 hover:pl-4 transition-all flex items-center space-x-2"
              }
            >
              <FaHome /> {/* Dashboard icon */}
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/Manage"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-semibold border-l-4 border-blue-500 pl-4 flex items-center space-x-2"
                  : "text-gray-700 hover:text-blue-500 hover:pl-4 transition-all flex items-center space-x-2"
              }
            >
              <FaUsers /> {/* Manage icon */}
              <span>Manage</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/Category"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-semibold border-l-4 border-blue-500 pl-4 flex items-center space-x-2"
                  : "text-gray-700 hover:text-blue-500 hover:pl-4 transition-all flex items-center space-x-2"
              }
            >
              <FaTags /> {/* Category icon */}
              <span>Category</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/Product"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-semibold border-l-4 border-blue-500 pl-4 flex items-center space-x-2"
                  : "text-gray-700 hover:text-blue-500 hover:pl-4 transition-all flex items-center space-x-2"
              }
            >
              <FaBox /> {/* Product icon */}
              <span>Product</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/Order"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-semibold border-l-4 border-blue-500 pl-4 flex items-center space-x-2"
                  : "text-gray-700 hover:text-blue-500 hover:pl-4 transition-all flex items-center space-x-2"
              }
            >
              <FaShoppingCart /> {/* Order icon */}
              <span>Order</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <footer className="absolute bottom-4 left-0 w-full px-4">
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to logout?")) {
              logout();
              navigate("/");
            }
          }}
          className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition-all flex items-center justify-center space-x-2"
        >
          <span>Logout</span>
        </button>
      </footer>
    </aside>
  );
};

export default SidebarAdmin;
