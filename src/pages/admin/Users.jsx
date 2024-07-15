import { useEffect, useState } from "react";
import AdminSideBar from "../../components/AdminSideBar";
import DataTable from "../../components/DataTable";
import Pagination from "../../components/Pagination";
import { getUsers, deleteUser } from "../../services/admin/user";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { updateLoading, updateToast } from "../../features/generalSlice";
import Toast from "../../components/Toast";
import Error from "../../components/Error";
import Input from "../../components/Input";
import { useDebouncedValue } from "../../hooks/useDebounce";
import {
  userColumnValueMapping,
  userMapping,
} from "../../helpers/tableColumnMapping";
import useServiceOperation from "../../hooks/useServiceOperation";

export default function Users() {
  const generalData = useSelector((state) => state.general);
  const { isLoading, error, toastInfo } = generalData;
  const dispatch = useDispatch();
  const recordPerPage = 10;

  const [pageNumber, setPageNumber] = useState(1);

  const [limitOfData, setlimitOfData] = useState({
    lowerLimitOfData: 0,
    upperLimitOfData: recordPerPage,
  });

  const [users, setUsers] = useState({
    originalData: [],
    transformData: [],
    filteredData: [],
    searchData: [],
  });

  const [searchValue, setSearchValue] = useState("");
  const debounceSearchValue = useDebouncedValue(searchValue, 500);
  const { getData, handleDelete } = useServiceOperation();

  useEffect(() => {
    dispatch(
      updateLoading({
        isLoading: true,
        error: null,
      })
    );
    getData(
      getUsers,
      userMapping,
      ActionElements,
      limitOfData,
      setUsers,
      userColumnValueMapping
    );
  }, []);

  useEffect(() => {
    if (debounceSearchValue !== "") {
      const newSearchData = users?.transformData.filter((data) => {
        if (
          data["First Name"]
            .toLowerCase()
            .search(debounceSearchValue.toLowerCase()) !== -1 ||
          data["Last Name"]
            .toLowerCase()
            .search(debounceSearchValue.toLowerCase()) !== -1
        ) {
          return true;
        }
        return false;
      });
      setUsers({
        ...users,
        ["searchData"]: newSearchData,
        ["filteredData"]: newSearchData?.slice(0, recordPerPage),
      });
    } else {
      setUsers({
        ...users,
        ["searchData"]: [],
        ["filteredData"]: users?.transformData?.slice(0, recordPerPage),
      });
    }
  }, [debounceSearchValue]);

  useEffect(() => {
    if (debounceSearchValue === "") {
      setUsers({
        ...users,
        ["filteredData"]: users?.transformData?.slice(
          limitOfData.lowerLimitOfData,
          limitOfData.upperLimitOfData
        ),
      });
    } else {
      setUsers({
        ...users,
        ["filteredData"]: users?.searchData?.slice(
          limitOfData.lowerLimitOfData,
          limitOfData.upperLimitOfData
        ),
      });
    }
  }, [limitOfData]);

  function ActionElements(data, isDelete) {
    return (
      <div className="flex items-center gap-4">
        <div
          className={`w-6 h-6 ${
            isDelete ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={() => {
            if (!isDelete) {
              handleDelete(
                deleteUser,
                data.Id,
                setlimitOfData,
                setPageNumber,
                recordPerPage
              ).then((response) => {
                if (response) {
                  getData(
                    getUsers,
                    userMapping,
                    ActionElements,
                    limitOfData,
                    setUsers,
                    userColumnValueMapping
                  );
                }
              });
            }
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

  function handleSearch(event) {
    setSearchValue(event.target.value.trim());
  }

  return (
    <>
      <AdminSideBar />
      <Toast
        toastId="userToast"
        isShow={toastInfo.isShow}
        type={toastInfo.type}
        message={toastInfo.message}
      />
      <div className="p-14 mt-20 sm:ml-64">
        {!isLoading ? (
          !error && (
            <>
              {users.originalData.length === 0 ? (
                <h1 className="text-center text-2xl font-extrabold text-gray-700">
                  No Data Found
                </h1>
              ) : (
                <>
                  <div className="flex justify-end">
                    <Input
                      parentClassName="mb-6 w-64"
                      inputType="search"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 require"
                      inputId="searchUser"
                      inputName="searchUser"
                      registerInput={() => {}}
                      inputPlaceholder={"Search User by Name"}
                      handleChange={handleSearch}
                    />
                  </div>
                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <DataTable
                      id="userTable"
                      className="w-full text-base text-left text-gray-500 dark:text-gray-400"
                      columns={users?.transformData[0]}
                      data={users?.filteredData}
                    />
                  </div>
                  <Pagination
                    data={
                      debounceSearchValue !== ""
                        ? users.searchData
                        : users.originalData
                    }
                    recordPerPage={recordPerPage}
                    limitOfData={limitOfData}
                    handleLimitOfData={setlimitOfData}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                  />
                </>
              )}
            </>
          )
        ) : (
          <Loader
            className={"flex items-center justify-center w-full rounded-lg p-5"}
          />
        )}
        {error && <Error error={error} />}
      </div>
    </>
  );
}
