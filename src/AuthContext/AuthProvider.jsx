import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/firebase';

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const googleProvider =new GoogleAuthProvider()

    const googleLogin=()=>{
        console.log(auth);
        return signInWithPopup(auth, googleProvider)
    }

    const signIn =(email, password)=>{
        return createUserWithEmailAndPassword(auth, email, password)
    }


    return (
        <AuthContext.Provider value={{
            googleLogin,
            signIn,
            user,
            setUser,
            loading,
            setLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;