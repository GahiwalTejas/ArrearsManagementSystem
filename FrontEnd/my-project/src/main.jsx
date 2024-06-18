import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Home from './pages/Home.jsx';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from './pages/LoginPage.jsx';
import RegistrationPage from './pages/RegistrationPage.jsx';
import { Provider } from 'react-redux';
import store from './store/store.jsx';
import AuthLayout from "./component/AuthLayout.jsx";
import CustomerLentData from './pages/CustomerLentData.jsx';
import LentTakenCustomers from './pages/LentTakenCustomers.jsx';
import ArrearData from './pages/ArrearData.jsx';
import UpdateArrearData from './pages/UpdateArrearData.jsx';

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <LoginPage />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <RegistrationPage />
          </AuthLayout>
        ),
      },
      {
        path: "/lentDetails",
        element: (
          <AuthLayout authentication={true}>
                       <LentTakenCustomers/>
          </AuthLayout>
        ),
      },
      {
        path: "/lentTakenCustomers",
        element: (
          <AuthLayout authentication={true}>
            <CustomerLentData/>
          </AuthLayout>
        ),
      },
      {
        path: "/addArrearData",
        element: (
          <AuthLayout authentication={true}>
         <ArrearData/>
          </AuthLayout>
        ),
      },
       {
        path: "/updateArrearData/:data",
        element: (
          <AuthLayout  authentication={true}>
<UpdateArrearData />          </AuthLayout>
        ),
      },
      
      
      
    ],
  },
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <RouterProvider router={route} />
  </Provider>
)
