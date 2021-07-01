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
    const createRoom = () => {
        api
            .get('/rooms', {})
            .then(res => {
                dispatch({ type: 'ROOM', payload: { room: res.data } });
                history.push(`/CreateRoom/${res.data.uniqueName}`);
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
                console.log('token=', res.data.token);
                history.push(`/VideoScreen/${roomId}`);
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
    return (
        <VideoContext.Provider value={{ state, createRoom, generateToken, getRoom }}>{children}</VideoContext.Provider>
    );
};
