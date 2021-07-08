import React from 'react';
import { Grid, Divider, makeStyles, Typography, Avatar } from '@material-ui/core';

const useStyles = makeStyles({
    msgLocal: {
        backgroundColor: '#4169e1',
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
const LocalMessage = () => {
    const classes = useStyles();
    return (
        <Grid item container className={classes.messageContainer}>
            <Grid>
                <Avatar>N</Avatar>
            </Grid>
            <Grid item container direction="column" className={classes.msgLocal}>
                <Grid container item direction="row" justify="space-between">
                    <Typography className={classes.userInfo}>Nishu Rai</Typography>

                    <Typography className={classes.userInfo}> 08/07/21 6:00 pm</Typography>
                </Grid>

                <Divider />
                <Grid item container>
                    <Typography className={classes.msg}>ashajshagdydfwytweuwehswujhsnajnbxzxczxzvcxv</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default LocalMessage;
