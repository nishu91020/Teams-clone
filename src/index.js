import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import { AuthProvider } from './Auth';
import { UserProvider } from './Context/AuthContext';
ReactDOM.render(
    <UserProvider>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </UserProvider>,
    document.getElementById('root')
);
