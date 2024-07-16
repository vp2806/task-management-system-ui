import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { updateToast } from "../features/generalSlice";
import { useDispatch } from "react-redux";
import { taskCategorySchema } from "../validations/taskCategoryValidation";
import {
  addTaskCategory,
  updateTaskCategory,
} from "../services/admin/taskCategory";
import Input from "./Input";

export default function TaskCategoryForm({
  isModalOpen,
  setIsModalOpen,
  data,
  setlimitOfData,
  recordPerPage,
  getData,
  setPageNumber,
  setToBeUpdate,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(taskCategorySchema),
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      reset({ ...data });
    } else {
      reset({ categoryName: "" });
    }
  }, [isModalOpen]);

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
      setToBeUpdate(null);

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
  );
}
