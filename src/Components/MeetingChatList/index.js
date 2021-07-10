import React, { useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import MeetingChatCard from '../MeetingChatCard';
import Dialogs from '../Dialogs';
import './styles.css';

const useStyles = makeStyles({
    chatContainer: {
        backgroundColor: '#EFEEEE',
        height: '9%',
        padding: '1%',
        fontSize: '18px',
        fontWeight: 'bold'
    },
    meetingList: {
        padding: '2px',
        overflowX: 'hidden',
        overflowY: 'auto',
        height: '90%'
    }
});
const MeetingChatList = ({ rooms, selectRoom }) => {
    const classes = useStyles();
    return (
        <Grid container item style={{ height: '100%', overflowY: 'hidden' }}>
            <Grid container item className={classes.chatContainer} alignItems="center" justify="space-between">
                Chats
                <Dialogs />
            </Grid>
            <Grid item container className={classes.meetingList} direction="row">
                <Grid container item direction="column">
                    {rooms.map((room, key) => <MeetingChatCard room={room} key={key} selectRoom={selectRoom} />)}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default MeetingChatList;
