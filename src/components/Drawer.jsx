import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { updateDrawerInfo } from "../features/generalSlice";

export default function Drawer({ drawerTitle, renderModalBody }) {
  const generalData = useSelector((state) => state.general);
  const { drawerInfo } = generalData;
  const dispatch = useDispatch();

  return (
    <Dialog
      open={drawerInfo.isDrawerOpen}
      onClose={() => {
        dispatch(
          updateDrawerInfo({
            isDrawerOpen: false,
            isView: false,
            toBeUpdate: null,
            toBeView: null,
          })
        );
      }}
      className="relative z-[48]"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-3xl transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <TransitionChild>
                <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                  <button
                    type="button"
                    onClick={() =>
                      dispatch(
                        updateDrawerInfo({
                          isDrawerOpen: false,
                          isView: false,
                          toBeUpdate: null,
                          toBeView: null,
                        })
                      )
                    }
                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18 17.94 6M18 18 6.06 6"
                      />
                    </svg>
                  </button>
                </div>
              </TransitionChild>
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-2 shadow-xl">
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  {renderModalBody()}
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
