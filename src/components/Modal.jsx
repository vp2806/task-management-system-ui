import { useDispatch } from "react-redux";
import { updateModalInfo } from "../features/generalSlice";

export default function Modal({
  isModalOpen,
  setIsModalOpen,
  modalTitle,
  data,
  setToBeUpdate,
  renderModalBody,
}) {
  const dispatch = useDispatch();

  const closeModal = () => {
    if (
      modalTitle === "Add Task Category" ||
      modalTitle === "Update Task Category"
    ) {
      if (setIsModalOpen) {
        setIsModalOpen(false);
      }

      if (data && setToBeUpdate) {
        setToBeUpdate(null);
      }
      return;
    }
    dispatch(updateModalInfo({ isModalOpen: false, toBeUpdate: null }));
  };

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className={`${
        isModalOpen ? "" : "hidden"
      } fixed inset-0 z-[49] grid h-screen w-screen place-items-center bg-black bg-opacity-60 transition-opacity overflow-y-auto`}
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 ">
              {modalTitle}
            </h3>
            <div
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal"
              onClick={closeModal}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </div>
          </div>
          <div className="p-4 md:p-5 mt-4">{renderModalBody()}</div>
        </div>
      </div>
    </div>
  );
}
