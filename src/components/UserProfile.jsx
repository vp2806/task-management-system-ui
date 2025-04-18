import { updateModalInfo } from "../features/generalSlice";
import { useDispatch } from "react-redux";

export default function UserProfile({
  firstName,
  lastName,
  email,
  dob,
  contactNumber,
}) {
  const dispatch = useDispatch();

  return (
    <div className="w-[590px] p-6 mb-3 bg-white border border-gray-200 rounded-lg shadow">
      <div className="flex flex-col justify-between p-4 leading-normal">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-xl font-semibold tracking-tight text-gray-900">
            Personal Information
          </h1>
          <div
            onClick={() => {
              dispatch(
                updateModalInfo({
                  isModalOpen: true,
                  modalBody: "User Profile",
                  toBeUpdate: {
                    firstName,
                    lastName,
                    email,
                    dob,
                    contactNumber,
                  },
                })
              );
            }}
          >
            <svg
              className="w-8 h-8 text-gray-800 cursor-pointer"
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
          </div>
        </div>
        <div className="flex justify-between mb-3">
          <div className="text-lg font-normal tracking-tight text-gray-900">
            Full Name
          </div>
          <h5 className="text-lg font-normal tracking-tight text-gray-900">
            {firstName} {lastName}
          </h5>
        </div>
        <div className="flex justify-between mb-3">
          <div className="text-lg font-normal tracking-tight text-gray-900">
            Email
          </div>
          <h5 className="text-lg font-normal tracking-tight text-gray-900">
            {email}
          </h5>
        </div>
        <div className="flex justify-between mb-3">
          <div className="text-lg font-normal tracking-tight text-gray-900">
            Date of Birth
          </div>
          <h5 className="text-lg font-normal tracking-tight text-gray-900">
            {dob}
          </h5>
        </div>
        <div className="flex justify-between">
          <div className="text-lg font-normal tracking-tight text-gray-900">
            Contact Number
          </div>
          <h5 className="text-lg font-normal tracking-tight text-gray-900">
            {contactNumber}
          </h5>
        </div>
      </div>
    </div>
  );
}
