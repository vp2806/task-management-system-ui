import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { updateToast } from "../features/generalSlice";
import { useDispatch } from "react-redux";
import { taskCategorySchema } from "../validations/task-category-validation";
import Input from "./Input";
import {
  addTaskCategory,
  updateTaskCategory,
} from "../services/admin/taskCategory";

export default function Modal({
  isModalOpen,
  setIsModalOpen,
  modalTitle,
  data,
  setToBeUpdate,
  setlimitOfData,
  recordPerPage,
  getData,
  setPageNumber,
}) {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(taskCategorySchema),
  });

  useEffect(() => {
    if (data) {
      reset({ ...data });
    } else {
      reset({ categoryName: "" });
    }
  }, [isModalOpen]);

  const closeModal = () => {
    setIsModalOpen(false);
    if (data) {
      setToBeUpdate(null);
    }
  };

  const submitData = async (categoryPayLoad) => {
    let response = null;
    if (!data) {
      response = await addTaskCategory(categoryPayLoad);
    } else {
      response = await updateTaskCategory(categoryPayLoad, data.id);
    }

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
      setIsModalOpen(false);

      if (getData) {
        await getData();
      }

      setlimitOfData({
        lowerLimitOfData: 0,
        upperLimitOfData: recordPerPage,
      });

      setPageNumber(1);

      setTimeout(() => {
        dispatch(
          updateToast({
            type: "success",
            message: null,
            isShow: false,
          })
        );
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
    }
  };

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className={`${
        isModalOpen ? "" : "hidden"
      } fixed inset-0 z-[49] grid h-screen w-screen place-items-center bg-black bg-opacity-60 transition-opacity overflow-y-auto`}
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 ">
              {modalTitle}
            </h3>
            <div
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal"
              onClick={closeModal}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </div>
          </div>
          <div className="p-4 md:p-5 mt-4">
            <form className="space-y-6" onSubmit={handleSubmit(submitData)}>
              <Input
                parentClassName="mt-4"
                inputType="text"
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 require"
                inputId="categoryName"
                inputName="categoryName"
                labelClassName="block font-medium leading-6 text-gray-900 mb-2"
                label="Category Name"
                error={errors.categoryName?.message}
                registerInput={register}
                isCompulsory={true}
              />

              <input
                type="submit"
                value={data ? "Update" : "Add"}
                className="text-center w-full text-white bg-gray-900 hover:bg-gray-800 rounded-full font-medium text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
