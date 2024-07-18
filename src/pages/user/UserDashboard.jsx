import { useSelector } from "react-redux";
import UserSideBar from "../../components/UserSideBar";
import Loader from "../../components/Loader";

export default function UserDashboard() {
  const generalData = useSelector((state) => state.general);
  const { isLoading } = generalData;

  return (
    <>
      <UserSideBar />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="pt-16 px-16 mt-12 sm:ml-72">
          <div className="block w-full p-6 mb-10 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
            <div className="flex justify-between items-center mb-2">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                Project Title | Sample Project
              </h5>
              <div className="flex justify-end items-center">
                <svg
                  className="w-8 h-8 text-gray-800"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
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
                  className="w-8 h-8 text-gray-800"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
              repellat assumenda soluta mollitia inventore, impedit vero
              voluptate expedita, praesentium qui asperiores obcaecati quam.
              Odit temporibus doloribus ad eveniet, ab repellendus commodi impe.
            </p>
            <p className="font-normal mb-2 text-gray-700 ">
              <span>Created At: {""}</span>
              <span className="font-bold">{new Date().toLocaleString()}</span>
            </p>
            <p className="font-normal mb-2 text-gray-700 ">
              <span>Updated At: {""}</span>
              <span className="font-bold">{new Date().toLocaleString()}</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
