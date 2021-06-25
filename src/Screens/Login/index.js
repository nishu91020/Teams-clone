import React, { useState, useContext, useEffect } from 'react';
import Header from '../../Components/Header';
import { Form } from '../../Components/Form';
import { Link, Route } from 'react-router-dom';
import './styles.css';
import history from '../../../src/history';
import { UserContext } from '../../Context/AuthContext';
import { TextField, makeStyles } from '@material-ui/core';

import app from '../../firebase';
const useStyle = makeStyles({
    input: {
        width: '250px',
        margin: '3%',
        display: 'flex'
    }
});

const Login = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const { login, state } = useContext(UserContext);
    const classes = useStyle();
    useEffect(() => {
        if (state.token) {
            history.push('/home');
        }
    });
    const handleLogin = () => {
        login(email, password);
    };
    const navigateSignup = () => {
        history.push('/');
    };
    return (
        <div className="container">
            <Header />
            <Form.AuthModal>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg"
                    width="48"
                    height="48"
                    alt="Teams"
                />
                <Form.Title heading="Login" />
                <TextField
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    className={classes.input}
                    id="standard-basic"
                    size="small"
                    label="Email"
                />
                <TextField
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    className={classes.input}
                    id="standard-basic"
                    size="small"
                    label="Password"
                />

                <div onClick={handleLogin}>
                    <Form.BtnForm content="Login" />
                </div>
                <div onClick={navigateSignup}>
                    <Form.BtnOutline content="Signup" />
                </div>
            </Form.AuthModal>
        </div>
    );
};

export default Login;
