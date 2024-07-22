import { Pie } from "react-chartjs-2";
import { taskCategoryStatisticsOptions } from "../helpers/data";
import InputSelect from "./Select";

export default function PieChart({ chartTitle, chartData, setChartFilterBy }) {
  return (
    <div className="flex flex-col items-center justify-center max-h-96 mt-20">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-lg shadow p-4 md:p-6">
        <h2 className="font-bold text-center text-3xl text-gray-900 mb-6">
          {chartTitle}
        </h2>
        <Pie
          data={chartData}
          options={{
            plugins: {},
          }}
        />
        <InputSelect
          selectClassName="w-full mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 require"
          selectName="taskFilterBy"
          labelClassName="block mb-2 text-sm font-medium text-gray-900"
          label={null}
          isDefaultOption={false}
          registerInput={() => {}}
          selectOptions={taskCategoryStatisticsOptions}
          handleChange={(event) => {
            setChartFilterBy(event.target.value.trim());
          }}
        />
      </div>
    </div>
  );
}
