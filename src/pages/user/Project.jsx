import { useEffect, useState } from "react";
import Card from "../../components/Card";
import UserSideBar from "../../components/UserSideBar";
import useServiceOperation from "../../hooks/useServiceOperation";
import {
  getProjectTasks,
  getTaskCategories,
} from "../../services/user/projectTask";
import {
  projectTaskMapping,
  optionsMapping,
} from "../../helpers/tableColumnMapping";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../../components/Toast";
import Loader from "../../components/Loader";
import { updateDrawerInfo, updateLoading } from "../../features/generalSlice";
import Button from "../../components/Button";
import Drawer from "../../components/Drawer";
import ProjectTaskForm from "../../components/ProjectTaskForm";

export default function Project() {
  const generalData = useSelector((state) => state.general);
  const { toastInfo, isLoading, error, drawerInfo } = generalData;
  const dispatch = useDispatch();

  const { getData } = useServiceOperation();

  const [projectTasks, setProjectTasks] = useState({
    originalData: [],
    transformData: [],
  });

  const [taskCategory, setTaskCategory] = useState({});

  const params = useParams();

  useEffect(() => {
    dispatch(
      updateLoading({
        isLoading: true,
        error: null,
      })
    );
    getData(
      () => {
        return getProjectTasks(params.projectId);
      },
      projectTaskMapping,
      null,
      null,
      setProjectTasks,
      null
    ).then(async () => {
      getData(
        getTaskCategories,
        optionsMapping,
        null,
        null,
        setTaskCategory,
        null
      ).then(async () => {});
    });
  }, [params.projectId]);

  return (
    <>
      <Toast
        toastId="userToast"
        isShow={toastInfo.isShow}
        type={toastInfo.type}
        message={toastInfo.message}
      />
      <Drawer
        drawerTitle={
          drawerInfo.toBeUpdate ? "Update Project Task" : "Add Project Task"
        }
        renderModalBody={() => {
          return (
            <ProjectTaskForm
              data={drawerInfo.toBeUpdate}
              taskCategory={taskCategory.transformData}
              getData={async () => {
                await getData(
                  () => {
                    return getProjectTasks(params.projectId);
                  },
                  projectTaskMapping,
                  null,
                  null,
                  setProjectTasks,
                  null
                );
              }}
            />
          );
        }}
      />
      <UserSideBar />
      <div className="p-16 mt-20 sm:ml-72">
        {isLoading ? (
          <Loader
            className={"flex items-center justify-center w-full rounded-lg p-5"}
          />
        ) : (
          <>
            <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 gap-7">
              <div className="flex flex-col">
                <div className="text-gray-800 font-bold text-2xl mb-2">
                  To Do
                </div>

                {projectTasks?.transformData
                  ?.filter((task) => {
                    return task.task_status === 0;
                  })
                  .map((task) => {
                    return (
                      <Card
                        key={task.Id}
                        title={task.Title}
                        description={task.Description}
                        dueDate={task["Due Date"]}
                      />
                    );
                  })}
                <Button
                  btnText="Add Task"
                  btnClassName="text-center max-w-sm text-gray-900 bg-gray-300 rounded-lg font-medium text-sm px-5 py-2.5 me-2 mb-7 cursor-pointer"
                  btnOnClick={() => {
                    dispatch(
                      updateDrawerInfo({
                        isDrawerOpen: true,
                        toBeUpdate: null,
                      })
                    );
                  }}
                />
              </div>
              <div className="flex flex-col">
                <div className="text-gray-800 font-bold text-2xl mb-2">
                  In Progress
                </div>

                {projectTasks?.transformData
                  ?.filter((task) => {
                    return task.task_status === 1;
                  })
                  .map((task) => {
                    return (
                      <Card
                        key={task.Id}
                        title={task.Title}
                        description={task.Description}
                        dueDate={task["Due Date"]}
                      />
                    );
                  })}

                <Button
                  btnText="Add Task"
                  btnClassName="text-center max-w-sm text-gray-900 bg-gray-300 rounded-lg font-medium text-sm px-5 py-2.5 me-2 mb-7 cursor-pointer"
                  btnOnClick={() => {
                    dispatch(
                      updateDrawerInfo({
                        isDrawerOpen: true,
                        toBeUpdate: null,
                      })
                    );
                  }}
                />
              </div>
              <div className="flex flex-col">
                <div className="text-gray-800 font-bold text-2xl mb-2">
                  Done
                </div>

                {projectTasks?.transformData
                  ?.filter((task) => {
                    return task.task_status === 2;
                  })
                  .map((task) => {
                    return (
                      <Card
                        key={task.Id}
                        title={task.Title}
                        description={task.Description}
                        dueDate={task["Due Date"]}
                      />
                    );
                  })}

                <Button
                  btnText="Add Task"
                  btnClassName="text-center max-w-sm text-gray-900 bg-gray-300 rounded-lg font-medium text-sm px-5 py-2.5 me-2 mb-7 cursor-pointer"
                  btnOnClick={() => {
                    dispatch(
                      updateDrawerInfo({
                        isDrawerOpen: true,
                        toBeUpdate: null,
                      })
                    );
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
