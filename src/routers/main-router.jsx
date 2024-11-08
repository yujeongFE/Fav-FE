// Router: 각 URL에 따른 page 컴포넌트 연결
import { createBrowserRouter } from "react-router-dom";
import Board from "../routes/board/pages.jsx";
import DashBoard from "../routes/dashboard/pages.jsx";
import SignupForm from "../components/Auth/SignupForm.jsx";
import Login from "../components/Auth/LoginService.jsx";
import Userboard from "../routes/userboard/pages.jsx";
import StoreInfo from "../routes/storeInfo/pages.jsx";

export const mainRoutes = [
  {
    path: "/",
    element: <Login />,
    index: true,
  },
  {
    path: "/signup",
    element: <SignupForm />,
    index: true,
  },
  {
    path: "/board",
    element: <Board />,
    index: true,
  },
  {
    path: "/dashboard",
    element: <DashBoard />,
    index: true,
  },
  {
    path: "/userboard",
    element: <Userboard />,
    index: true,
  },
  {
    path: "/storeInfo",
    element: <StoreInfo />,
    index: true,
  },
];
const router = createBrowserRouter(mainRoutes);
export default router;
