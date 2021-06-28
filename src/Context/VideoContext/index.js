import React, { useReducer } from 'react';
import axios from 'axios';
import { connect, createLocalTracks } from 'twilio-video';

export const VideoContext = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'ROOM':
            return { ...state, ...action.payload };
        case 'GENERATETOKEN':
            return { ...state, ...action.payload };
        case 'LOCALTRACK':
            return { ...state, ...action.payload };
        case 'DISABLETRACK':
            return { ...state, ...action.payload };
        case 'CAMERA':
            return { ...state, ...action.payload };
        case 'MIC':
            return { ...state, ...action.payload };
        case 'ERROR':
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
    return <VideoContext.Provider value={{ state, room, generateToken }}>{children}</VideoContext.Provider>;
};
