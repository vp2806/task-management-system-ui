import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { updateModalInfo, updateLoading } from "../features/generalSlice";
import Modal from "./Modal";
import ProjectForm from "./ProjectForm";
import Toast from "./Toast";
import { useEffect, useState } from "react";
import useServiceOperation from "../hooks/useServiceOperation";
import { getProjects } from "../services/user/project";
import { userProjectMapping } from "../helpers/tableColumnMapping";
import Loader from "./Loader";

export default function UserSideBar() {
  const location = useLocation();
  const generalData = useSelector((state) => state.general);
  const { modalInfo, toastInfo, isLoading, error } = generalData;
  const dispatch = useDispatch();

  const { getData } = useServiceOperation();

  const [projects, setProjects] = useState({
    originalData: [],
    transformData: [],
  });

  useEffect(() => {
    dispatch(
      updateLoading({
        isLoading: true,
        error: null,
      })
    );
    getData(getProjects, userProjectMapping, null, null, setProjects, null);
  }, []);

  return (
    <>
      <Toast
        toastId="userToast"
        isShow={toastInfo.isShow}
        type={toastInfo.type}
        message={toastInfo.message}
      />
      <Modal
        isModalOpen={modalInfo.isModalOpen}
        modalTitle={modalInfo.toBeUpdate ? "Update Project" : "Add Project"}
        renderModalBody={() => {
          return (
            <ProjectForm
              isModalOpen={modalInfo.isModalOpen}
              data={modalInfo.toBeUpdate}
              getData={async () => {
                await getData(
                  getProjects,
                  userProjectMapping,
                  null,
                  null,
                  setProjects,
                  null
                );
              }}
            />
          );
        }}
      />
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
                  className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  onClick={() => {
                    dispatch(
                      updateModalInfo({
                        isModalOpen: true,
                        toBeUpdate: null,
                      })
                    );
                  }}
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h14m-7 7V5"
                  />
                </svg>
              </div>
            </li>

            {isLoading ? (
              <Loader
                className={
                  "flex items-center justify-center w-full rounded-lg p-5"
                }
              />
            ) : (
              (projects?.transformData?.length === 0 && (
                <li key={"noProjectFound"}>
                  <div
                    className={`flex items-center text-sm p-1 text-gray-900 rounded-lg dark:text-white  ${
                      location.pathname === "/admin/dashboard"
                        ? "bg-gray-700"
                        : ""
                    } dark:hover:bg-gray-700 group`}
                  >
                    <span className="ms-3">No Project Found</span>
                  </div>
                </li>
              )) ||
              (projects?.transformData?.length > 0 &&
                projects?.transformData?.map((project) => {
                  return (
                    <li key={project.Id}>
                      <Link
                        to={`/project/${project.ProjectUniqueId}`}
                        className={`flex items-center text-sm p-1 text-gray-900 rounded-lg dark:text-white  ${
                          location.pathname ===
                          `/project/${project.ProjectUniqueId}`
                            ? "bg-gray-700"
                            : ""
                        } dark:hover:bg-gray-700 group`}
                      >
                        <span className="ms-3">{project.Title}</span>
                      </Link>
                    </li>
                  );
                }))
            )}
          </ul>
        </div>
      </aside>
    </>
  );
}
