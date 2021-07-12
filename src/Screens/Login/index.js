//user is provided with the option to login using gmail account.

import React, { useContext, useState } from 'react';
import history from '../../../src/history';
import { UserContext } from '../../Context/AuthContext';
import { Button, Grid, Typography, makeStyles } from '@material-ui/core';

import loginImg from '../../images/loginImg.jpg';
const useStyles = makeStyles({
    logo: {
        fontSize: '200%',
        fontFamily: 'cursive',
        fontStyle: 'italic',
        margin: '1%'
    }
});
const Login = () => {
    const classes = useStyles();
    const { login } = useContext(UserContext);

    const handleLogin = async () => {
        await login();
        history.push('/');
    };

    return (
        <Grid container item justify="center" alignItems="center" xs={12} style={{ height: '100%', flex: 1, marginTop: '5%' }} direction="column">
            <img src={loginImg} width="60%" alt="teams" />
            <Typography className={classes.logo}>Meet,collaborate and innovate!</Typography>
            <Button onClick={handleLogin} variant="outlined" color="primary">
                <img src="https://freesvg.org/img/1534129544.png" width="25px" alt="google" />
                Sign in with google
            </Button>
        </Grid>
    );
};

export default Login;
