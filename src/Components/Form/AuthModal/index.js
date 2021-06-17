import React from 'react';

import { Paper } from '@material-ui/core';
import './styles.css';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    outer: {
        padding: '3%',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    }
});
const AuthModal = ({ children }) => {
    const classes = useStyles();
    return (
        <div className="FormContainer">
            <Paper className={classes.outer} elevation={3}>
                {children}
            </Paper>
        </div>
    );
};

export default AuthModal;
