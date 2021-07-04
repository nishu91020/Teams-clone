//chat component of meeting room.

import React from 'react';
import './styles.css';
import { Send, Close } from '@material-ui/icons';
import { TextField, makeStyles, Grid, Button } from '@material-ui/core';

const useStyles = makeStyles({
    input: {
        width: '270px'
    },
    box: {
        paddingLeft: '1%'
    }
});
const ChatBox = props => {
    const classes = useStyles();
    // console.log('helooooo');
    return (
        <Grid sm={12} className={classes.box}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>Meeting Chat</h3>
                <Button
                    size="small"
                    disableRipple
                    disableFocusRipple
                    variant="text"
                    className="cross"
                    onClick={props.handleChat}
                >
                    <Close />
                </Button>
            </div>
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
        </Grid>
    );
};

export default ChatBox;
