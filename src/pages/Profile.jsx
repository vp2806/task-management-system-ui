import { useEffect } from "react";
import AdminSideBar from "../components/AdminSideBar";
import UserProfile from "../components/UserProfile";
import UserSideBar from "../components/UserSideBar";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { fetchUserProfile } from "../features/userSlice";
import Error from "../components/Error";

export default function Profile() {
  const userData = useSelector((state) => state.user);
  const { isLoadingUser, userProfile } = userData;
  const dispatch = useDispatch();

  const userRole = JSON.parse(localStorage.getItem("user"))?.role;

  useEffect(() => {
    //Fetch User profile using redux thunk middleware
    dispatch(fetchUserProfile());
  }, []);

  return (
    <>
      {userRole === "Admin" ? <AdminSideBar /> : <UserSideBar />}
      <div className="p-14 mt-20 sm:ml-64 flex justify-center">
        {isLoadingUser ? (
          <Loader
            className={
              "flex items-center justify-center w-full rounded-lg p-10"
            }
          />
        ) : Object.keys(userProfile).length === 0 ? (
          <Error error="Something went wrong" />
        ) : (
          <UserProfile
            firstName={userProfile?.first_name}
            lastName={userProfile?.last_name}
            email={userProfile?.email}
            dob={userProfile?.dob}
            contactNumber={userProfile?.contact_number}
          />
        )}
      </div>
    </>
  );
}
