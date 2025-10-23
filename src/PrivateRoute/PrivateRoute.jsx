import React, { use, useContext } from 'react';

import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../AuthContext/AuthContext';
import Loading from '../Loading/Loading';



const PrivateRoute = ({children}) => {

    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
     
    
    if(loading){
        return <Loading></Loading>
    }
    if(user){
        return (
            <>
                {children}
            </>
        )
    }
    


    return (
        <Navigate state={location.pathname} to={'/auth/login'}></Navigate>
    );
};

export default PrivateRoute;