import React from "react";
import ReactDOM from "react-dom/client";
import App, { TableView } from "./App";

import "@/index.css";
import Layout from "@/components/ui/layout";
import Home from "@/views/home";
import Tracker from "@/views/tracker";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import ProductDetails from "./views/productView";
import ScannerView from "./views/scannerView";
import ProductsView from "./views/productsView";
import CartView from "./views/cartView";
import  { Toaster } from 'react-hot-toast';
import ProductsViewInside from "./views/productsViewInside";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ScannerView />,
  },
  {
    path: "/:restoId",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/" />,
      },
      {
        path: ":tableId",
        element: <TableView />,
        children: [
          {
            index: true,
            element: <Navigate to={"home"} />,
          },
          {
            path: "home",
            element: <Home />,
          },
          {
            path: "tracker",
            element: <Tracker />,
          },
          {
            path: "products",
            children:[
              {
                index:true,

                element: <ProductsView />,

              },
              {
                path:"inside",
                element: <ProductsViewInside/>

              }
            ]
          },
          {
            path: "cart",
            element: <CartView />,
          },
          {
            path: "product/:productId",
            element: <ProductDetails />,
          },
        ],
      },
    ],
  },
]);
console.log('router :>> ', router.routes);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>
);
