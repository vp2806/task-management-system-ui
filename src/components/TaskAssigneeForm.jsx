import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateModalInfo, updateToast } from "../features/generalSlice";
import { useDispatch } from "react-redux";
import { userTaskAssigneeSchema } from "../validations/userTaskAssigneeValidation";
import Input from "./Input";
import { addTaskAssignee } from "../services/user/taskAssignee";

export default function TaskAssigneeForm() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userTaskAssigneeSchema),
  });

  const submitData = async (taskAssigneePayLoad) => {
    const response = await addTaskAssignee(taskAssigneePayLoad);

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
        inputId="assigneeFullName"
        inputName="assigneeFullName"
        labelClassName="block mb-2 text-sm font-medium text-gray-900"
        label="Task Assignee"
        error={errors?.assigneeFullName?.message}
        registerInput={register}
        isCompulsory={true}
      />

      <input
        type="submit"
        value="Add Task Assignee"
        className="text-center w-full text-white bg-gray-900 hover:bg-gray-800 rounded-full font-medium text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer"
      />
    </form>
  );
}
