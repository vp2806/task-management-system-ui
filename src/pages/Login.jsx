import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validations/userValidation";
import { useDispatch, useSelector } from "react-redux";
import { updateToast } from "../features/generalSlice";
import { postRequest } from "../helpers/axiosHelper";
import Toast from "../components/Toast";

export default function Login() {
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
    resolver: zodResolver(loginSchema),
  });

  async function loginUser(data) {
    try {
      const userResponse = await postRequest("/login", data);
      if (userResponse.data.response_type !== "error") {
        localStorage.setItem("token", userResponse.data.data.token);
        navigate("/register");
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
        toastId="loginToast"
        isShow={toastInfo.isShow}
        type={toastInfo.type}
        message={toastInfo.message}
      />
      <div className="flex flex-1 flex-col  min-h-full lg:mx-auto mt-20 mb-20 lg:w-full lg:max-w-lg  px-6 py-9">
        <div className="p-5 bg-white border border-gray-200 rounded-lg shadow">
          <h2 className="mb-2 text-4xl font-bold leading-9 tracking-tight text-gray-900">
            Task Manager
          </h2>
          <p className="mb-4">Welcome Back!</p>
          <form
            id="loginUser"
            className="space-y-6"
            onSubmit={handleSubmit(loginUser)}
          >
            <Input
              parentClassName="mt-4"
              inputType="email"
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 require"
              inputId="email"
              inputName="email"
              labelClassName="block font-medium leading-6 text-gray-900"
              label="Email"
              error={errors?.email?.message}
              registerInput={register}
              isCompulsory={true}
            />
            <Input
              parentClassName="mt-8"
              inputType="password"
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 require"
              inputId="password"
              inputName="password"
              labelClassName="block font-medium leading-6 text-gray-900"
              label="Password"
              error={errors?.password?.message}
              registerInput={register}
              isCompulsory={true}
            />

            <div className="text-base text-center">
              <Link
                to="/forgot-password"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </Link>
            </div>

            <input
              type="submit"
              value="Login"
              className="text-center w-full text-white bg-gray-900 hover:bg-gray-800 rounded-full font-medium text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer"
            />
          </form>
          <p className="mt-6 text-center text-base text-gray-800">
            Are you new to Task Manager?{" "}
            <Link
              to="/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
