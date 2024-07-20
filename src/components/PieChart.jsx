import { Pie } from "react-chartjs-2";

export default function PieChart({ chartData }) {
  return (
    <div className="flex flex-col items-center justify-center max-h-96 mt-20">
      <div class="max-w-md w-full bg-white border border-gray-200 rounded-lg shadow p-4 md:p-6">
        <h2 className="font-bold text-center text-3xl text-gray-900 mb-6">
          Task Category Overview
        </h2>
        <Pie
          data={chartData}
          options={{
            plugins: {},
          }}
        />
      </div>
    </div>
  );
}
