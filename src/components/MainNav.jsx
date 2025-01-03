import { ChevronDown } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import useStore from "../store/store";

const MainNav = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);
  // console.log("🚀 ~ MainNav ~ user:", Boolean(user));
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="bg-gray-100 border-b border-gray-300 p-4 h-16">
      <div className="flex items-center justify-between h-full">
        {/* Left */}
        <div className="flex items-center space-x-2">
          <p className="text-gray-700 text-xl font-bold">Beak-kra-sop</p>
        </div>

        {/* Center */}
        <ul className="flex space-x-6 mx-auto">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-semibold border-b-2 border-blue-500 pb-1"
                  : "text-gray-700 hover:text-blue-500"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-semibold border-b-2 border-blue-500 pb-1"
                  : "text-gray-700 hover:text-blue-500"
              }
            >
              Shop
            </NavLink>
          </li>
        </ul>

        {/* Right */}

        {user ? (
          // user
          <ul className="flex space-x-6 items-center">
            <li className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-1 hover:bg-gray-200 px-2 py-1 rounded-md"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full text-gray-500 text-xs">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/666/666201.png"
                    alt="User Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <ChevronDown className="text-gray-400" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 w-40 bg-white border border-gray-300 shadow-lg rounded-md z-20">
                  <ul className="py-1">
                    <li>
                      <NavLink
                        to="/user/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/user/history"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        History
                      </NavLink>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          if (
                            window.confirm("Are you sure you want to logout?")
                          ) {
                            logout();
                            navigate("/");
                          }
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        ) : (
          // guest
          <ul className="flex space-x-6">
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 font-semibold border-b-2 border-blue-500 pb-1"
                    : "text-gray-700 hover:text-blue-500"
                }
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 font-semibold border-b-2 border-blue-500 pb-1"
                    : "text-gray-700 hover:text-blue-500"
                }
              >
                Register
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default MainNav;
