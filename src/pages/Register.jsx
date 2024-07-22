import { Link } from "react-router-dom";
import Toast from "../components/Toast";
import { useSelector } from "react-redux";
import { useState } from "react";
import AlertModal from "../components/AlertModal";
import RegisterUserForm from "../components/RegisterUserForm";

export default function Register() {
  const generalData = useSelector((state) => state.general);
  const { toastInfo } = generalData;
  const [alertModalInfo, setAlertModalInfo] = useState({
    isModalOpen: false,
    buttonLink: "",
  });

  return (
    <>
      <Toast
        toastId="registerToast"
        isShow={toastInfo.isShow}
        type={toastInfo.type}
        message={toastInfo.message}
      />
      <AlertModal
        isModalOpen={alertModalInfo.isModalOpen}
        setAlertModalInfo={setAlertModalInfo}
        modalTitle="Activate Account"
        modalText="You've Successfully Registered! Please Activate Your Account."
        buttonLink={alertModalInfo.buttonLink}
        buttonText="Activate Account"
      />
      <div className="flex flex-1 flex-col  min-h-full lg:mx-auto mt-24 lg:w-full lg:max-w-lg  px-6 py-7">
        <div className="p-5 bg-white border border-gray-200 rounded-lg shadow">
          <h2 className="mb-2 text-4xl font-bold leading-9 tracking-tight text-gray-900">
            Task Manager
          </h2>
          <p className="mb-4">Create an account if you have not yet.</p>
          <RegisterUserForm setAlertModalInfo={setAlertModalInfo} />
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
