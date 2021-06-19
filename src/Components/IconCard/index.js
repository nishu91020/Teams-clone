import React from 'react';
import ChatIcon from '@material-ui/icons/Chat';
import VideocamIcon from '@material-ui/icons/Videocam';
import { makeStyles, Paper } from '@material-ui/core';
const useStyles = makeStyles({
    card: {
        background: '#3f51b5',
        padding: '4%',
        display: 'inline-block',
        margin: '2%',
        color: 'white'
    }
});
const IconCard = () => {
    const classes = useStyles();
    return (
        <div className="cardContainer">
            <span>
                <Paper elevation={5} className={classes.card}>
                    <ChatIcon />
                </Paper>
            </span>
            <span>
                <Paper elevation={5} className={classes.card}>
                    <VideocamIcon />
                </Paper>
            </span>
        </div>
    );
};

export default IconCard;
