import React from 'react';
import { Card, Typography, Button, makeStyles } from '@material-ui/core';
import { Share } from '@material-ui/icons';
import CopyToClipboard from 'react-copy-to-clipboard';
const useStyles = makeStyles({
    ChatCard: {
        backgroundColor: '#FEFEFF',
        fontFamily: 'Helvetica',
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
        fontSize: '13px'
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
            <CopyToClipboard text={room.roomId}>
                <Button style={{ justifyContent: 'right' }}>
                    invite<Share />
                </Button>
            </CopyToClipboard>
        </Card>
    );
};

export default MeetingChatCard;
