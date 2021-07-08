import React from 'react';
import { Grid, Divider, makeStyles, Typography, Avatar } from '@material-ui/core';
import moment from 'moment';
const useStyles = makeStyles({
    msgLocal: {
        backgroundColor: '#FEFFFF',
        opacity: 0.7,
        padding: '0.6%',
        margin: '0.5%',
        borderRadius: '5px',
        width: '70%'
    },
    userInfo: {
        fontSize: '10px',
        wordWrap: 'break-word'
    },
    msg: {
        fontSize: '13px'
    },
    messageContainer: {
        margin: '0.5%'
    }
});
const LocalMessage = ({ message }) => {
    const classes = useStyles();
    return (
        <Grid item container className={classes.messageContainer}>
            <Grid>
                <Avatar src={message?.sentBy.photoURL} />
            </Grid>
            <Grid item container direction="column" className={classes.msgLocal}>
                <Grid container item direction="row" justify="space-between">
                    <Typography className={classes.userInfo}>{message?.sentBy.displayName}</Typography>

                    <Typography className={classes.userInfo}>{moment(message?.sentAt).format('LT')}</Typography>
                </Grid>

                <Divider />
                <Grid item container>
                    <Typography className={classes.msg}>{message?.message}</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default LocalMessage;
