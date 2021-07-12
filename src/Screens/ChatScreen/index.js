import React, { useEffect, useState, useContext } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import MeetingChatList from '../../Components/MeetingChatList';
import RoomChatCard from '../../Components/RoomChatCard';
import { UserContext } from '../../Context/AuthContext';
import { VideoContext } from '../../Context/VideoContext';
import { getRoomOfUser } from '../../db';
import './styles.css';

const useStyles = makeStyles({
    roomChat: {
        height: '100%'
    },
    chatContainerOuter: {
        height: '94vh'
    }
});
const ChatScreen = () => {
    const classes = useStyles();
    const [ rooms, setRooms ] = useState([]);
    const { state: authState } = useContext(UserContext);
    const { state } = useContext(VideoContext);
    useEffect(() => {
        const callback = snapshot => {
            let roomsList = [];
            snapshot.forEach(res => {
                const data = res.data();
                roomsList.push(data);
            });
            setRooms(roomsList);
        };
        getRoomOfUser(authState.user.uid, callback);
    }, []);
    return (
        <Grid container item xs={12} className={classes.chatContainerOuter}>
            <Grid container item xs={3} className={classes.roomChat}>
                <MeetingChatList rooms={rooms} />
            </Grid>
            <Grid container item xs={9} className={classes.roomChat}>
                <RoomChatCard room={state.room} />
            </Grid>
        </Grid>
    );
};

export default ChatScreen;
