import React from 'react';
import { createBrowserRouter } from 'react-router';
import Homepage from '../Homepage/Homepage';
import Register from '../Homepage/Register/Register';
import Login from '../Homepage/login/Login';
import NotFound from '../Error/Error';
import Home from '../Homepage/Home/Home';
import CategoryMenu from '../Homepage/Category';
import CategorySec from '../Homepage/Category/CategorySec';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import AllProduct from '../Homepage/nav/Product/AllProduct';
import AddProduct from '../Homepage/nav/Product/AddProduct';
import MyProduct from '../Homepage/nav/Product/MyProduct';


const Routes = createBrowserRouter([
    {
        path: '/',
        Component: Homepage,
        children: [
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                index: true,
                Component: Home
            },
            {
                path: '/category',
                Component: CategorySec
            },
            {
                path: '/allProduct',
                element: <PrivateRoute><AllProduct></AllProduct></PrivateRoute>
            },
            {
                path: '/addProduct',
                element: <PrivateRoute><AddProduct></AddProduct></PrivateRoute>
            },
            {
                path: '/myProduct',
                element: <PrivateRoute><MyProduct></MyProduct></PrivateRoute>
            },
        ]
    },
    {
        path: '*',
        Component: NotFound
    }
])

export default Routes;