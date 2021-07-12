import React, { useReducer, useState } from 'react';
import { addUser } from '../../db';
import { auth } from '../../firebase';
import { signin, signout } from '../../firebaseAuth';
import history from '../../history';
export const UserContext = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'SIGNIN':
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
    const [ state, dispatch ] = useReducer(reducer, { user: {}, token: undefined });
    const [ isLoading, setIsLoading ] = useState(false);
    const login = async () => {
        setIsLoading(true);
        try {
            const authCredentials = await signin();
            const user = authCredentials.user;
            await addUser(user);
            const token = await user.getIdToken();
            dispatch({ type: 'SIGNIN', payload: { user: { uid: user.uid, displayName: user.displayName, email: user.email, photoURL: user.photoURL }, token } });
        } catch (error) {
            console.log(error.message);
        } finally {
            setIsLoading(false);
        }
    };
    const logout = async () => {
        setIsLoading(true);
        try {
            await signout();
            dispatch({ type: 'LOGOUT', payload: { user: undefined, token: undefined } });
        } catch (error) {
            alert(error.message);
        } finally {
            setIsLoading(false);
        }
    };
    const restore = () => {
        setIsLoading(true);
        auth.onAuthStateChanged(user => {
            if (user) {
                user
                    .getIdToken()
                    .then(token => {
                        dispatch({
                            type: 'RESTORE_TOKEN',
                            payload: {
                                user: { uid: user.uid, displayName: user.displayName, email: user.email, photoURL: user.photoURL },
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
            }
            else {
                dispatch({
                    type: 'RESTORE_TOKEN',
                    payload: { user: null, token: null }
                });
                setIsLoading(false);
            }
        });
    };

    return <UserContext.Provider value={{ state, login, logout, restore, isLoading }}>{children}</UserContext.Provider>;
};
