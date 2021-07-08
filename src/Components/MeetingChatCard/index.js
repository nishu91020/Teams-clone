import React from 'react';
import { Card, Typography, CardContent, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    ChatCard: {
        justify: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f0ec',
        height: '50px',
        width: '98%',
        borderRadius: '5px',
        margin: '1%',
        padding: '2%'
    },
    title: {
        fontSize: '13px'
    },
    sub: {
        fontSize: '10px',
        color: 'grey'
    }
});
const MeetingChatCard = ({ room, selectRoom }) => {
    const classes = useStyles();
    return (
        <Card className={classes.ChatCard} onClick={() => selectRoom(room)}>
            <Typography className={classes.title}>{room.roomTitle}</Typography>
        </Card>
    );
};

export default MeetingChatCard;
