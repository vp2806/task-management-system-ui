import { Link } from "react-router-dom";
import Input from "../components/Input";
import Toast from "../components/Toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../validations/userValidation";
import { useDispatch, useSelector } from "react-redux";
import { updateToast } from "../features/users/userSlice";
import { postRequest } from "../helpers/axiosHelper";
import { useState } from "react";
import Modal from "../components/AlertModal";

export default function Register() {
  const userData = useSelector((state) => state.user);
  const { toastInfo } = userData;
  const dispatch = useDispatch();
  const [alertModalInfo, setAlertModalInfo] = useState({
    isModalOpen: false,
    buttonLink: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  async function addUser(data) {
    try {
      const userResponse = await postRequest("/register", data, {});
      if (userResponse.data.response_type !== "error") {
        setAlertModalInfo({
          isModalOpen: true,
          buttonLink: `/activate-account/${userResponse.data.data.activationCode}`,
        });
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
        toastId="registerToast"
        isShow={toastInfo.isShow}
        type={toastInfo.type}
        message={toastInfo.message}
      />
      <Modal
        isModalOpen={alertModalInfo.isModalOpen}
        setAlertModalInfo={setAlertModalInfo}
        modalTitle="Activate Account"
        modalText="You've Successfully Registered! Please Activate Your Account."
        buttonLink={alertModalInfo.buttonLink}
        buttonText="Activate Account"
      />
      <div className="flex flex-1 flex-col  min-h-full lg:mx-auto mt-14 lg:w-full lg:max-w-lg  px-6 py-7">
        <div className="p-5 bg-white border border-gray-200 rounded-lg shadow">
          <h2 className="mb-2 text-4xl font-bold leading-9 tracking-tight text-gray-900">
            Task Manager
          </h2>
          <p className="mb-4">Create an account if you have not yet.</p>
          <form
            id="addUser"
            className="space-y-6"
            onSubmit={handleSubmit(addUser)}
          >
            <Input
              parentClassName="mt-2"
              inputType="text"
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 require"
              inputId="firstName"
              inputName="firstName"
              labelClassName="block font-medium leading-6 text-gray-900"
              label="First Name"
              error={errors?.firstName?.message}
              registerInput={register}
              isCompulsory={true}
            />
            <Input
              parentClassName="mt-2"
              inputType="text"
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 require"
              inputId="lastName"
              inputName="lastName"
              labelClassName="block font-medium leading-6 text-gray-900"
              label="Last Name"
              error={errors?.lastName?.message}
              registerInput={register}
              isCompulsory={true}
            />
            <Input
              parentClassName="mt-2"
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
              parentClassName="mt-2"
              inputType="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 require"
              inputId="dob"
              inputName="dob"
              labelClassName="block mb-2 text-sm font-medium text-gray-900"
              label="DOB"
              error={errors?.dob?.message}
              registerInput={register}
              maxDate={new Date(`${new Date().getFullYear() - 18}-12-31`)
                .toISOString()
                .slice(0, 10)}
              isCompulsory={true}
              isOnClick={true}
            />
            <Input
              parentClassName="mt-2"
              inputType="text"
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 require"
              inputId="contactNumber"
              inputName="contactNumber"
              labelClassName="block font-medium leading-6 text-gray-900"
              label="Contact Number"
              error={errors?.contactNumber?.message}
              registerInput={register}
              isCompulsory={true}
              isMaxLength={10}
            />

            <input
              type="submit"
              value="Register"
              className="text-center w-full text-white bg-gray-900 hover:bg-gray-800 rounded-full font-medium text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer"
            />
          </form>
          <p className="mt-6 text-center text-base text-gray-800">
            Already have an Task Manager Account?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
