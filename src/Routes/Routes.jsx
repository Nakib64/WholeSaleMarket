import React from 'react';
import { createBrowserRouter } from 'react-router';
import Homepage from '../Homepage/Homepage';

const Routes = createBrowserRouter([
    {
        path: '/',
        Component: Homepage
    }
])

export default Routes;