import { useEffect, useState } from "react";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { postRequest } from "../helpers/axiosHelper";
import { useLocation, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { setPasswordSchema } from "../validations/userValidation";
import Toast from "../components/Toast";
import { updateToast } from "../features/users/userSlice";

export default function SetPasssword() {
  const userData = useSelector((state) => state.user);
  const { toastInfo } = userData;
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(setPasswordSchema),
  });

  const [isValidLink, setIsValidLink] = useState({
    error: null,
    isLoading: true,
  });

  const location = useLocation();
  const paramas = useParams();
  let url = null;

  useEffect(() => {
    if (location.pathname.startsWith("/activate-account/")) {
      url = `/activate-account/${paramas.activateId}`;
    } else {
      url = `/reset-password/${paramas.setPasswordId}`;
    }

    postRequest(url, {
      password: "",
      confirmPassword: "",
    })
      .then((response) => {
        if (
          response.data.response_type === "error" &&
          response.data.message !== "Something went wrong while validating user"
        ) {
          return setIsValidLink({
            isLoading: false,
            error: response.data.message,
          });
        }
        return setIsValidLink({
          isLoading: false,
          error: null,
        });
      })
      .catch((error) => {
        console.error("Error while activating account", error);
      });
  }, []);

  async function setPassword(data) {
    try {
      const userResponse = await postRequest(location.pathname, data);
      if (userResponse.data.response_type !== "error") {
        dispatch(
          updateToast({
            type: "success",
            message: "Password has been set successfully!",
            isShow: true,
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
        }, 2000);
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
          message: "Something Went Wrong!",
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
        toastId="registerToast"
        isShow={toastInfo.isShow}
        type={toastInfo.type}
        message={toastInfo.message}
      />
      <h2 className="text-center text-2xl font-bold text-red-500 mt-12">
        {isValidLink.error}
      </h2>
      {isValidLink.isLoading ? (
        <Loader />
      ) : !isValidLink.error ? (
        <div className="flex flex-1 flex-col  min-h-full lg:mx-auto mt-20 mb-20 lg:w-full lg:max-w-lg  px-6 py-9">
          <div className="p-5 bg-white border border-gray-200 rounded-lg shadow">
            <h2 className="mb-2 text-4xl font-bold leading-9 tracking-tight text-gray-900">
              Task Manager
            </h2>
            <p className="mb-4">Set Password</p>
            <form
              id="addUser"
              className="space-y-6"
              onSubmit={handleSubmit(setPassword)}
            >
              <Input
                parentClassName="mt-4"
                inputType="password"
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 require"
                inputId="password"
                inputName="password"
                labelClassName="block font-medium leading-6 text-gray-900 mb-2"
                label="Password"
                error={errors?.password?.message}
                registerInput={register}
                isCompulsory={true}
              />
              <Input
                parentClassName="mt-4"
                inputType="password"
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 require"
                inputId="confirmPassword"
                inputName="confirmPassword"
                labelClassName="block font-medium leading-6 text-gray-900 mb-2"
                label="Confirm Password"
                error={errors?.confirmPassword?.message}
                registerInput={register}
                isCompulsory={true}
              />

              <input
                type="submit"
                value="Set Password"
                className="text-center w-full text-white bg-gray-900 hover:bg-gray-800 rounded-full font-medium text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer"
              />
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
