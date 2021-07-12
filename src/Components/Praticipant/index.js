//component to show video of the participant in the room

import React, {  useEffect, useState } from 'react';
import VideoTrack from '../VideoTracks';
import {Grid,makeStyles } from '@material-ui/core';
import { useParticipantPublications } from '../../Hooks/useParticipantPublications';
import { useParticipantTracks } from '../../Hooks/useParticipantTracks';
import { useIsTrackEnabled } from '../../Hooks/useIsTrackEnabled';

import { getParticipant } from '../../db';

const Participant = ({ participant, onClick }) => {
    const pubs = useParticipantPublications(participant);
    const filteredPubs = pubs.filter(pub => pub !== undefined);
    const audioPubs = filteredPubs.find(pub => pub.kind === 'audio');
    const videoPubs = filteredPubs.find(pub => pub.kind === 'video');
    const audioTrack = useParticipantTracks(audioPubs);
    const isAudioEnabled = useIsTrackEnabled(audioTrack);
    const videoTrack = useParticipantTracks(videoPubs);
    const isVideoEnabled = useIsTrackEnabled(videoTrack);
    const [ user, setUser ] = useState(undefined);
    const classes = useStyles();

    useEffect(() => {
        const getUser =async()=>{
            const res=await getParticipant(participant?.identity);
            setUser(res.data());
        }
            getUser();
        },
        [ participant ]
    );
    console.log( "participant=",user);
    const select = (e) => {
        onClick(participant);
    };

    return (
         <Grid className={classes.cardContainer} onClick={select}>
           
                <VideoTrack  track={[ audioTrack, videoTrack ]} isVideoEnabled={isVideoEnabled} user={user}/>
       
         </Grid>
    );
};

const useStyles = makeStyles({
    cardContainer: {
        width:'100%'
    },

})

export default Participant;
