import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import EditorPage from "./pages/EditorPage.jsx";
import Errorpage from "./pages/Errorpage.jsx";

const appRouter = createBrowserRouter([
  { 
    path: "/", 
    element: <Home /> ,
    errorElement:<Errorpage/>
  },

  {
    path: "/editor/:roomId",
    element: <EditorPage />,
    errorElement:<Errorpage/>
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={appRouter} />
  </React.StrictMode>
);
