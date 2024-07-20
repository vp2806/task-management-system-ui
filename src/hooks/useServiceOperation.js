import Swal from "../helpers/swal";
import { useDispatch } from "react-redux";
import { updateToast } from "../features/generalSlice";
import { transformData } from "../helpers/transformData";
import { updateLoading } from "../features/generalSlice";

export default function useServiceOperation() {
  const dispatch = useDispatch();

  const getData = (
    getOperation,
    tableColumnMapping,
    actionElements,
    limitOfData,
    setData,
    columnValueMapping
  ) => {
    return new Promise((resolve) => {
      if (getOperation) {
        getOperation().then((data) => {
          if (Array.isArray(data)) {
            transformData(
              data,
              tableColumnMapping,
              actionElements,
              columnValueMapping
            ).then((response) => {
              dispatch(
                updateLoading({
                  isLoading: false,
                  error: null,
                })
              );
              if (limitOfData) {
                setData({
                  originalData: data,
                  transformData: response.transformedData,
                  filteredData: response.transformedData?.slice(
                    limitOfData.lowerLimitOfData,
                    limitOfData.upperLimitOfData
                  ),
                  searchData: [],
                });
              } else {
                setData({
                  originalData: data,
                  transformData: response.transformedData,
                });
              }
            });
          } else {
            dispatch(
              updateLoading({
                isLoading: false,
                error: data,
              })
            );
            return resolve(false);
          }
          return resolve(true);
        });
      }
    });
  };

  const handleUpdate = (setIsModalOpen, setToBeUpdate, data) => {
    if (setIsModalOpen) {
      setIsModalOpen(true);
    }

    if (setToBeUpdate) {
      setToBeUpdate(data);
    }
  };

  const handleDelete = (
    deleteOperation,
    deleteOperationId,
    setlimitOfData,
    setPageNumber,
    recordPerPage
  ) => {
    return new Promise((resolve) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await deleteOperation(deleteOperationId);
          if (
            response?.data?.response_type &&
            response.data.response_type !== "error"
          ) {
            dispatch(
              updateToast({
                type: "success",
                message: response.data.message,
                isShow: true,
              })
            );

            if (setlimitOfData) {
              setlimitOfData({
                lowerLimitOfData: 0,
                upperLimitOfData: recordPerPage,
              });
            }

            if (setPageNumber) {
              setPageNumber(1);
            }

            setTimeout(() => {
              dispatch(
                updateToast({
                  type: "success",
                  message: null,
                  isShow: false,
                })
              );
              return resolve(true);
            }, 1000);
          } else {
            dispatch(
              updateToast({
                type: "error",
                message: response?.data?.message || response,
                isShow: true,
              })
            );
            setTimeout(() => {
              dispatch(
                updateToast({
                  type: "error",
                  message: null,
                  isShow: false,
                })
              );
            }, 4000);

            return resolve(false);
          }
        }
      });
    });
  };

  return { getData, handleUpdate, handleDelete };
}
