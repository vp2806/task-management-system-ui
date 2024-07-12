import { useEffect, useState } from "react";
import AdminSideBar from "../../components/AdminSideBar";
import DataTable from "../../components/DataTable";
import Pagination from "../../components/Pagination";
import { getUsers } from "../../services/admin/user";
import { transformData } from "../../helpers/transformData";
import Swal from "../../helpers/swal";
import Loader from "../../components/Loader";

export default function Users() {
  const recordPerPage = 10;
  const columnMapping = {
    id: "Id",
    first_name: "First Name",
    last_name: "Last Name",
    email: "Email",
    dob: "DOB",
    contact_number: "Contact Number",
    created_at: "Created At",
    deleted_at: "Deleted At",
  };

  const [limitOfData, setlimitOfData] = useState({
    lowerLimitOfData: 0,
    upperLimitOfData: recordPerPage,
  });

  const [users, setUsers] = useState({
    originalData: [],
    columns: [],
    transformData: [],
  });

  useEffect(() => {
    getUsers().then((data) => {
      if (Array.isArray(data)) {
        transformData(data, columnMapping, ActionElements, limitOfData).then(
          (response) => {
            setUsers({
              originalData: data,
              columns: response.columns,
              transformData: response.filteredData,
            });
          }
        );
      }
    });
  }, [limitOfData]);

  function handleDelete(userId) {
    console.log(userId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
      }
    });
  }

  function ActionElements(data) {
    return (
      <div className="flex items-center gap-4">
        <div
          className="w-6 h-6 cursor-pointer"
          onClick={() => {
            handleDelete(data.id);
          }}
        >
          <svg
            className="w-6 h-6 text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M5 8a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm-2 9a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1Zm13-6a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-4Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <>
      <AdminSideBar />
      <div className="p-14 mt-14 sm:ml-64">
        {users.columns.length > 0 && users.transformData.length > 0 ? (
          <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <DataTable
                id="userTable"
                className="w-full text-base text-left text-gray-500 dark:text-gray-400"
                columns={users.columns}
                data={users.transformData}
              />
            </div>
            <Pagination
              data={users.originalData}
              recordPerPage={recordPerPage}
              limitOfData={limitOfData}
              handleLimitOfData={setlimitOfData}
            />
          </>
        ) : (
          <Loader
            className={"flex items-center justify-center w-full rounded-lg p-5"}
          />
        )}
      </div>
    </>
  );
}
