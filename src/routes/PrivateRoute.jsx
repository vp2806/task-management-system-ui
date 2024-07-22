import { Navigate } from "react-router-dom";

export default function PrivateRoute({ element: Element, isPrivate, isAdmin }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (isPrivate && isAdmin && user?.role === "Admin") {
    return <Element />;
  }

  if (isPrivate && !isAdmin && user?.role === "User") {
    return <Element />;
  }

  return (
    <Navigate
      to={`${user?.role === "Admin" ? "/admin/dashboard" : "/dashboard"}`}
    />
  );
}
