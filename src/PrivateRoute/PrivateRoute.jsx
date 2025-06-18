import React, { use, useContext } from 'react';

import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../AuthContext/AuthContext';



const PrivateRoute = ({children}) => {

    const {user} = useContext(AuthContext);
    const location = useLocation();
     
    

    if(user){
        return (
            <>
                {children}
            </>
        )
    }


    return (
        <Navigate state={location.pathname} to={'/login'}></Navigate>
    );
};

export default PrivateRoute;