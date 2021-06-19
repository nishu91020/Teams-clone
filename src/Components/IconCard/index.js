import React from 'react';
import ChatIcon from '@material-ui/icons/Chat';
import VideocamIcon from '@material-ui/icons/Videocam';
import { makeStyles, Paper } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
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
    const history = useHistory();
    const handleText = () => {
        history.push('/TextChat');
    };
    const handleVideo = () => {
        history.push('/VideoChat');
    };
    return (
        <div className="cardContainer">
            <span onClick={() => handleText()}>
                <Paper elevation={5} className={classes.card}>
                    <ChatIcon />
                </Paper>
            </span>
            <span onClick={() => handleVideo()}>
                <Paper elevation={5} className={classes.card}>
                    <VideocamIcon />
                </Paper>
            </span>
        </div>
    );
};

export default IconCard;
