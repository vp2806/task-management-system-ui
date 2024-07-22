import SweetAlertModal from "../components/SweetAlertModal";
import ReactDOM from "react-dom/client";

const closeAlertModal = () => {
  const modalRoot = ReactDOM.createRoot(document.getElementById("modal-root"));
  modalRoot.unmount();
};

const Swal = {
  fire: (options) => {
    return new Promise((resolve, reject) => {
      const isConfirmed = () => {
        if (options.confirmButtonText && options.showCancelButton) {
          closeAlertModal();
          resolve({ isConfirmed: true });
        }
      };

      const modalRoot = ReactDOM.createRoot(
        document.getElementById("modal-root")
      );
      modalRoot.render(
        <SweetAlertModal
          isModalOpen={true}
          closeAlertModal={closeAlertModal}
          icon={options.icon}
          title={options.title}
          text={options.text}
          showCancelButton={options.showCancelButton}
          confirmButtonText={options.confirmButtonText}
          isConfirmed={isConfirmed}
        />
      );

      if (!options.confirmButtonText && !options.showCancelButton) {
        resolve({ sucess: true });
      }
    });
  },
};

export default Swal;
