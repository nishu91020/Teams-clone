import React from 'react';
import { makeStyles, Avatar, Grid } from '@material-ui/core';
const useStyles = makeStyles({
    blue: {
        backgroundColor: '#3f51b5'
    },
    videoCardItem: {
        backgroundColor: '#272727',
        padding: '3%',
        borderRadius: '5px',
        margin: '0.1%'
    }
});
const VideoCard = props => {
    const classes = useStyles();
    return (
        <Grid sm={3} className={classes.videoCardItem}>
            <Avatar alignItems="center" justify="center" className={classes.blue}>
                {props.title}
            </Avatar>
        </Grid>
    );
};

export default VideoCard;
