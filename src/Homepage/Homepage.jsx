import React from 'react';
import { auth } from '../firebase/firebase';
import Nav from './nav/Nav';
import Footer from './footer/Footer';
import { Outlet } from 'react-router';

const Homepage = () => {

    
    return (
        <div className='flex flex-col min-h-screen' data-theme="light">
            <Nav></Nav>
            <main className='flex-1'>
                <Outlet></Outlet>
            </main>
           <Footer></Footer>
        </div>
    );
};

export default Homepage;