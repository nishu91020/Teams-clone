import React from 'react';
import { Grid, makeStyles, Button } from '@material-ui/core';
import MeetingChatList from '../../Components/MeetingChatList';
import RoomChatCard from '../../Components/RoomChatCard';
import './styles.css';

const ChatScreen = () => {
    return (
        <Grid container item xs={12}>
            <Grid container item xs={3}>
                <MeetingChatList />
            </Grid>
            <Grid container item xs={9}>
                <RoomChatCard />
            </Grid>
        </Grid>
    );
};

export default ChatScreen;
