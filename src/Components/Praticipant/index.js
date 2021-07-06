import React, { useRef, useEffect, useState } from 'react';
import './styles.css';
// import MediaConstraints from '../../constants/MediaConstraints';
// import { VideoTracks } from '../../Components/VideoConstraints';

const Participant = ({ participant }) => {
    const [ videoTracks, setVideoTracks ] = useState([]);
    const [ audioTracks, setAudioTracks ] = useState([]);
    // console.log(width);
    const videoRef = useRef();
    const audioRef = useRef();
    const trackpubsToTracks = trackMap =>
        Array.from(trackMap.values()).map(publication => publication.track).filter(track => track !== null);
    useEffect(
        () => {
            setVideoTracks(trackpubsToTracks(participant.videoTracks));
            setAudioTracks(trackpubsToTracks(participant.audioTracks));
            const trackSubscribed = track => {
                if (track.kind === 'video') setVideoTracks(videoTracks => [ ...videoTracks, track ]);
                else if (track.kind === 'audio') setAudioTracks(audioTracks => [ ...audioTracks, track ]);
            };

            const trackUnsubscribed = track => {
                if (track.kind === 'video') setVideoTracks(videoTracks => videoTracks.filter(v => v !== track));
                if (track.kind === 'audio') setAudioTracks(audioTracks => audioTracks.filter(a => a !== track));
            };
            participant.on('trackUnsubscribed', trackUnsubscribed);
            participant.on('trackSubscribed', trackSubscribed);

            return () => {
                setVideoTracks([]);
                setAudioTracks([]);
                participant.removeAllListeners();
            };
        },
        [ participant ]
    );
    useEffect(
        () => {
            const videoTrack = videoTracks[0];
            if (videoTrack) {
                videoTrack.attach(videoRef.current);
                return () => {
                    videoTrack?.detach();
                };
            }
        },
        [ videoTracks ]
    );
    useEffect(
        () => {
            const audioTrack = audioTracks[0];
            if (audioTrack) {
                audioTrack.attach(audioRef.current);
            }
            return () => {
                audioTrack?.detach();
            };
        },
        [ audioTracks ]
    );
    // console.log('participant=', participant);
    return (
        <div className="participantCard">
            <video style={{height:'100%'}} ref={videoRef} autoPlay={true} />
            <audio ref={audioRef} />
        </div>
    
    );
};
export default Participant;
