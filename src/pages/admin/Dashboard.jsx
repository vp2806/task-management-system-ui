import AdminSideBar from "../../components/AdminSideBar";

export default function Dashboard() {
  return (
    <>
      <AdminSideBar />
      <div className="p-14 mt-20 sm:ml-64">
        <h1 className="text-center text-2xl font-extrabold text-gray-700">
          Admin Dashboard
        </h1>
      </div>
    </>
  );
}
