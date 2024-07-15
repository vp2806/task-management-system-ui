import AdminSideBar from "../../components/AdminSideBar";
import DataTable from "../../components/DataTable";
import Pagination from "../../components/Pagination";
import Loader from "../../components/Loader";
import Toast from "../../components/Toast";
import Error from "../../components/Error";
import Input from "../../components/Input";
import { useDispatch, useSelector } from "react-redux";
import { updateLoading } from "../../features/generalSlice";
import { useDebouncedValue } from "../../hooks/useDebounce";
import { useState, useEffect } from "react";
import useServiceOperation from "../../hooks/useServiceOperation";
import { getUserProjects } from "../../services/admin/userProjects";
import { userProjectMapping } from "../../helpers/tableColumnMapping";

export default function Projects() {
  const generalData = useSelector((state) => state.general);
  const { isLoading, error, toastInfo } = generalData;
  const dispatch = useDispatch();
  const recordPerPage = 10;

  const [pageNumber, setPageNumber] = useState(1);

  const [limitOfData, setlimitOfData] = useState({
    lowerLimitOfData: 0,
    upperLimitOfData: recordPerPage,
  });

  const [userProjects, setUserProjects] = useState({
    originalData: [],
    transformData: [],
    filteredData: [],
    searchData: [],
  });

  const [searchValue, setSearchValue] = useState("");
  const debounceSearchValue = useDebouncedValue(searchValue, 500);
  const { getData } = useServiceOperation();

  useEffect(() => {
    dispatch(
      updateLoading({
        isLoading: true,
        error: null,
      })
    );
    getData(
      getUserProjects,
      userProjectMapping,
      null,
      limitOfData,
      setUserProjects,
      null
    );
  }, []);

  useEffect(() => {
    if (debounceSearchValue !== "") {
      const newSearchData = userProjects?.transformData.filter((data) => {
        if (
          data["Title"]
            .toLowerCase()
            .search(debounceSearchValue.toLowerCase()) !== -1
        ) {
          return true;
        }
        return false;
      });
      setUserProjects({
        ...userProjects,
        ["searchData"]: newSearchData,
        ["filteredData"]: newSearchData?.slice(0, recordPerPage),
      });
    } else {
      setUserProjects({
        ...userProjects,
        ["searchData"]: [],
        ["filteredData"]: userProjects?.transformData?.slice(0, recordPerPage),
      });
    }
  }, [debounceSearchValue]);

  useEffect(() => {
    if (debounceSearchValue === "") {
      setUserProjects({
        ...userProjects,
        ["filteredData"]: userProjects?.transformData?.slice(
          limitOfData.lowerLimitOfData,
          limitOfData.upperLimitOfData
        ),
      });
    } else {
      setUserProjects({
        ...userProjects,
        ["filteredData"]: userProjects?.searchData?.slice(
          limitOfData.lowerLimitOfData,
          limitOfData.upperLimitOfData
        ),
      });
    }
  }, [limitOfData]);

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
              {userProjects.originalData.length === 0 ? (
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
                      inputId="searchProject"
                      inputName="searchProject"
                      registerInput={() => {}}
                      inputPlaceholder={"Search Project by Title"}
                      handleChange={handleSearch}
                    />
                  </div>
                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <DataTable
                      id="userProjectTable"
                      className="w-full text-base text-left text-gray-500 dark:text-gray-400"
                      columns={userProjects?.transformData[0]}
                      data={userProjects?.filteredData}
                    />
                  </div>
                  <Pagination
                    data={
                      debounceSearchValue !== ""
                        ? userProjects.searchData
                        : userProjects.originalData
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
