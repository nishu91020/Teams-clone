import React from 'react';
import { Grid, makeStyles, Button } from '@material-ui/core';
import MeetingChatCard from '../../Components/MeetingChatCard';
import RoomChatCard from '../../Components/RoomChatCard';
import './styles.css';
const useStyles = makeStyles({
    chatContainer: {
        backgroundColor: '#EFEEEE',
        padding: '1%',
        boxShadow: '4px 4px 8px 4px rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);'
    },
    chatCardContainer: {
        marginTop: '34%',
        paddingLeft: '15px'
    }
});
const ChatScreen = () => {
    const classes = useStyles();
    return (
        <Grid container item xs={12} style={{ height: '93vh', overflowY: 'hidden' }}>
            <Grid container item xs={12} className={classes.chatContainer}>
                <Grid container item xs={3}>
                    Chats
                </Grid>
                <Grid container item xs={9}>
                    <Grid container item xs={8}>
                        Meeting Title
                    </Grid>

                    <Grid container item xs={1}>
                        <Button color="primary" variant="contained">
                            join
                        </Button>
                    </Grid>
                </Grid>
                <Grid />
            </Grid>
            <Grid container item xs={12} direction="row" style={{ height: '93vh' }}>
                <Grid container item xs={3} className="meetingList">
                    <MeetingChatCard />
                    <MeetingChatCard />
                    <MeetingChatCard />
                    <MeetingChatCard />
                    <MeetingChatCard />
                    <MeetingChatCard />
                    <MeetingChatCard />
                    <MeetingChatCard />
                    <MeetingChatCard />
                    <MeetingChatCard />
                    <MeetingChatCard />
                    <MeetingChatCard />
                </Grid>
                <Grid container item xs={9} className={classes.chatCardContainer}>
                    <RoomChatCard />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ChatScreen;
