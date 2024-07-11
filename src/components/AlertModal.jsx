import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

export default function AlertModal({
  isModalOpen,
  setAlertModalInfo,
  modalTitle,
  modalText,
  buttonLink,
  buttonText,
}) {
  const closeModal = () => {
    setAlertModalInfo({
      isModalOpen: false,
      buttonLink: "",
    });
  };

  return ReactDOM.createPortal(
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className={`${
        isModalOpen ? "" : "hidden"
      } fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 transition-opacity overflow-y-auto`}
    >
      <div className="relative p-4 w-full max-w-[590px] max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-center p-2 md:p-4 rounded-t dark:border-gray-600">
            <h3 className="text-2xl font-semibold text-gray-900 ">
              {modalTitle}
            </h3>
          </div>
          <div className="flex flex-col justify-center p-3">
            <p className="text-center text-gray-900 text-base mb-5">
              {modalText}
            </p>
            <Link
              to={buttonLink}
              onClick={closeModal}
              className="text-center w-full text-white bg-gray-900 hover:bg-gray-800 rounded-full font-medium text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer"
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
