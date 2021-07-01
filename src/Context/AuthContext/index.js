import React, { useReducer } from 'react';
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
    const logout = async () => {
        await app
            .auth()
            .signOut()
            .then(() => {
                dispatch({ type: 'LOGOUT', payload: { user: null, token: null } });
                history.push('/');
                console.log('user logged out');
            })
            .catch(err => {
                console.log(err.message);
            });
    };
    const restore = () => {
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
                });
        });
    };

    return <UserContext.Provider value={{ state, signup, login, logout, restore }}>{children}</UserContext.Provider>;
};
