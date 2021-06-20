import React, { useState, useContext } from 'react';
import Header from '../../Components/Header';
import { Form } from '../../Components/Form';
import { Link } from 'react-router-dom';
import app from '../../firebase';
import { AuthProvider } from '../../Auth';
import { UserContext } from '../../Context/AuthContext';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import './styles.css';
import { useHistory } from 'react-router-dom';
const useStyle = makeStyles({
    input: {
        width: '250px',
        margin: '3%',
        display: 'flex'
    }
});

const Signup = () => {
    const history = useHistory();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ username, setUsername ] = useState('');
    const classes = useStyle();
    const { signup } = useContext(UserContext);
    const handleSignup = () => {
        signup(username, email, password);
    };
    // const handleSignup = () => {
    //     console.log(`user email is ${email} and password is ${password}`);
    //     app
    //         .auth()
    //         .createUserWithEmailAndPassword(email, password)
    //         .then(res => {
    //             return res.user;
    //         })
    //         .then(user => {
    //             return user.updateProfile({
    //                 displayName: username
    //             });
    //         })
    //         .then(() => {
    //             console.log(`user logged in`);
    //             history.push('/home');
    //         })
    //         .catch(error => {
    //             alert(error.message);
    //         });
    // };

    return (
        <AuthProvider>
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
        </AuthProvider>
    );
};

export default Signup;
