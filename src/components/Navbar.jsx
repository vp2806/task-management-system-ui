import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/task_manager_logo.png";
import userIcon from "../assets/user_icon.png";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export default function Navbar() {
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 z-40 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <div className="flex ms-2 md:me-24">
              <img src={logo} className="h-8 me-3" alt="FlowBite Logo" />
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                Task Manager
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center ms-3">
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src={userIcon}
                      className="h-12 w-12 rounded-full"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <Link
                      to="/admin/profile"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 cursor-pointer"
                    >
                      Your Profile
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <div
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 cursor-pointer"
                      onClick={logoutUser}
                    >
                      Logout
                    </div>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
