import React, { useRef, useEffect, useState } from 'react';
// import MediaConstraints from '../../constants/MediaConstraints';
// import { VideoTracks } from '../../Components/VideoConstraints';

const Participant = ({ participant,dimension }) => {
    const [ videoTracks, setVideoTracks ] = useState([]);
    const [ audioTracks, setAudioTracks ] = useState([]);
    
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
    console.log('participant=', participant);
    return (
        <div styles={{ width  : `${dimension.width - dimension.margin * 2}px`,
                height : `${dimension.width * (9 / 16) - dimension.margin * 2}px`,
                margin : `${dimension.margin}px`,
                overflow: 'hidden',}}>
            {/* <h3>{participant.identity}</h3> */}
            {/* <VideoTracks track={localVideoTrack} /> */}
            <video style={{borderRadius:'5px',width:'100%',height:'100%'}} ref={videoRef} autoPlay={true} />
            <audio ref={audioRef} />
        </div>
    );
};
export default Participant;
