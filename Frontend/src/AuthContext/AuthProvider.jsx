import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
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

    const login = (email, password)=>{
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout=()=>{
        return signOut(auth)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser=>{
            if(currentUser && currentUser.email){
                setUser(currentUser)
            }else{
                setUser(null)
            }
            setLoading(false)
        })
        return ()=> unsubscribe()
    }, [])

    return (
        <AuthContext.Provider value={{
            googleLogin,
            signIn,
            user,
            setUser,
            loading,
            setLoading,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;