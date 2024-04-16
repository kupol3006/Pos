// contexts/AuthContext.js
import React, { createContext, useContext } from 'react';
import { destroyCookie } from 'nookies';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const router = useRouter();

    const logout = () => {
        destroyCookie(undefined, 'code');
        destroyCookie(undefined, 'token');
        router.push('/Login');
    };


    return (
        <AuthContext.Provider value={{ logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);