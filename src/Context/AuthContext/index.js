import React, { useContext, useEffect, useState, useReducer } from 'react';
import history from '../../history';
import app from '../../firebase';
export const UserContext = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, ...action.payload };
        case 'SIGNUP':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
export const UserProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(reducer, { user: { displayName: 'xyz' } });
    const signup = (username, email, password) => {
        app
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(res => {
                return res.user;
            })
            .then(async user => {
                await user.updateProfile({
                    displayName: username
                });
                console.log('user logged in');
                dispatch({ type: 'SIGNUP', payload: { user } });
                history.push('/home');
            })
            .catch(error => {
                alert(error.message);
            });
    };
    const login = (email, password) => {
        app
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(res => {
                const user = res.user;
                console.log(`user logged in with email ${user.email}`);
                dispatch({ type: 'LOGIN', payload: { user } });
                history.push('/home');
            })
            .catch(err => {
                alert(err.message);
            });
    };

    return <UserContext.Provider value={{ state, signup, login }}>{children}</UserContext.Provider>;
};
