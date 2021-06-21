import React, { useState, useEffect, useContext } from 'react';
import Header from '../../Components/Header';
import { Form } from '../../Components/Form';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/AuthContext';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import './styles.css';
import history from '../../history';
const useStyle = makeStyles({
    input: {
        width: '250px',
        margin: '3%',
        display: 'flex'
    }
});

const Signup = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ username, setUsername ] = useState('');
    const classes = useStyle();
    const { signup, state } = useContext(UserContext);
    const handleSignup = () => {
        signup(username, email, password);
    };
    useEffect(() => {
        if (state.token) {
            history.push('/home');
        }
    });
    return (
        <div className="container">
            <Header />
            <Form.AuthModal className="card">
                <Form.Title heading="Signup" />
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
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    type="text"
                    className={classes.input}
                    id="standard-basic"
                    size="small"
                    label="Username"
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
                <p>
                    Already have an account?<Link to="/Login">Login</Link>
                </p>
                <div onClick={handleSignup}>
                    <Form.BtnForm content="Signup" />
                </div>
            </Form.AuthModal>
        </div>
    );
};

export default Signup;
