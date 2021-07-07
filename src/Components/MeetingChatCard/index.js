import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    ChatCard: {
        backgroundColor: '#E5E5E5',
        height: '90px',
        borderRadius: '5px',
        marginTop: '5px',
        padding: '2px'
    }
});
const MeetingChatCard = () => {
    const classes = useStyles();
    return (
        <Grid container item xs={12} className={classes.ChatCard} direction="column">
            <h5>meeting name</h5>
            <div>last message</div>
        </Grid>
    );
};

export default MeetingChatCard;
