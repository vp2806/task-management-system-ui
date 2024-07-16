import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { updateModalInfo, updateToast } from "../features/generalSlice";
import { useDispatch, useSelector } from "react-redux";
import { taskSchema } from "../validations/taskValidation";
import {
  addProjectTask,
  updateProjectTask,
} from "../services/user/projectTask";
import Input from "./Input";
import InputSelect from "./Select";
import DataList from "./DataList";

export default function ProjectTaskForm({ data, getData, taskCategory }) {
  const generalData = useSelector((state) => state.general);
  const { modalInfo, drawerInfo } = generalData;
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(taskSchema),
  });

  useEffect(() => {
    if (data) {
      reset({ ...data });
    } else {
      reset({
        taskCategory: "",
        title: "",
        description: "",
        dueDate: "",
        dueTime: "",
        assigneeName: "",
        priorityLevel: "",
      });
    }
  }, [drawerInfo.isDrawerOpen]);

  const submitData = async (projectPayLoad) => {
    let response = null;
    if (!data) {
      response = await addProjectTask(projectPayLoad);
    } else {
      response = await updateProjectTask(projectPayLoad, data.id);
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

      dispatch(updateModalInfo({ isModalOpen: false, toBeUpdate: null }));

      if (getData) {
        await getData();
      }

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

  console.log(errors);

  return (
    <form className="space-y-6" onSubmit={handleSubmit(submitData)}>
      <InputSelect
        selectClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 require"
        selectName="taskCategory"
        labelClassName="block mb-2 text-sm font-medium text-gray-900"
        label="Category"
        selectOptions={taskCategory}
        error={errors?.taskCategory?.message}
        isCompulsory={true}
        registerInput={register}
      />
      <Input
        parentClassName="mt-4"
        inputType="text"
        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 require"
        inputId="title"
        inputName="title"
        labelClassName="block mb-2 text-sm font-medium text-gray-900"
        label="Task Title"
        error={errors?.title?.message}
        registerInput={register}
        isCompulsory={true}
      />
      <Input
        parentClassName="mt-4"
        inputType="text"
        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 require"
        inputId="description"
        inputName="description"
        labelClassName="block mb-2 text-sm font-medium text-gray-900"
        label="Description"
        error={errors?.description?.message}
        registerInput={register}
        isCompulsory={true}
      />
      <Input
        parentClassName="mt-2"
        inputType="date"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 require"
        inputId="dueDate"
        inputName="dueDate"
        labelClassName="block mb-2 text-sm font-medium text-gray-900"
        label="Due Date"
        error={errors?.dueDate?.message}
        registerInput={register}
        minDate={new Date().toISOString().slice(0, 10)}
        isCompulsory={true}
        isOnClick={true}
      />
      <Input
        parentClassName="mt-2"
        inputType="time"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 require"
        inputId="dueTime"
        inputName="dueTime"
        labelClassName="block mb-2 text-sm font-medium text-gray-900"
        label="Due Time"
        error={errors?.dueTime?.message}
        registerInput={register}
        isCompulsory={true}
        isOnClick={true}
      />
      <Input
        parentClassName="mt-2"
        inputType="text"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 require"
        inputId="assigneeName"
        inputName="assigneeName"
        list="assigneeNames"
        labelClassName="block mb-2 text-sm font-medium text-gray-900"
        label="Assignee Name"
        error={errors?.assigneeName?.message}
        registerInput={register}
        isCompulsory={true}
      />
      <DataList
        datalistId="assigneeNames"
        datalistOptions={[{ value: "Vivek" }]}
      />
      <InputSelect
        selectClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 require"
        selectName="priorityLevel"
        labelClassName="block mb-2 text-sm font-medium text-gray-900"
        label="Priority Level"
        selectOptions={[{ key: "Select Priority Level", value: "" }]}
        error={errors?.priorityLevel?.message}
        isCompulsory={true}
        registerInput={register}
      />
      <Input
        parentClassName="mt-4"
        inputType="file"
        className="block w-full min-h-10 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 "
        inputId="taskDocument"
        inputName="taskDocument"
        labelClassName="block mb-2 text-sm font-medium text-gray-900"
        label="Document"
        error={errors?.taskDocument?.message}
        registerInput={register}
        isAccept={".jpg, .jpeg, .png, .pdf, .mp4"}
      />

      <input
        type="submit"
        value={data ? "Update Task" : "Add Task"}
        className="text-center w-full text-white bg-gray-900 hover:bg-gray-800 rounded-full font-medium text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer"
      />
    </form>
  );
}
