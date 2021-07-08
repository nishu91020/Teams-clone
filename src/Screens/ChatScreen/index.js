import React, { useEffect, useState, useContext } from 'react';
import { Grid, makeStyles, Button } from '@material-ui/core';
import MeetingChatList from '../../Components/MeetingChatList';
import RoomChatCard from '../../Components/RoomChatCard';
import { UserContext } from '../../Context/AuthContext';
import { getRoomOfUser } from '../../db';
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
    const [ rooms, setRooms ] = useState([]);
    const [ selectedRoom, setSelectedRoom ] = useState(null);
    const { state } = useContext(UserContext);
    useEffect(() => {
        const callback = snapshot => {
            let roomsList = [];
            snapshot.forEach(res => {
                const data = res.data();
                roomsList.push(data);
            });
            setRooms(roomsList);
        };
        getRoomOfUser(state.user.uid, callback);
    }, []);
    console.log(rooms, 'chatscreen');
    return (
        <Grid container item xs={12} className={classes.chatContainerOuter}>
            <Grid container item xs={3} className={classes.roomChat}>
                <MeetingChatList rooms={rooms} selectRoom={setSelectedRoom} />
            </Grid>
            <Grid container item xs={9} className={classes.roomChat}>
                <RoomChatCard room={selectedRoom} />
            </Grid>
        </Grid>
    );
};

export default ChatScreen;
