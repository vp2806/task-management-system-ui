import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { updateDrawerInfo, updateToast } from "../features/generalSlice";
import { useDispatch, useSelector } from "react-redux";
import { taskSchema, updateTaskSchema } from "../validations/taskValidation";
import {
  addProjectTask,
  deleteTaskDocument,
  updateProjectTask,
} from "../services/user/projectTask";
import Input from "./Input";
import InputSelect from "./Select";
import { useParams } from "react-router-dom";
import { priorityLevelOptions, taskStatusOptions } from "../helpers/data";
import useServiceOperation from "../hooks/useServiceOperation";

export default function ProjectTaskForm({
  data,
  getData,
  taskCategory,
  taskAssignees,
}) {
  const generalData = useSelector((state) => state.general);
  const { drawerInfo } = generalData;
  const dispatch = useDispatch();
  const params = useParams();
  const { handleDelete } = useServiceOperation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(data ? updateTaskSchema : taskSchema),
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
    const formData = new FormData();
    Object.keys(projectPayLoad).forEach((key) => {
      if (key === "assigneeName") {
        formData.append(key, JSON.stringify(projectPayLoad[key]));
      } else if (key === "taskDocument") {
        const files = [...projectPayLoad[key]];
        files.forEach((file) => {
          formData.append(key, file);
        });
      } else {
        formData.append(key, projectPayLoad[key]);
      }
    });

    formData.append("projectId", params.projectId);
    if (!data) {
      response = await addProjectTask(formData);
    } else {
      response = await updateProjectTask(formData, data.id);
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

      dispatch(
        updateDrawerInfo({
          isDrawerOpen: false,
          isView: false,
          toBeUpdate: null,
          toBeView: null,
        })
      );

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

      {!drawerInfo.toBeUpdate && (
        <InputSelect
          selectClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 require"
          selectName="assigneeName"
          labelClassName="block mb-2 text-sm font-medium text-gray-900"
          label="Assignee"
          selectOptions={taskAssignees}
          error={
            errors?.assigneeName?.message ||
            errors?.assigneeName?.assigneeName?.message
          }
          isCompulsory={true}
          registerInput={register}
          isMultiple={true}
        />
      )}

      <InputSelect
        selectClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 require"
        selectName="priorityLevel"
        labelClassName="block mb-2 text-sm font-medium text-gray-900"
        label="Priority Level"
        selectOptions={priorityLevelOptions}
        error={errors?.priorityLevel?.message}
        isCompulsory={true}
        registerInput={register}
      />

      {drawerInfo.toBeUpdate && (
        <InputSelect
          selectClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 require"
          selectName="taskStatus"
          labelClassName="block mb-2 text-sm font-medium text-gray-900"
          label="Task Status"
          selectOptions={taskStatusOptions}
          error={errors?.taskStatus?.message}
          isCompulsory={true}
          registerInput={register}
        />
      )}

      <Input
        parentClassName="mt-4"
        inputType="file"
        className="block w-full min-h-10 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 "
        inputId="taskDocument"
        inputName="taskDocument"
        labelClassName="block mb-2 text-sm font-medium text-gray-900"
        label="Document"
        error={
          errors?.taskDocument?.message ||
          errors?.taskDocument?.taskDocument?.message
        }
        registerInput={register}
        isAccept={".jpg, .jpeg, .png, .pdf, .mp4"}
        isMultiple={true}
      />
      {console.log(drawerInfo?.toBeView, ">>>>")}
      {drawerInfo.toBeUpdate && (
        <>
          {drawerInfo?.toBeUpdate?.taskDocuments.map((document) => {
            if (document.document_type === 0) {
              return (
                <div className="flex justify-end items-start">
                  <img
                    key={document.id}
                    src={document.document_url}
                    alt="Task Image"
                    className="max-w-[650px] max-h-[300px] object-cover rounded-lg ml-auto mr-auto mb-20"
                  ></img>
                  <svg
                    class="w-6 h-6 text-gray-800 cursor-pointer"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    onClick={() => {
                      handleDelete(
                        deleteTaskDocument,
                        document.id,
                        null,
                        null,
                        null
                      );
                    }}
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18 17.94 6M18 18 6.06 6"
                    />
                  </svg>
                </div>
              );
            }

            if (document.document_type === 1) {
              return (
                <div
                  className="flex flex-col items-center justify-center mb-20"
                  key={document.id}
                >
                  <div className="w-[650px] h-[370px] object-cover rounded-lg ml-auto mr-auto">
                    <video className="w-full h-full" controls>
                      <source src={document.document_url} type="video/mp4" />
                    </video>
                  </div>
                </div>
              );
            }

            if (document.document_type === 2) {
              return (
                <div
                  className="flex flex-col items-center justify-center mb-20"
                  key={document.id}
                >
                  <div className="w-[650px] h-[500px] object-cover rounded-lg ml-auto mr-auto">
                    <iframe
                      src={document.document_url}
                      className="w-full h-full"
                    ></iframe>
                  </div>
                </div>
              );
            }
          })}
        </>
      )}
      <input
        type="submit"
        value={data ? "Update Task" : "Add Task"}
        className="text-center w-full text-white bg-gray-900 hover:bg-gray-800 rounded-full font-medium text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer"
      />
    </form>
  );
}
