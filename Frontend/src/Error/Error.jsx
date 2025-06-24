import React from 'react';
import { Link } from 'react-router';

const NotFound = () => {
    return (
        <div className='flex flex-col gap-12 min-h-screen justify-center items-center'>
            <h1 className='text-6xl text-center text-red-500'>404</h1>
            <h3 className='text-3xl text-center'>Page not found</h3>
            <Link to={'/'}><button className='btn btn-primary btn-outline w-fit '>Home</button></Link>
        </div>
    );
};

export default NotFound;