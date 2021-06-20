import React, { useState, useContext } from 'react';
import Header from '../../Components/Header';
import { Form } from '../../Components/Form';
import { Link, Route, useHistory } from 'react-router-dom';
import './styles.css';
// import { AuthContext } from '../../Auth';
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
    const { login } = useContext(UserContext);
    const classes = useStyle();

    const handleLogin = () => {
        login(email, password);
    };
    // const history = useHistory();
    // const { setCurrentUser } = useContext(AuthContext);
    // const handleLogin = () => {
    //     app
    //         .auth()            .signInWithEmailAndPassword(email, password)
    //         .then(res => {
    //             const user = res.user;
    //             console.log(`user logged in with email ${user.email}`);
    //             setCurrentUser(user);
    //             history.push('/home');
    //         })
    //         .catch(err => {
    //             alert(err.message);
    //         });

    // };
    return (
        <div className="container">
            <Header />
            <Form.AuthModal>
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
                <p>
                    Don't have an account?<Link to="/">Signup</Link>
                </p>
                <div onClick={handleLogin}>
                    <Form.BtnForm content="Login" />
                </div>
            </Form.AuthModal>
            <Link to="/home">Home</Link>
        </div>
    );
};

export default Login;
