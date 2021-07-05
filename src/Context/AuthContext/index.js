import React, { useReducer, useState } from 'react';
import history from '../../history';
import app from '../../firebase';
export const UserContext = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, ...action.payload };
        case 'SIGNUP':
            return { ...state, ...action.payload };
        case 'LOGOUT':
            return { ...state, ...action.payload };
        case 'RESTORE_TOKEN':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
export const UserProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(reducer, { user: {} });
    const [ isLoading, setIsLoading ] = useState(false);
    const signup = (username, email, password) => {
        setIsLoading(true);
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
            })
            .catch(error => {
                alert(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    const login = (email, password) => {
        setIsLoading(true);
        app
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(res => {
                const user = res.user;
                console.log(`user logged in with email ${user.email}`);
                dispatch({ type: 'LOGIN', payload: { user } });
            })
            .catch(err => {
                alert(err.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    const logout = async () => {
        setIsLoading(true);
        await app
            .auth()
            .signOut()
            .then(() => {
                dispatch({ type: 'LOGOUT', payload: { user: null, token: null } });
                console.log('user logged out');
            })
            .catch(err => {
                console.log(err.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    const restore = () => {
        setIsLoading(true);
        app.auth().onAuthStateChanged(user => {
            user
                .getIdToken()
                .then(token => {
                    dispatch({
                        type: 'RESTORE_TOKEN',
                        payload: {
                            user,
                            token
                        }
                    });
                })
                .catch(() => {
                    dispatch({
                        type: 'RESTORE_TOKEN',
                        payload: { user: null, token: null }
                    });
                })
                .finally(() => {
                    setIsLoading(false);
                });
        });
    };

    return <UserContext.Provider value={{ state, signup, login, logout, restore, isLoading }}>{children}</UserContext.Provider>;
};
