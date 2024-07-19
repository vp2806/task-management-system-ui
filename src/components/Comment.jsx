import InputTextArea from "./InputTextArea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProjectTaskComment } from "../services/user/projectTask";
import { taskCommentSchema } from "../validations/taskValidation";
import { useDispatch, useSelector } from "react-redux";
import { updateDrawerInfo, updateToast } from "../features/generalSlice";

export default function Comment({ taskId, taskComment }) {
  const generalData = useSelector((state) => state.general);
  const { drawerInfo } = generalData;
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskCommentSchema),
  });

  const submitData = async (taskCommentPayLoad) => {
    taskCommentPayLoad.taskId = taskId.toString();
    console.log(taskCommentPayLoad);
    const response = await addProjectTaskComment(taskCommentPayLoad);
    if (
      response?.data?.response_type &&
      response.data.response_type !== "error"
    ) {
      reset();
      dispatch(
        updateDrawerInfo({
          ...drawerInfo,
          ["toBeView"]: {
            ...drawerInfo.toBeView,
            ["taskComments"]: [
              ...drawerInfo.toBeView.taskComments,
              response?.data?.data,
            ],
          },
        })
      );
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
    <>
      <div className="flex flex-col justify-between max-h-96 bg-white border border-gray-200 rounded-lg my-8 px-6 py-3">
        <div className="block w-full overflow-y-auto">
          {taskComment?.map((taskComment) => {
            return (
              <div
                className="bg-indigo-50 text-indigo-600 text-sm text-justify font-medium my-2 me-2 px-5 py-3 rounded"
                key={taskComment.created_at}
              >
                <p>{taskComment.comment} </p>
                <div className="text-gray-800 flex justify-end">
                  {taskComment.created_at}
                </div>
              </div>
            );
          })}
        </div>
        <form>
          <div className="flex justify-between gap-3 max-h-24 items-center rounded-lg mt-3">
            <InputTextArea
              className="block p-2.5 w-full max-h-24 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your message..."
              rows={1}
              textAreaName="taskComment"
              registerInput={register}
            />
            <div
              onClick={handleSubmit(submitData)}
              className="inline-flex justify-center p-2 text-blue-500 rounded-full cursor-pointer"
            >
              <svg
                className="w-5 h-5 rotate-90 rtl:-rotate-90"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
              </svg>
              <span className="sr-only">Send message</span>
            </div>
          </div>
          {errors && (
            <div className="text-red-600 mt-2">
              {errors?.taskComment?.message}
            </div>
          )}
        </form>
      </div>
    </>
  );
}
