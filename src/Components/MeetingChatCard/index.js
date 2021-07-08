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
const MeetingChatCard = () => {
    const classes = useStyles();
    return (
        <Card container item className={classes.ChatCard} direction="column">
            <Typography className={classes.title}>Meeting Name</Typography>
            <Typography className={classes.sub}>last message</Typography>
        </Card>
    );
};

export default MeetingChatCard;
