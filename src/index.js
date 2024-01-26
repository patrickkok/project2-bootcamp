import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";

// Pages
import History from "./pages/History.js";
import Settings from "./pages/Settings.js";
import Insights from "./pages/Insights";
import App from "./App";
import Appp from "./components/App.js";

import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import "./App.css";

// import History from "./pages/History";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeContext";
import AddStock from "./pages/AddStock.js"
import UpdateAccountData from "./pages/UpdateAccountData.js";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Appp />,
  },
  {
    path: "/dash",
    element: <App />,
  },
  { path: "/history", element: <History /> },
  { path: "/addstock", element: <AddStock /> },
  { path: "/insights", element: <Insights /> },
  { path: "/settings", element: <Settings /> },
  { path: "/addaccountdata", element: <UpdateAccountData /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
);
