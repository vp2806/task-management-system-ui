import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

export default function UserSideBar() {
  const location = useLocation();

  const projects = [
    {
      id: 1,
      user_id: 6,
      title: "Health and Wellness Management System",
      description:
        "This is a updated desription of Health and Wellness Management System",
      created_at: "2024-07-08 19:53:21",
      updated_at: "2024-07-09 09:53:32",
      deleted_at: null,
    },
    {
      id: 2,
      user_id: 6,
      title: "Inventory Management system",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo facilis tempore, deleniti dignissimos quis veritatis, repudiandae doloremque qui nisi debitis neque earum, quae veniam voluptatum aut ea saepe cupiditate quia molestias corrupti ratione. Vitae.",
      created_at: "2024-07-09 10:16:20",
      updated_at: "2024-07-15 17:12:01",
      deleted_at: null,
    },
    {
      id: 3,
      user_id: 4,
      title: "Personal Finance Tracker",
      description: "This is a desription of Personal Finance Tracker",
      created_at: "2024-07-09 17:19:18",
      updated_at: "2024-07-09 17:19:18",
      deleted_at: null,
    },
  ];

  return (
    <>
      <Navbar />
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-30 w-72 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-4 font-medium mt-5">
            <li>
              <div
                className={`flex items-center justify-end mb-4 p-2 text-gray-900 rounded-lg dark:text-white  dark:hover:bg-gray-700 group`}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 20"
                >
                  <path d="M16 14V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2h-1v-2a2 2 0 0 0 2-2ZM4 2h2v12H4V2Zm8 16H3a1 1 0 0 1 0-2h9v2Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Projects</span>
                <svg
                  class="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 12h14m-7 7V5"
                  />
                </svg>
              </div>
            </li>

            {projects.map((project) => {
              return (
                <li>
                  <Link
                    to="/"
                    className={`flex items-center text-sm p-1 text-gray-900 rounded-lg dark:text-white  ${
                      location.pathname === "/admin/dashboard"
                        ? "bg-gray-700"
                        : ""
                    } dark:hover:bg-gray-700 group`}
                  >
                    <span className="ms-3">{project.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
}
