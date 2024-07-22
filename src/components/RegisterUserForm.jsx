import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../validations/userValidation";
import { useDispatch, useSelector } from "react-redux";
import { updateToast, updateModalInfo } from "../features/generalSlice";
import { useEffect } from "react";
import { createUserProfile, updateUserProfile } from "../services/userProfile";
import { updateUser } from "../features/userSlice";

export default function RegisterUserForm({ setAlertModalInfo }) {
  const generalData = useSelector((state) => state.general);
  const { modalInfo } = generalData;
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  useEffect(() => {
    if (modalInfo?.toBeUpdate) {
      reset({ ...modalInfo?.toBeUpdate });
    } else {
      reset({
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: "",
        dob: "",
      });
    }
  }, []);

  const submitData = async (userPayLoad) => {
    let response = null;
    if (!modalInfo?.toBeUpdate) {
      response = await createUserProfile(userPayLoad);
    } else {
      response = await updateUserProfile(userPayLoad);
    }

    if (
      response?.data?.response_type &&
      response.data.response_type !== "error"
    ) {
      if (!modalInfo?.toBeUpdate) {
        setAlertModalInfo({
          isModalOpen: true,
          buttonLink: `/activate-account/${response.data.data.activationCode}`,
        });
        reset();
      } else {
        dispatch(
          updateToast({
            type: "success",
            message: response.data.message,
            isShow: true,
          })
        );

        dispatch(
          updateUser({
            first_name: userPayLoad.firstName,
            last_name: userPayLoad.lastName,
            email: userPayLoad.email,
            dob: userPayLoad.dob,
            contact_number: userPayLoad.contactNumber,
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
      }
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

  // async function addUser(data) {
  //   try {
  //     const userResponse = await postRequest("/register", data, {});
  //     if (userResponse.data.response_type !== "error") {
  //       setAlertModalInfo({
  //         isModalOpen: true,
  //         buttonLink: `/activate-account/${userResponse.data.data.activationCode}`,
  //       });
  //       reset();
  //     } else {
  //       dispatch(
  //         updateToast({
  //           type: "error",
  //           message: userResponse.data.message,
  //           isShow: true,
  //         })
  //       );
  //       setTimeout(() => {
  //         dispatch(
  //           updateToast({
  //             type: "error",
  //             message: null,
  //             isShow: false,
  //           })
  //         );
  //       }, 4000);
  //     }
  //   } catch (error) {
  //     dispatch(
  //       updateToast({
  //         type: "error",
  //         message: "Something Went Wrong, please try again later!",
  //         isShow: true,
  //       })
  //     );
  //     setTimeout(() => {
  //       dispatch(
  //         updateToast({
  //           type: "error",
  //           message: null,
  //           isShow: false,
  //         })
  //       );
  //     }, 4000);
  //   }
  // }

  return (
    <form
      id="addUser"
      className="space-y-6"
      onSubmit={handleSubmit(submitData)}
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
        value={modalInfo?.toBeUpdate ? "Update" : "Register"}
        className="text-center w-full text-white bg-gray-900 hover:bg-gray-800 rounded-full font-medium text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer"
      />
    </form>
  );
}
