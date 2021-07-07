import React from 'react';
import { TextField, Grid, makeStyles, Button } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import Message from '../Message';
import LocalMessage from '../LocalMessage';
import './styles.css';
const useStyles = makeStyles({
    chatContainer: {
        backgroundColor: '#EFEEEE',
        height: '9%',
        padding: '1%',
        fontSize: '18px',
        fontWeight: 'bold'
    },
    joinBtn: {
        justiy: 'flex-end'
    },
    chatInput: {
        border: '2px solid #3f51b5',
        padding: '1px',
        borderRadius: '5px'
    },
    msgList: {
        paddingLeft: '2px',
        overflowX: 'hidden',
        overflowY: 'auto',
        height: '83%',
        width: '100%'
    }
});
const RoomChatCard = () => {
    const classes = useStyles();

    return (
        <Grid container item style={{ height: '100%', width: '100%' }} direction="column">
            <Grid container item className={classes.chatContainer} justify="space-between">
                Meeting Title
                <Button size="small" color="primary" variant="contained" className={classes.joinBtn}>
                    join
                </Button>
            </Grid>

            <Grid container item className={classes.msgList} direction="row" justify="center" alignItems="center">
                <LocalMessage />
                <LocalMessage />
                <LocalMessage />
                <LocalMessage />
                <LocalMessage />
                <LocalMessage />
                <LocalMessage />
                <LocalMessage />
                <LocalMessage />
            </Grid>

            <Grid container item className={classes.chatInput} justify="center">
                <TextField style={{ width: '85%' }} placeholder="message" />
                <Send color="primary" />
            </Grid>
        </Grid>
    );
};

export default RoomChatCard;
