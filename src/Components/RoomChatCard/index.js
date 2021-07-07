import React, { useState } from 'react';
import { TextField, Grid, makeStyles, Button } from '@material-ui/core';
import { MoreVert, Send } from '@material-ui/icons';

const useStyles = makeStyles({
    chatContainer: {
        backgroundColor: '#EFEEEE',
        height: '45px',
        padding: '1%',
        fontSize: '18px',
        fontWeight: 'bold'
    },
    joinBtn: {
        justiy: 'flex-end'
    },
    chatInput: {
        marginTop: '45%'
    }
});
const RoomChatCard = () => {
    const classes = useStyles();

    return (
        <Grid container item direction="column">
            <Grid container item className={classes.chatContainer} justify="space-between">
                Meeting Title
                <Button size="small" color="primary" variant="contained" className={classes.joinBtn}>
                    join
                </Button>
            </Grid>
            <Grid container item className={classes.chatInput} justify="space-evenly">
                <TextField style={{ width: '90%' }} placeholder="message" />
                <Send color="primary" />
            </Grid>
        </Grid>
    );
};

export default RoomChatCard;
