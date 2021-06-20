import React, { useEffect, useState } from 'react';
import app from './firebase';
export const AuthContext = React.createContext();
export const AuthProvider = ({ children }) => {
    const [ currentUser, setCurrentUser ] = useState({ displayName: 'abc' });
    useEffect(() => {
        app.auth().onAuthStateChanged(user => {
            // console.log(user.);
            setCurrentUser(user);
        });
    });
    return <AuthContext.Provider value={{ currentUser, setCurrentUser }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
