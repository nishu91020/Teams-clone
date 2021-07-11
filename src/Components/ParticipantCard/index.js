import React from 'react';
import { Avatar, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    text: {
        fontFamily: 'cursive',
        fontSize: '18px'
    },
    card: {
        marginTop: '5px'
    }
});
const ParticipantCard = ({ participant }) => {
    const classes = useStyles();
    return (
        <Grid container item direction="row" className={classes.card}>
            <Avatar src={participant.photoURL} />
            <div className={classes.text}>{participant.displayName}</div>
        </Grid>
    );
};

export default ParticipantCard;
