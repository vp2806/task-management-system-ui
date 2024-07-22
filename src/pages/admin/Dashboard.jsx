import { useEffect, useState } from "react";
import AdminSideBar from "../../components/AdminSideBar";
import PieChart from "../../components/PieChart";
import { getTaskCategoryData } from "../../services/admin/projectStatistics";
import { CategoryScale, Colors } from "chart.js";
import Chart from "chart.js/auto";
import { useDispatch, useSelector } from "react-redux";
import { updateLoading } from "../../features/generalSlice";
import Loader from "../../components/Loader";
import Error from "../../components/Error";

Chart.register(CategoryScale);

export default function Dashboard() {
  const generalData = useSelector((state) => state.general);
  const { isLoading, error } = generalData;
  const dispatch = useDispatch();
  const [chartData, setChartData] = useState([]);
  const [taskCategoryFilterBy, setTaskCategoryFilterBy] =
    useState("Last 7 Days");

  const getData = () => {
    getTaskCategoryData(taskCategoryFilterBy).then((data) => {
      dispatch(
        updateLoading({
          isLoading: false,
          error: null,
        })
      );
      if (Array.isArray(data)) {
        const newData = data.map((category) => {
          return {
            catgoryCount: category.category_count,
            categoryName: category.task_category.category_name,
          };
        });
        dispatch(
          updateLoading({
            isLoading: false,
            error: null,
          })
        );
        setChartData(newData);
      } else {
        dispatch(
          updateLoading({
            isLoading: false,
            error: data,
          })
        );
      }
    });
  };

  useEffect(() => {
    dispatch(
      updateLoading({
        isLoading: true,
        error: null,
      })
    );
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [taskCategoryFilterBy]);

  const chartDataOptions = {
    labels: chartData?.map((category) => category.categoryName),
    datasets: [
      {
        label: "Task Category",
        data: chartData?.map((category) => category.catgoryCount),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#F5DEB3",
          "#f0331a",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  return (
    <>
      <AdminSideBar />
      <div className="p-14 mt-20 sm:ml-64">
        {isLoading ? (
          <Loader
            className={"flex items-center justify-center w-full rounded-lg p-5"}
          />
        ) : (
          !error && (
            <PieChart
              chartTitle={"Task Overview"}
              chartData={chartDataOptions}
              setChartFilterBy={setTaskCategoryFilterBy}
            />
          )
        )}
        {error && <Error error={error} />}
      </div>
    </>
  );
}
