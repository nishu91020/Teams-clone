import React from 'react';
import { Grid, makeStyles, Button } from '@material-ui/core';
import MeetingChatList from '../../Components/MeetingChatList';
import RoomChatCard from '../../Components/RoomChatCard';
import './styles.css';

const useStyles = makeStyles({
    roomChat: {
        height: '100%'
    },
    chatContainerOuter: {
        height: '93vh'
    }
});
const ChatScreen = () => {
    const classes = useStyles();
    return (
        <Grid container item xs={12} className={classes.chatContainerOuter}>
            <Grid container item xs={3} className={classes.roomChat}>
                <MeetingChatList />
            </Grid>
            <Grid container item xs={9} className={classes.roomChat}>
                <RoomChatCard />
            </Grid>
        </Grid>
    );
};

export default ChatScreen;
