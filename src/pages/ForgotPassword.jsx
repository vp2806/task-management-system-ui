import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema } from "../validations/userValidation";
import { useDispatch, useSelector } from "react-redux";
import { updateToast } from "../features/generalSlice";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import { postRequest } from "../helpers/axiosHelper";

export default function ForgotPassword() {
  const generalData = useSelector((state) => state.general);
  const { toastInfo } = generalData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(emailSchema),
  });

  async function forgotPassword(data) {
    try {
      const userResponse = await postRequest("/forgot-password", data);
      if (userResponse.data.response_type !== "error") {
        navigate(`/reset-password/${userResponse.data.data.activationCode}`);
        reset();
      } else {
        dispatch(
          updateToast({
            type: "error",
            message: userResponse.data.message,
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
    } catch (error) {
      dispatch(
        updateToast({
          type: "error",
          message: "Something Went Wrong, please try again later!",
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
  }

  return (
    <>
      <Toast
        toastId="forgotPasswordToast"
        isShow={toastInfo.isShow}
        type={toastInfo.type}
        message={toastInfo.message}
      />
      <div className="flex flex-1 flex-col  min-h-full lg:mx-auto mt-20 mb-20 lg:w-full lg:max-w-lg  px-6 py-9">
        <div className="p-5 bg-white border border-gray-200 rounded-lg shadow">
          <h2 className="mb-2 text-4xl font-bold leading-9 tracking-tight text-gray-900">
            Task Manager
          </h2>
          <p className="mb-4">Forgot Password</p>
          <form
            id="forgotPassword"
            className="space-y-6"
            onSubmit={handleSubmit(forgotPassword)}
          >
            <Input
              parentClassName="mt-4"
              inputType="email"
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 require"
              inputId="email"
              inputName="email"
              labelClassName="block font-medium leading-6 text-gray-900 mb-2"
              label="Email"
              error={errors?.email?.message}
              registerInput={register}
              isCompulsory={true}
            />

            <input
              type="submit"
              value="Forgot Password"
              className="text-center w-full text-white bg-gray-900 hover:bg-gray-800 rounded-full font-medium text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer"
            />
          </form>
        </div>
      </div>
    </>
  );
}
