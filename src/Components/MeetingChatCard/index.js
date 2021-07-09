import React from 'react';
import { Card, Typography, Button, makeStyles } from '@material-ui/core';

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
const MeetingChatCard = ({ room, selectRoom }) => {
    console.log(room);
    const classes = useStyles();
    return (
        <Card className={classes.ChatCard} onClick={() => selectRoom(room)}>
            <Typography className={classes.title}>{room.roomTitle}</Typography>
        </Card>
    );
};

export default MeetingChatCard;
