import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { updateModalInfo, updateLoading } from "../features/generalSlice";
import Modal from "./Modal";
import ProjectForm from "./ProjectForm";
import Toast from "./Toast";
import { useEffect, useState } from "react";
import useServiceOperation from "../hooks/useServiceOperation";
import { getProjects, deleteProject } from "../services/user/project";
import { userProjectMapping } from "../helpers/tableColumnMapping";
import Loader from "./Loader";
import TaskAssigneeForm from "./TaskAssigneeForm";

export default function UserSideBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const generalData = useSelector((state) => state.general);
  const { modalInfo, toastInfo, isLoading, error } = generalData;
  const dispatch = useDispatch();
  const params = useParams();

  const { getData, handleDelete } = useServiceOperation();

  const [projects, setProjects] = useState({
    originalData: [],
    transformData: [],
  });

  const currentProject = projects?.transformData?.filter((project) => {
    return project.ProjectUniqueId === params.projectId;
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
        modalTitle={
          modalInfo.modalBody === "Task Assignee"
            ? "Task Assignee"
            : modalInfo.toBeUpdate
            ? "Update Project"
            : "Add Project"
        }
        renderModalBody={() => {
          if (modalInfo.modalBody === "Project") {
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
          }

          if (modalInfo.modalBody === "Task Assignee") {
            return <TaskAssigneeForm />;
          }
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
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="flex-1 ms-3 whitespace-nowrap">
                  Task Assignee
                </span>
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
                        modalBody: "Task Assignee",
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
                        modalBody: "Project",
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
      {isLoading ? (
        <Loader
          className={"flex items-center justify-center w-full rounded-lg p-5"}
        />
      ) : projects?.transformData?.length > 0 &&
        location.pathname !== "/dashboard" ? (
        <div className="pt-16 px-16 mt-12 sm:ml-72">
          <div className="block w-full p-6 mb-10 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
            <div className="flex justify-between items-center mb-2">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                {currentProject[0]?.Title}
              </h5>
              <div className="flex justify-end items-center">
                <svg
                  className="w-8 h-8 text-gray-800 cursor-pointer"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  onClick={() => {
                    dispatch(
                      updateModalInfo({
                        isModalOpen: true,
                        modalBody: "Project",
                        toBeUpdate: {
                          id: currentProject[0]?.ProjectUniqueId,
                          title: currentProject[0]?.Title,
                          description: currentProject[0]?.Description,
                        },
                      })
                    );
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  className="w-8 h-8 text-gray-800 cursor-pointer"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  onClick={() => {
                    handleDelete(
                      deleteProject,
                      currentProject[0]?.ProjectUniqueId,
                      null,
                      null,
                      null
                    ).then(async (response) => {
                      if (response) {
                        navigate("/dashboard");
                      }
                    });
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <p className="font-normal mb-2 text-gray-700 ">
              {currentProject[0]?.Description}
            </p>
            <p className="font-normal mb-2 text-gray-700 ">
              <span>Created At: {""}</span>
              <span className="font-bold">
                {currentProject[0]?.["Created At"]}
              </span>
            </p>
            <p className="font-normal mb-2 text-gray-700 ">
              <span>Updated At: {""}</span>
              <span className="font-bold">
                {currentProject[0]?.["Updated At"]}
              </span>
            </p>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
