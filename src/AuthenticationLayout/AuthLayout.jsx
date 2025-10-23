import React from 'react';
import { Outlet } from 'react-router';
import { Toaster } from 'sonner';

const AuthLayout = () => {
    return (
        <div>
            <Toaster position="top-center" />
            <Outlet></Outlet>
        </div>
    );
};

export default AuthLayout;