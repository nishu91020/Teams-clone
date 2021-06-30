import React from 'react';
import VideoCard from '../VideoCard';
import { Grid } from '@material-ui/core';
const CardContainer = () => {
    return (
        <Grid item container sm={12} direction="row">
            <VideoCard title="N" />
            <VideoCard title="M" />
            <VideoCard title="N" />
            <VideoCard title="M" />
            <VideoCard title="N" />
            <VideoCard title="N" />
            <VideoCard title="M" />
            <VideoCard title="N" />
            <VideoCard title="M" />
        </Grid>
    );
};

export default CardContainer;
