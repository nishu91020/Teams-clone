import React from 'react';
import { Grid, Divider, makeStyles,Avatar,Typography } from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles({
    msgLocal: {
        backgroundColor: '#dcdcdc',
        opacity: 0.8,
        padding: '1%',
        margin: '1%',
        borderRadius: '5px',
        width: '80%'
    },
    userInfo: {
        fontSize: '10px',
        wordWrap: 'break-word'
    },
    msg: {
        fontSize: '13px',
        fontFamily: 'cursive'
    },
});
const Message = ({message}) => {
    const classes = useStyles();
    return (
        <Grid item container direction="row" className={classes.msgLocal}>
            <Grid item container>
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
        </Grid>
    );
};

export default Message;
