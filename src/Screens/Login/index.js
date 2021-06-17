import React from 'react';
import Header from '../../Components/Header';
import { Form } from '../../Components/Form';
import { Link } from 'react-router-dom';
import './styles.css';
const Login = () => {
    return (
        <div className="container">
            <Header />
            <Form.AuthModal>
                <Form.Title heading="Login" />
                <Form.InputField label="Username" type="text" />
                <Form.InputField label="Password" type="password" />
                <p>
                    Don't have an account?<Link to="/">Signup</Link>
                </p>
                <Form.BtnForm content="Login" />
            </Form.AuthModal>
        </div>
    );
};

export default Login;
