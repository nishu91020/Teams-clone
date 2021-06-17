import React, { useState } from 'react';
import Header from '../../Components/Header';
import { Form } from '../../Components/Form';
import { Link } from 'react-router-dom';
import './styles.css';
import { AuthProvider, useAuth } from '../../Context/AuthContext';
const Signup = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ username, setUserName ] = useState('');

    return (
        <div className="container">
            <Header />
            <AuthProvider>
                <Form.AuthModal className="card">
                    <Form.Title heading="Signup" />
                    <Form.InputField
                        label="Username"
                        value={username}
                        onChange={e => setUserName(e.target.value)}
                        type="text"
                    />
                    <Form.InputField
                        label="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type="email"
                    />
                    <Form.InputField
                        label="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <p>
                        Already have an account?<Link to="/Login">Login</Link>
                    </p>
                    <Form.BtnForm content="Signup" />
                </Form.AuthModal>
            </AuthProvider>
        </div>
    );
};

export default Signup;
