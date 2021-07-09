import React, { useContext } from 'react';
import { Card, Typography, Button, makeStyles } from '@material-ui/core';
import { VideoContext } from '../../Context/VideoContext';
const useStyles = makeStyles({
    ChatCard: {
        backgroundColor: '#FEFEFF',
        height: '45px',
        width: '94%',
        borderRadius: '5px',
        padding: '2%',
        margin: '1%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: '15px',
        fontFamily: 'cursive'
    },
    sub: {
        fontSize: '10px',
        color: 'grey'
    }
});
const MeetingChatCard = ({ room }) => {
    const { selectedRoom } = useContext(VideoContext);
    console.log(room);
    const classes = useStyles();
    return (
        <Card className={classes.ChatCard} onClick={() => selectedRoom(room)}>
            <Typography className={classes.title}>{room.roomTitle}</Typography>
        </Card>
    );
};

export default MeetingChatCard;
