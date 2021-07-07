import React from 'react';
import { Card, Typography, CardContent, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    ChatCard: {
        justify: 'center',
        alignItems: 'center',
        backgroundColor: '#E5E5E5',
        height: '70px',
        width: '98%',
        borderRadius: '5px',
        margin: '1%',
        padding: '2%'
    },
    title: {
        fontSize: '17px'
    },
    sub: {
        fontSize: '14px',
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
