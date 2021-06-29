import React from 'react';
import './styles.css';
import { Send } from '@material-ui/icons';
import { TextField, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    input: {
        width: '280px'
    }
});
const ChatBox = () => {
    const classes = useStyles();
    return (
        <div className="chat">
            <h3>Meeting Chat</h3>
            <div className="message">
                <TextField
                    className={classes.input}
                    size="small"
                    id="standard-basic"
                    variant="standard"
                    type="text"
                    placeholder="Message"
                />
                <Send />
            </div>
        </div>
    );
};

export default ChatBox;
