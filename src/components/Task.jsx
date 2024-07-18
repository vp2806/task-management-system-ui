import { useDispatch, useSelector } from "react-redux";
import { updateDrawerInfo } from "../features/generalSlice";
import useServiceOperation from "../hooks/useServiceOperation";
import { deleteTask } from "../services/user/projectTask";

export default function Task({ getData }) {
  const generalData = useSelector((state) => state.general);
  const { drawerInfo } = generalData;
  const dispatch = useDispatch();

  const { handleDelete } = useServiceOperation();

  return (
    <>
      <div className="p-8">
        <div className="flex justify-between items-center">
          <h5 className="text-2xl font-bold tracking-tight text-white  dark:text-gray-900">
            {drawerInfo?.toBeView?.title}
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
                  updateDrawerInfo({
                    isDrawerOpen: true,
                    isView: false,
                    toBeUpdate: {
                      id: drawerInfo?.toBeView?.id,
                      taskCategory: drawerInfo?.toBeView?.taskCategory,
                      title: drawerInfo?.toBeView?.title,
                      description: drawerInfo?.toBeView?.description,
                      dueDate: drawerInfo?.toBeView?.dueDate.split(" ")[0],
                      dueTime: drawerInfo?.toBeView?.dueDate
                        .split(" ")
                        .pop()
                        .slice(0, 5),
                      priorityLevel:
                        drawerInfo?.toBeView?.priorityLevel === 0
                          ? "Low"
                          : drawerInfo?.toBeView?.priorityLevel === 1
                          ? "Medium"
                          : "High",
                      taskStatus:
                        drawerInfo?.toBeView?.taskStatus === 0
                          ? "To Do"
                          : drawerInfo?.toBeView?.taskStatus === 1
                          ? "In Progress"
                          : "Done",
                      taskDocuments: drawerInfo?.toBeView?.taskDocuments,
                    },
                    toBeView: null,
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
                  deleteTask,
                  drawerInfo?.toBeView?.id,
                  null,
                  null,
                  null
                ).then(async (response) => {
                  if (response) {
                    dispatch(
                      updateDrawerInfo({
                        isDrawerOpen: false,
                        isView: false,
                        toBeUpdate: null,
                        toBeView: null,
                      })
                    );
                    await getData();
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

        <div className="flex gap-3 font-normal text-gray-700 dark:text-gray-800 mt-5">
          <svg
            className="w-6 h-6 text-gray-800 hover: place"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M4.857 3A1.857 1.857 0 0 0 3 4.857v4.286C3 10.169 3.831 11 4.857 11h4.286A1.857 1.857 0 0 0 11 9.143V4.857A1.857 1.857 0 0 0 9.143 3H4.857Zm10 0A1.857 1.857 0 0 0 13 4.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 21 9.143V4.857A1.857 1.857 0 0 0 19.143 3h-4.286Zm-10 10A1.857 1.857 0 0 0 3 14.857v4.286C3 20.169 3.831 21 4.857 21h4.286A1.857 1.857 0 0 0 11 19.143v-4.286A1.857 1.857 0 0 0 9.143 13H4.857Zm10 0A1.857 1.857 0 0 0 13 14.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 21 19.143v-4.286A1.857 1.857 0 0 0 19.143 13h-4.286Z"
              clipRule="evenodd"
            />
          </svg>

          <span>{drawerInfo?.toBeView?.taskCategory}</span>
        </div>

        <div className="flex gap-3 font-normal text-gray-700 dark:text-gray-800 mt-5">
          <svg
            className="w-6 h-6text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
            />
          </svg>
          <span>{drawerInfo?.toBeView?.dueDate}</span>
        </div>

        <div className="font-normal text-gray-700 dark:text-gray-800 text-justify mt-5">
          Status:{" "}
          <span className="font-bold">
            {drawerInfo?.toBeView?.taskStatus === 0
              ? "To Do"
              : drawerInfo?.toBeView?.taskStatus === 1
              ? "In Progress"
              : "Done"}
          </span>
        </div>

        <div className="font-normal text-gray-700 dark:text-gray-800 text-justify mt-5">
          Priority Level:{" "}
          <span className="font-bold">
            {drawerInfo?.toBeView?.priorityLevel === 0
              ? "Low"
              : drawerInfo?.toBeView?.priorityLevel === 1
              ? "Medium"
              : "High"}
          </span>
        </div>

        <div className="flex items-center gap-3 flex-wrap font-normal text-gray-700 dark:text-gray-800 mt-5">
          Assigned To:{" "}
          {drawerInfo?.toBeView?.assigneeName.map((assignee, index) => {
            return (
              <span
                key={index}
                className="font-bold bg-purple-100 text-purple-900 text-sm me-2 px-3.5 py-1.5 rounded-full"
              >
                {assignee.assignee_name}
              </span>
            );
          })}
        </div>

        <div className="font-normal text-gray-700 dark:text-gray-800 mt-5">
          Created At:{" "}
          <span className="font-bold bg-blue-100 text-blue-800 text-sm me-2 px-3.5 py-1.5 rounded-full">
            {drawerInfo?.toBeView?.createdAt}
          </span>
        </div>

        <div className="font-normal text-gray-700 dark:text-gray-800 mt-5">
          Updated At:{" "}
          <span className="font-bold  bg-blue-100 text-blue-800 text-sm me-2 px-3.5 py-1.5 rounded-full">
            {drawerInfo?.toBeView?.updatedAt}
          </span>
        </div>

        <div className="font-normal text-gray-700 dark:text-gray-800 text-justify mt-5">
          {drawerInfo?.toBeView?.description}
        </div>
      </div>
      {drawerInfo?.toBeView?.taskDocuments.map((document) => {
        if (document.document_type === 0) {
          return (
            <img
              key={document.id}
              src={document.document_url}
              alt="Task Image"
              className="max-w-[650px] max-h-[300px] object-cover rounded-lg ml-auto mr-auto mb-20"
            />
          );
        }

        if (document.document_type === 1) {
          return (
            <div
              className="flex flex-col items-center justify-center mb-20"
              key={document.id}
            >
              <div className="w-[650px] h-[370px] object-cover rounded-lg ml-auto mr-auto">
                <video className="w-full h-full" controls>
                  <source src={document.document_url} type="video/mp4" />
                </video>
              </div>
            </div>
          );
        }

        if (document.document_type === 2) {
          return (
            <div
              className="flex flex-col items-center justify-center mb-20"
              key={document.id}
            >
              <div className="w-[650px] h-[500px] object-cover rounded-lg ml-auto mr-auto">
                <iframe
                  src={document.document_url}
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          );
        }
      })}
    </>
  );
}
