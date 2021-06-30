import React, { useReducer } from 'react';
import axios from 'axios';
import history from '../../history';
export const VideoContext = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'ROOM':
            return { ...state, ...action.payload };
        case 'GENERATETOKEN':
            return { ...state, ...action.payload };
        case 'GETROOM':
            return { ...state, ...action.payload };

        default:
            return state;
    }
};
const api = axios.create({
    baseURL: 'http://localhost:8080'
});
export const VideoProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(reducer, { room: {}, accessToken: '', track: [], err: {} });
    const room = () => {
        api
            .get('/rooms', {})
            .then(room => {
                dispatch({ type: 'ROOM', payload: { room } });
            })
            .catch(err => {
                dispatch({ type: 'ERROR', payload: { err } });
            });
    };
    const generateToken = (roomId, name) => {
        api
            .get('/token', {
                params: {
                    room: roomId,
                    name: name
                }
            })
            .then(res => {
                dispatch({
                    type: 'GENERATETOKEN',
                    payload: { accessToken: res.data.token }
                });
            })
            .catch(err => {
                dispatch({ type: 'ERROR', payload: { err: err } });
            });
    };
    const getRoom = roomId => {
        api
            .get('/room', {
                params: { room: roomId }
            })
            .then(res => {
                console.log(res.data);

                dispatch({ type: 'GETROOM', payload: { room: res.data.room } });
                history.push(`/VideoScreen/${res.data.room.uniqueName}`);
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: 'ERROR', payload: { err: err } });
            });
    };
    return <VideoContext.Provider value={{ state, room, generateToken, getRoom }}>{children}</VideoContext.Provider>;
};
