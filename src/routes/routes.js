import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import SetPasssword from "../pages/SetPasssword";
import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import TaskCategories from "../pages/admin/TaskCategories";
import Projects from "../pages/admin/Projects";
import UserDashboard from "../pages/user/UserDashboard";
import Project from "../pages/user/Project";
import Profile from "../pages/Profile";

const routes = [
  {
    path: "/",
    element: Login,
    isPrivate: false,
    isAdmin: false,
  },
  {
    path: "/login",
    element: Login,
    isPrivate: false,
    isAdmin: false,
  },
  {
    path: "/register",
    element: Register,
    isPrivate: false,
    isAdmin: false,
  },
  {
    path: "/forgot-password",
    element: ForgotPassword,
    isPrivate: false,
    isAdmin: false,
  },
  {
    path: "/activate-account/:activateId",
    element: SetPasssword,
    isPrivate: false,
    isAdmin: false,
  },
  {
    path: "/reset-password/:setPasswordId",
    element: SetPasssword,
    isPrivate: false,
    isAdmin: false,
  },
  {
    path: "/admin/profile",
    element: Profile,
    isPrivate: true,
    isAdmin: true,
  },
  {
    path: "/profile",
    element: Profile,
    isPrivate: true,
    isAdmin: false,
  },
  {
    path: "/admin/dashboard",
    element: Dashboard,
    isPrivate: true,
    isAdmin: true,
  },
  {
    path: "/admin/users",
    element: Users,
    isPrivate: true,
    isAdmin: true,
  },
  {
    path: "/admin/task-categories",
    element: TaskCategories,
    isPrivate: true,
    isAdmin: true,
  },
  {
    path: "/admin/projects",
    element: Projects,
    isPrivate: true,
    isAdmin: true,
  },
  {
    path: "/dashboard",
    element: UserDashboard,
    isPrivate: true,
    isAdmin: false,
  },
  {
    path: "/project/:projectId",
    element: Project,
    isPrivate: true,
    isAdmin: false,
  },
];

export default routes;
