import React, { useState, useContext, useEffect } from 'react';
import history from '../../../src/history';
import { UserContext } from '../../Context/AuthContext';
import { Button, Grid, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    logo: {
        fontSize: '30px',
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
        <Grid container item justify="center" alignItems="center" xs={12} style={{ height: '100%', flex: 1 }} direction="column">
            <img src="https://image.freepik.com/free-vector/couple-with-smartphones-talking-through-video-call_74855-5226.jpg" width="750px" />
            <Typography className={classes.logo}>Meet,collaborate and innovate!</Typography>
            <Button onClick={handleLogin} variant="outlined" color="primary">
                <img src="https://freesvg.org/img/1534129544.png" width="25px" />
                Sign in with google
            </Button>
        </Grid>
    );
};

export default Login;
