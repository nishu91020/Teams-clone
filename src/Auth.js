import React, { useEffect, useState } from 'react';
import app from './firebase';
export const AuthContext = React.createContext();
export const AuthProvider = ({ children }) => {
    const [ currentUser, setCurentUser ] = useState(null);
    useEffect(() => {
        app.auth().onAuthStateChanged(user => {
            setCurentUser(user);
        });
    }, []);
    return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
