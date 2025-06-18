import React from 'react';
import { createBrowserRouter } from 'react-router';
import Homepage from '../Homepage/Homepage';
import Register from '../Homepage/Register/Register';
import Login from '../Homepage/login/Login';
import NotFound from '../Error/Error';
import Home from '../Homepage/Home/Home';
import CategoryMenu from '../Homepage/Category';
import CategorySec from '../Homepage/Category/CategorySec';


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
            }
        ]
    },
    {
        path: '*',
        Component: NotFound
    }
])

export default Routes;