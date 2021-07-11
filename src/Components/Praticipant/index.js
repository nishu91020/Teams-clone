import React, { useRef, useEffect, useState, useContext } from 'react';
import './styles.css';
import VideoTrack from '../VideoTracks';
import { Avatar, Grid } from '@material-ui/core';
import { useParticipantPublications } from '../../Hooks/useParticipantPublications';
import { useParticipantTracks } from '../../Hooks/useParticipantTracks';
import { useIsTrackEnabled } from '../../Hooks/useIsTrackEnabled';

const Participant = ({ participant, onClick }) => {
    const pubs = useParticipantPublications(participant);
    const filteredPubs = pubs.filter(pub => pub !== undefined);
    const audioPubs = filteredPubs.find(pub => pub.kind === 'audio');
    const videoPubs = filteredPubs.find(pub => pub.kind === 'video');
    const audioTrack = useParticipantTracks(audioPubs);
    const isAudioEnabled = useIsTrackEnabled(audioTrack);
    const videoTrack = useParticipantTracks(videoPubs);
    const isVideoEnabled = useIsTrackEnabled(videoTrack);
    const user = participant.identity;
    console.log(user.photoURL);
    console.log(isVideoEnabled);
    console.log(audioTrack, videoTrack);
    console.log(pubs);
    const select = e => {
        onClick(participant);
    };
    //mujhe pura likhne do
    // console.log('participant=', participant);
    return (
        <div className="participantCard" onClick={select}>
            {isVideoEnabled ? (
                <VideoTrack track={[ audioTrack, videoTrack ]} />
            ) : (
                <Grid style={{ backgroundColor: '#000000', height: '100%' }} alignItems="center" justify="center" justifyContent="center">
                    {' '}
                    <Avatar>{user.photoURL}</Avatar>
                </Grid>
            )}
        </div>
    );
};
export default Participant;
