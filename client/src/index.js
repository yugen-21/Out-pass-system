import * as React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import ErrorPage from "./routes/ErrorPage";
import Home from "./routes/Home";
import CreateOutpass from "./routes/CreateOutpass";
import Help from "./routes/Help";
import ViewHistory from "./routes/ViewHistory";
import WardenDetails from "./routes/WardenDetails";
import "./styles.css";

var email_id = 'shama21110467@snuchennai.edu.in';
const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home email={email_id}/>,
      },
      {
        path: "/CreateOutpass",
        element: <CreateOutpass email={email_id}/>,
      },
      {
        path: "/ViewHistory",
        element: <ViewHistory email={email_id}/>,
      },
      {
        path: "/WardenDetails",
        element: <WardenDetails />,
      },
      {
        path: "/Help",
        element: <Help />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
