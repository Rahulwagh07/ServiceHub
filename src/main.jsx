import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import rootReducer from './reducer';
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Toaster } from 'react-hot-toast';
import './index.css'
import ErrorPage from "./pages/Error";
import OpenRoute from "./components/auth/OpenRoute"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword"
import VerifyEmail from "./pages/VerifyEmail"
import Home from "./pages/Home"
import PrivateRoute from "./components/auth/PrivateRoute";


const store = configureStore({
  reducer: rootReducer,
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/login",
        element: <OpenRoute><Login/></OpenRoute>,
      },
      {
        path: "/signup",
        element: <OpenRoute><Signup/></OpenRoute>,
      },
      {
        path: "/verify-email",
        element: <OpenRoute><VerifyEmail/></OpenRoute>,
      },
      {
        path: "/forgot-password",
        element: <OpenRoute><ForgotPassword/></OpenRoute>,
      },
      {
        path: "/update-password/:id",
        element: <OpenRoute><ForgotPassword/></OpenRoute>,
      },
      {
        path: "/search",
        element: <PrivateRoute><ForgotPassword/></PrivateRoute>,
      },
      {
        path: "/cart",
        element: <OpenRoute><ForgotPassword/></OpenRoute>,
      },
      {
        path: "/list-service",
        element: <PrivateRoute><ForgotPassword/></PrivateRoute>,
      },
      {
        path: "/listed-services",
        element: <PrivateRoute><ForgotPassword/></PrivateRoute>,
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <Toaster/>
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
