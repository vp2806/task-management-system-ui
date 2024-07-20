import { useEffect, useState } from "react";
import Card from "../../components/Card";
import UserSideBar from "../../components/UserSideBar";
import useServiceOperation from "../../hooks/useServiceOperation";
import {
  getProjectTasks,
  getTaskCategories,
  getTaskAssignees,
} from "../../services/user/projectTask";
import {
  projectTaskMapping,
  optionsMapping,
  projectTaskValueMapping,
} from "../../helpers/tableColumnMapping";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../../components/Toast";
import Loader from "../../components/Loader";
import { updateDrawerInfo, updateLoading } from "../../features/generalSlice";
import Button from "../../components/Button";
import Drawer from "../../components/Drawer";
import ProjectTaskForm from "../../components/ProjectTaskForm";
import Task from "../../components/Task";
import Input from "../../components/Input";
import InputSelect from "../../components/Select";
import { useDebouncedValue } from "../../hooks/useDebounce";
import { filterByOptions, priorityLevelOptions } from "../../helpers/data";

export default function Project() {
  const generalData = useSelector((state) => state.general);
  const { toastInfo, isLoading, drawerInfo } = generalData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { getData } = useServiceOperation();

  const [projectTasks, setProjectTasks] = useState({
    originalData: [],
    transformData: [],
    searchData: [],
  });

  const [taskCategory, setTaskCategory] = useState([]);
  const [taskAssignees, setTaskAssignees] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState({});

  const params = useParams();
  const debounceSearchValue = useDebouncedValue(searchValue, 500);
  let dataKey = null;

  if (debounceSearchValue !== "") {
    dataKey = "searchData";
  } else {
    dataKey = "transformData";
  }

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
    ).then(async (response) => {
      if (!response) {
        return navigate("/dashboard");
      } else {
        getData(
          getTaskCategories,
          optionsMapping,
          null,
          null,
          setTaskCategory,
          null
        ).then(async () => {
          getData(
            getTaskAssignees,
            optionsMapping,
            null,
            null,
            setTaskAssignees,
            null
          );
        });
      }
    });
  }, [params.projectId]);

  useEffect(() => {
    if (debounceSearchValue !== "") {
      const newSearchData = projectTasks?.transformData.filter((data) => {
        if (
          data.title.toLowerCase().search(debounceSearchValue.toLowerCase()) !==
          -1
        ) {
          return true;
        }
        return false;
      });
      setProjectTasks({
        ...projectTasks,
        ["searchData"]: newSearchData,
      });
    } else {
      setProjectTasks({
        ...projectTasks,
        ["searchData"]: [],
      });
    }
  }, [debounceSearchValue]);

  function handleSearch(event) {
    setSearchValue(event.target.value.trim());
  }

  function handleFilter(event) {
    if (event.target.name === "taskFilterBy") {
      if (event.target.value === "Category") {
        setFilterValue({
          taskCategory: "",
        });
      }

      if (event.target.value === "Priority Level") {
        setFilterValue({
          priorityLevel: "",
        });
      }

      if (event.target.value === "") {
        setFilterValue({});
      }
    }

    if (event.target.name === "taskFilterValue") {
      Object.keys(filterValue).forEach((key) => {
        setFilterValue({
          [key]: event.target.value.trim(),
        });
      });
    }
  }

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
          if (drawerInfo.isView) {
            return (
              <Task
                getData={() => {
                  getData(
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
          }

          if (drawerInfo.isDrawerOpen && !drawerInfo.isView) {
            return (
              <ProjectTaskForm
                data={drawerInfo.toBeUpdate}
                taskCategory={taskCategory.transformData}
                taskAssignees={taskAssignees.transformData}
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
          }
        }}
      />
      <UserSideBar />
      <div className="px-16 sm:ml-72 w-">
        {isLoading ? (
          <Loader
            className={"flex items-center justify-center w-full rounded-lg p-5"}
          />
        ) : (
          <>
            <div className="flex justify-end items-center mb-8 gap-5">
              <Input
                parentClassName="w-64"
                inputType="search"
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 require"
                inputId="searchTask"
                inputName="searchTask"
                registerInput={() => {}}
                inputPlaceholder={"Search Task by Title"}
                handleChange={handleSearch}
              />
              <InputSelect
                selectClassName="w-48 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 require"
                selectName="taskFilterBy"
                labelClassName="block mb-2 text-sm font-medium text-gray-900"
                label={null}
                registerInput={() => {}}
                selectOptions={filterByOptions}
                handleChange={handleFilter}
              />
              <InputSelect
                selectClassName="w-48 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 require"
                selectName="taskFilterValue"
                labelClassName="block mb-2 text-sm font-medium text-gray-900"
                label={null}
                registerInput={() => {}}
                selectOptions={
                  filterValue?.taskCategory?.length >= 0
                    ? taskCategory?.transformData
                    : filterValue?.priorityLevel?.length >= 0
                    ? priorityLevelOptions
                    : []
                }
                handleChange={handleFilter}
              />
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 gap-7">
              <div className="flex flex-col">
                <div className="text-gray-800 font-bold text-2xl mb-2">
                  To Do
                </div>

                {projectTasks[dataKey]
                  ?.filter((task) => {
                    if (
                      Object.keys(filterValue).length === 1 &&
                      Object.values(filterValue)[0] !== ""
                    ) {
                      if (
                        projectTaskValueMapping[
                          Object.values(filterValue)[0]
                        ] !== undefined
                      ) {
                        return (
                          task.taskStatus === 0 &&
                          task[Object.keys(filterValue)[0]] ===
                            projectTaskValueMapping[
                              Object.values(filterValue)[0]
                            ]
                        );
                      } else {
                        return (
                          task.taskStatus === 0 &&
                          task[Object.keys(filterValue)[0]] ===
                            Object.values(filterValue)[0]
                        );
                      }
                    }
                    return task.taskStatus === 0;
                  })
                  .map((task) => {
                    return (
                      <Card
                        key={task.id}
                        title={task.title}
                        description={task.description}
                        dueDate={task.dueDate}
                        onClick={() => {
                          dispatch(
                            updateDrawerInfo({
                              isDrawerOpen: true,
                              isView: true,
                              toBeUpdate: null,
                              toBeView: task,
                            })
                          );
                        }}
                      />
                    );
                  })}
                <Button
                  btnText="Add Task"
                  btnClassName="text-center text-gray-900 bg-gray-300 rounded-lg font-medium text-sm px-5 py-2.5 me-2 mb-7 cursor-pointer"
                  btnOnClick={() => {
                    dispatch(
                      updateDrawerInfo({
                        isDrawerOpen: true,
                        isView: false,
                        toBeUpdate: null,
                        toBeView: null,
                      })
                    );
                  }}
                />
              </div>
              <div className="flex flex-col">
                <div className="text-gray-800 font-bold text-2xl mb-2">
                  In Progress
                </div>

                {projectTasks[dataKey]
                  ?.filter((task) => {
                    if (
                      Object.keys(filterValue).length === 1 &&
                      Object.values(filterValue)[0] !== ""
                    ) {
                      if (
                        projectTaskValueMapping[Object.values(filterValue)[0]]
                      ) {
                        return (
                          task.taskStatus === 1 &&
                          task[Object.keys(filterValue)[0]] ===
                            projectTaskValueMapping[
                              Object.values(filterValue)[0]
                            ]
                        );
                      } else {
                        return (
                          task.taskStatus === 1 &&
                          task[Object.keys(filterValue)[0]] ===
                            Object.values(filterValue)[0]
                        );
                      }
                    }
                    return task.taskStatus === 1;
                  })
                  .map((task) => {
                    return (
                      <Card
                        key={task.id}
                        title={task.title}
                        description={task.description}
                        dueDate={task.dueDate}
                        onClick={() => {
                          dispatch(
                            updateDrawerInfo({
                              isDrawerOpen: true,
                              isView: true,
                              toBeUpdate: null,
                              toBeView: task,
                            })
                          );
                        }}
                      />
                    );
                  })}

                <Button
                  btnText="Add Task"
                  btnClassName="text-center text-gray-900 bg-gray-300 rounded-lg font-medium text-sm px-5 py-2.5 me-2 mb-7 cursor-pointer"
                  btnOnClick={() => {
                    dispatch(
                      updateDrawerInfo({
                        isDrawerOpen: true,
                        isView: false,
                        toBeUpdate: null,
                        toBeView: null,
                      })
                    );
                  }}
                />
              </div>
              <div className="flex flex-col">
                <div className="text-gray-800 font-bold text-2xl mb-2">
                  Done
                </div>

                {projectTasks[dataKey]
                  ?.filter((task) => {
                    if (
                      Object.keys(filterValue).length === 1 &&
                      Object.values(filterValue)[0] !== ""
                    ) {
                      if (
                        projectTaskValueMapping[Object.values(filterValue)[0]]
                      ) {
                        return (
                          task.taskStatus === 2 &&
                          task[Object.keys(filterValue)[0]] ===
                            projectTaskValueMapping[
                              Object.values(filterValue)[0]
                            ]
                        );
                      } else {
                        return (
                          task.taskStatus === 2 &&
                          task[Object.keys(filterValue)[0]] ===
                            Object.values(filterValue)[0]
                        );
                      }
                    }
                    return task.taskStatus === 2;
                  })
                  .map((task) => {
                    return (
                      <Card
                        key={task.id}
                        title={task.title}
                        description={task.description}
                        dueDate={task.dueDate}
                        onClick={() => {
                          dispatch(
                            updateDrawerInfo({
                              isDrawerOpen: true,
                              isView: true,
                              toBeUpdate: null,
                              toBeView: task,
                            })
                          );
                        }}
                      />
                    );
                  })}

                <Button
                  btnText="Add Task"
                  btnClassName="text-center text-gray-900 bg-gray-300 rounded-lg font-medium text-sm px-5 py-2.5 me-2 mb-7 cursor-pointer"
                  btnOnClick={() => {
                    dispatch(
                      updateDrawerInfo({
                        isDrawerOpen: true,
                        isView: false,
                        toBeUpdate: null,
                        toBeView: null,
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
