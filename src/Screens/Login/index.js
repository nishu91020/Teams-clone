//user is provided with the option to login using gmail account.

import React, { useContext, useState } from 'react';
import history from '../../../src/history';
import { UserContext } from '../../Context/AuthContext';
import { Button, Grid, Typography, makeStyles, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

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
    const [ error, setError ] = useState(false);

    const handleLogin = async () => {
        await login();
        history.push('/');
    };
    const Alert = props => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    };
    const handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setError(false);
    };
    return (
        <Grid container item justify="center" alignItems="center" xs={12} style={{ height: '100%', flex: 1 }} direction="column">
            <img src="https://image.freepik.com/free-vector/couple-with-smartphones-talking-through-video-call_74855-5226.jpg" width="60%" alt="teams" />
            <Typography className={classes.logo}>Meet,collaborate and innovate!</Typography>
            <Button onClick={handleLogin} variant="outlined" color="primary">
                <img src="https://freesvg.org/img/1534129544.png" width="25px" alt="google" />
                Sign in with google
            </Button>
            <Snackbar open={error} autoHideDuration={2000} onClose={handleErrorClose}>
                <Alert severity="error">Login failed</Alert>
            </Snackbar>
        </Grid>
    );
};

export default Login;
