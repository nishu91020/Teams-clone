import React, { useReducer, useState, useContext } from 'react';
import axios from 'axios';
import * as uuid from 'uuid';
import { addRoom, addMeetingToUser, addUserToMeeting, fetchRoom } from '../../db';
import history from '../../history';
import { UserContext } from '../AuthContext';
import { CloudDownloadTwoTone } from '@material-ui/icons';
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
    const [ isConnecting, setIsConnecting ] = useState(false);
    const { state: authState } = useContext(UserContext);
    const createRoom = async name => {
        setIsConnecting(true);
        try {
            const roomId = `${uuid.v4()}`;
            await addRoom({ roomId, roomTitle: name });
            await addMeetingToUser(authState.user.uid, { roomId, roomTitle: name });
            await addUserToMeeting(authState.user, roomId);
            dispatch({ type: 'ROOM', payload: { room: roomId } });
            // console.log(res.data.uniqueName);
        } catch (err) {
            dispatch({ type: 'ERROR', payload: { err } });
        } finally {
            setIsConnecting(false);
        }
    };
    const generateToken = roomId => {
        setIsConnecting(true);
        api
            .get('/token', {
                params: {
                    room: roomId
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
            })
            .finally(() => {
                setIsConnecting(false);
            });
    };
    const joinChat = async roomId => {
        setIsConnecting(true);
        try {
            const res = await validRoom(roomId);
            console.log(res);
            if (res) {
                await addMeetingToUser(authState.user.uid, { ...res.room });
                await addUserToMeeting(authState.user, roomId);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setIsConnecting(false);
        }
    };
    const validRoom = async roomId => {
        setIsConnecting(true);

        try {
            const doc = await fetchRoom(roomId);
            if (doc.exists) return doc.data();
            else return false;
        } catch (err) {
            return false;
        } finally {
            setIsConnecting(false);
        }
    };
    return <VideoContext.Provider value={{ state, joinChat, validRoom, createRoom, generateToken, isConnecting }}>{children}</VideoContext.Provider>;
};
