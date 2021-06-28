import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import { AuthProvider } from './Auth';
import { UserProvider } from './Context/AuthContext';
import { VideoProvider } from '../src/Context/VideoContext';
ReactDOM.render(
    <UserProvider>
        <VideoProvider>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </VideoProvider>
    </UserProvider>,
    document.getElementById('root')
);
