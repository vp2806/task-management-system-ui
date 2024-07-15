import { useEffect, useState } from "react";
import AdminSideBar from "../../components/AdminSideBar";
import DataTable from "../../components/DataTable";
import Pagination from "../../components/Pagination";
import {
  deleteTaskCategory,
  getTaskCategories,
} from "../../services/admin/taskCategory";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { updateLoading } from "../../features/generalSlice";
import Toast from "../../components/Toast";
import Error from "../../components/Error";
import Input from "../../components/Input";
import { useDebouncedValue } from "../../hooks/useDebounce";
import { taskCategoryMapping } from "../../helpers/tableColumnMapping";
import Modal from "../../components/Modal";
import useServiceOperation from "../../hooks/useServiceOperation";

export default function TaskCategories() {
  const generalData = useSelector((state) => state.general);
  const { isLoading, error, toastInfo } = generalData;
  const dispatch = useDispatch();
  const recordPerPage = 3;

  const [pageNumber, setPageNumber] = useState(1);

  const [limitOfData, setlimitOfData] = useState({
    lowerLimitOfData: 0,
    upperLimitOfData: recordPerPage,
  });

  const [taskCategories, setTaskCategories] = useState({
    originalData: [],
    transformData: [],
    filteredData: [],
    searchData: [],
  });

  const [searchValue, setSearchValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toBeUpdate, setToBeUpdate] = useState(null);
  const debounceSearchValue = useDebouncedValue(searchValue, 500);
  const { getData, handleUpdate, handleDelete } = useServiceOperation();

  useEffect(() => {
    dispatch(
      updateLoading({
        isLoading: true,
        error: null,
      })
    );
    getData(
      getTaskCategories,
      taskCategoryMapping,
      ActionElements,
      limitOfData,
      setTaskCategories
    );
  }, []);

  useEffect(() => {
    if (debounceSearchValue !== "") {
      const newSearchData = taskCategories?.transformData.filter((data) => {
        if (
          data["Category Name"]
            .toLowerCase()
            .search(debounceSearchValue.toLowerCase()) !== -1
        ) {
          return true;
        }
        return false;
      });
      setTaskCategories({
        ...taskCategories,
        ["searchData"]: newSearchData,
        ["filteredData"]: newSearchData?.slice(0, recordPerPage),
      });
    } else {
      setTaskCategories({
        ...taskCategories,
        ["searchData"]: [],
        ["filteredData"]: taskCategories?.transformData?.slice(
          0,
          recordPerPage
        ),
      });
    }
  }, [debounceSearchValue]);

  useEffect(() => {
    if (debounceSearchValue === "") {
      setTaskCategories({
        ...taskCategories,
        ["filteredData"]: taskCategories?.transformData?.slice(
          limitOfData.lowerLimitOfData,
          limitOfData.upperLimitOfData
        ),
      });
    } else {
      setTaskCategories({
        ...taskCategories,
        ["filteredData"]: taskCategories?.searchData?.slice(
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
          className={"w-6 h-6 cursor-pointer"}
          onClick={() => {
            handleUpdate(setIsModalOpen, setToBeUpdate, {
              id: data.Id,
              categoryName: data["Category Name"],
            });
          }}
        >
          <svg
            className="w-6 h-6 text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="square"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h1m4-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm7.441 1.559a1.907 1.907 0 0 1 0 2.698l-6.069 6.069L10 19l.674-3.372 6.07-6.07a1.907 1.907 0 0 1 2.697 0Z"
            />
          </svg>
        </div>
        <div
          className={`w-6 h-6 ${
            isDelete ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={() => {
            if (!isDelete) {
              handleDelete(
                deleteTaskCategory,
                data.Id,
                setlimitOfData,
                setPageNumber,
                recordPerPage
              ).then((response) => {
                if (response) {
                  getData(
                    getTaskCategories,
                    taskCategoryMapping,
                    ActionElements,
                    limitOfData,
                    setTaskCategories
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
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        modalTitle={toBeUpdate ? "Update Task Category" : "Add Task Category"}
        data={toBeUpdate}
        setToBeUpdate={setToBeUpdate}
        setlimitOfData={setlimitOfData}
        setPageNumber={setPageNumber}
        recordPerPage={recordPerPage}
        getData={async () => {
          await getData(
            getTaskCategories,
            taskCategoryMapping,
            ActionElements,
            limitOfData,
            setTaskCategories
          );
        }}
      />
      <div className="p-14 mt-20 sm:ml-64">
        {!isLoading ? (
          !error && (
            <>
              {taskCategories.originalData.length === 0 ? (
                <h1 className="text-center text-2xl font-extrabold text-gray-700">
                  No Data Found
                </h1>
              ) : (
                <>
                  <div className="flex gap-4 justify-end items-center mb-6">
                    <Input
                      parentClassName=" w-64"
                      inputType="search"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 require"
                      inputId="searchUser"
                      inputName="searchUser"
                      registerInput={() => {}}
                      inputPlaceholder={"Search Category"}
                      handleChange={handleSearch}
                    />

                    <div
                      className="text-center w-44 text-white bg-gray-900 hover:bg-gray-800 rounded-full font-medium text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer"
                      onClick={() => {
                        setIsModalOpen(true);
                      }}
                    >
                      Add Task Category
                    </div>
                  </div>
                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <DataTable
                      id="userTable"
                      className="w-full text-base text-left text-gray-500 dark:text-gray-400"
                      columns={taskCategories?.transformData[0]}
                      data={taskCategories?.filteredData}
                    />
                  </div>
                  <Pagination
                    data={
                      debounceSearchValue !== ""
                        ? taskCategories.searchData
                        : taskCategories.originalData
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
