import React, { useRef, useEffect, useState,useContext } from 'react';
import './styles.css';
import { MeetingControlContext } from '../../Context/MeetingControlContext';

const Participant = ({ participant ,onClick ,isLocal}) => {
    const [ videoTracks, setVideoTracks ] = useState([]);
    const [ audioTracks, setAudioTracks ] = useState([]);
    // console.log(width);
    const [isVideoEnabled,setIsVideoEnabled]=useState(true);
    const videoRef = useRef();
    const audioRef = useRef();
    const {isAudioOn,isVideoOn}=useContext(MeetingControlContext);

    const trackpubsToTracks = trackMap =>
        Array.from(trackMap.values()).map(publication => publication.track).filter(track => track !== null);
    useEffect(
        () => {
            setVideoTracks(trackpubsToTracks(participant.videoTracks));
            setAudioTracks(trackpubsToTracks(participant.audioTracks));
            const onVideoEnabled=(track)=>{
                    setIsVideoEnabled(true);
            }
            const onVideoDisabled=(track)=>{
                setIsVideoEnabled(false);
            }
            const trackSubscribed = track => {
                if (track.kind === 'video'){
                    track.on('enabled',onVideoEnabled);
                    track.on('disabled',onVideoDisabled);
                    setVideoTracks(videoTracks => [ ...videoTracks, track ]);
                } 
                else if (track.kind === 'audio') setAudioTracks(audioTracks => [ ...audioTracks, track ]);
            };

            const trackUnsubscribed = track => {

                if (track.kind === 'video') {
                    track.off('enabled',onVideoEnabled);
                    track.off('disabled',onVideoDisabled)
                    setVideoTracks(videoTracks => videoTracks.filter(v => v !== track));
                }
                if (track.kind === 'audio'){
                    setAudioTracks(audioTracks => audioTracks.filter(a => a !== track));

                } 
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
    const select=(e)=>{
        onClick(participant);
    }
    
    // console.log('participant=', participant);
    return (
        
        <div className="participantCard" onClick={select}>
            <video style={{height:'100%'}} ref={videoRef} autoPlay={true} />
            <audio ref={audioRef} />
        </div>
    
    );
};
export default Participant;
