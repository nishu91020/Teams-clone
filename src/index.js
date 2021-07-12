import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { UserProvider } from './Context/AuthContext';
import { VideoProvider } from '../src/Context/VideoContext';
import { RoomProvider } from '../src/Context/RoomContext';

ReactDOM.render(
    <UserProvider>
        <VideoProvider>
            <RoomProvider>
                <React.StrictMode>
                    <App />
                </React.StrictMode>
            </RoomProvider>
        </VideoProvider>
    </UserProvider>,
    document.getElementById('root')
);
