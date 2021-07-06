import React from 'react';
import { Grid } from '@material-ui/core';
import MeetingChatCard from '../../Components/MeetingChatCard';
const ChatScreen = () => {
    return (
        <Grid container item xs={12}>
            <Grid container item xs={4}>
                <MeetingChatCard />
            </Grid>
            <Grid container item xs={8}>
                chats
            </Grid>
        </Grid>
    );
};

export default ChatScreen;
