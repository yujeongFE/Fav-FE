// Router: 각 URL에 따른 page 컴포넌트 연결
import { createBrowserRouter } from "react-router-dom";
import Board from "../routes/board/pages.jsx";

export const mainRoutes = [
  {
    path: "/board",
    element: <Board />,
    index: true,
  },
];

const router = createBrowserRouter(mainRoutes);
export default router;
