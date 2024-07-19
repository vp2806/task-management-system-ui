import { useEffect, useState } from "react";
import AdminSideBar from "../components/AdminSideBar";
import UserProfile from "../components/UserProfile";
import UserSideBar from "../components/UserSideBar";
import { getUserProfile } from "../services/userProfile";
import { updateLoading } from "../features/generalSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";

export default function Profile() {
  const generalData = useSelector((state) => state.general);
  const { isLoading, error } = generalData;
  const dispatch = useDispatch();

  const [user, setUser] = useState({});
  const userRole = JSON.parse(localStorage.getItem("user"))?.role;

  useEffect(() => {
    dispatch(
      updateLoading({
        isLoading: true,
        error: null,
      })
    );
    getUserProfile().then((response) => {
      if (typeof response === "object") {
        dispatch(
          updateLoading({
            isLoading: false,
            error: null,
          })
        );
        setUser(response);
      }
    });
  }, []);

  return (
    <>
      {userRole === "Admin" ? <AdminSideBar /> : <UserSideBar />}
      <div className="p-14 mt-20 sm:ml-64 flex justify-center">
        {isLoading ? (
          <Loader
            className={
              "flex items-center justify-center w-full rounded-lg p-10"
            }
          />
        ) : (
          <UserProfile
            firstName={user.first_name}
            lastName={user.last_name}
            email={user.email}
            dob={user.dob}
            contactNumber={user.contact_number}
          />
        )}
      </div>
    </>
  );
}
