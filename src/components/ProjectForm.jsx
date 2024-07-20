import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { updateModalInfo, updateToast } from "../features/generalSlice";
import { useDispatch } from "react-redux";
import { projectSchema } from "../validations/projectValidation";
import { addProject, updateProject } from "../services/user/project";
import Input from "./Input";

export default function ProjectForm({ isModalOpen, data, getData }) {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(projectSchema),
  });

  useEffect(() => {
    if (data) {
      reset({ ...data });
    } else {
      reset({ title: "", description: "" });
    }
  }, [isModalOpen]);

  const submitData = async (projectPayLoad) => {
    let response = null;
    if (!data) {
      response = await addProject(projectPayLoad);
    } else {
      response = await updateProject(projectPayLoad, data.id);
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
        updateModalInfo({
          isModalOpen: false,
          modalBody: null,
          toBeUpdate: null,
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
      <Input
        parentClassName="mt-4"
        inputType="text"
        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 require"
        inputId="title"
        inputName="title"
        labelClassName="block font-medium leading-6 text-gray-900 mb-2"
        label="Project Title"
        error={errors.title?.message}
        registerInput={register}
        isCompulsory={true}
      />
      <Input
        parentClassName="mt-4"
        inputType="text"
        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 require"
        inputId="description"
        inputName="description"
        labelClassName="block font-medium leading-6 text-gray-900 mb-2"
        label="Description"
        error={errors.description?.message}
        registerInput={register}
        isCompulsory={true}
      />

      <input
        type="submit"
        value={data ? "Update Project" : "Add Project"}
        className="text-center w-full text-white bg-gray-900 hover:bg-gray-800 rounded-full font-medium text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer"
      />
    </form>
  );
}
