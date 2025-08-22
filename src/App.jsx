import QuizIndex from "./pages/QuizIndex";
import MainLayout from "./layout/MainLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import QuizBoard from "./component/QuizBoard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "quiz",
        children: [
          {
            index: true,
            element: <QuizIndex />,
          },
          {
            path: "category/:category",
            element: <QuizBoard />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <main className="bg-gray-100">
      <RouterProvider router={router} />
    </main>
  );
};

export default App;
