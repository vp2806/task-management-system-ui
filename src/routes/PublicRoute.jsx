import { Suspense } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";

export default function PublicRoute({ element: Element }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    return <Element />;
  }

  return (
    <Suspense
      fallback={
        <Loader className="flex items-center justify-center w-full rounded-lg p-5" />
      }
    >
      <Navigate
        to={`${user?.role === "Admin" ? "/admin/dashboard" : "/dashboard"}`}
      />
    </Suspense>
  );
}
