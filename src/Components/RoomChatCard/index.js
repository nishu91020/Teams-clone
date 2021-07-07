import React from 'react';
import { TextField, Grid, makeStyles } from '@material-ui/core';
import { Send } from '@material-ui/icons';

const useStyles = makeStyles({
    textBox: {
        width: '100%'
    }
});
const RoomChatCard = () => {
    const classes = useStyles();
    return (
        <Grid container item sm={12} className={classes.textBox}>
            <TextField style={{ width: '95%' }} placeholder="message" />
            <Send />
        </Grid>
    );
};

export default RoomChatCard;
