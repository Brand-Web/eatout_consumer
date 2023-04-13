import "@/index.css";
import Layout from "@/layout";
import Home from "@views/home";
import Tracker from "@views/tracker";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/abcd1234" />,
      },
      {
        path: ":restoId",
        element: <Home />,
      },
    ],
  },
  {
    path: "/tracker",
    element: <Tracker />,
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
