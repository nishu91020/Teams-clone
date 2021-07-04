import React, { useState, useRef, useEffect, useContext, useCallback } from 'react';
import Video from 'twilio-video';
import { Grid } from '@material-ui/core';
import Participant from '../../Components/Praticipant';
import { VideoContext } from '../../Context/VideoContext';
import BtnGroup from '../../Components/BtnGroup';
import ChatBox from '../../Components/ChatBox';
import ParticipantList from '../../Components/ParticipantList';
import { calcCardWidth } from '../../Util/participantCard';
import './styles.css';
import history from '../../history';
import MediaConstraints from '../../constants/MediaConstraints';

const VideoScreen = () => {
    const [ room, setRoom ] = useState(null);
    const [ participants, setParticipants ] = useState([]);
    const { state } = useContext(VideoContext);
    const [ isChatActive, setIsChatActive ] = useState(false);
    const [ isVideoOn, setIsVideoOn ] = useState(true);
    const [ isAudioOn, setIsAudioOn ] = useState(true);
    const [ isParticipantListActive, setIsParticipantListActive ] = useState(false);
    const [ dimension, setDimension ] = useState({ width: 0, margin: 0 });
    const videoContainerRef = useRef(null);

    useEffect(
        () => {
            const containerWidth = videoContainerRef.current ? videoContainerRef.current.offsetWidth : 1540;
            const containerHeight = videoContainerRef.current ? videoContainerRef.current.offsetHeight : 880;
            setDimension(calcCardWidth(containerWidth, containerHeight, participants.length));
        },
        [ participants ]
    );

    useEffect(
        () => {
            const participantConnected = participant => {
                setParticipants(prevParticipants => [ ...prevParticipants, participant ]);
            };

            const participantDisconnected = participant => {
                setParticipants(prevParticipants => prevParticipants.filter(p => p !== participant));
            };

            Video.connect(state.accessToken, {
                name: 'general',
                ...MediaConstraints
            }).then(room => {
                setRoom(room);
                room.on('participantConnected', participantConnected);
                room.on('participantDisconnected', participantDisconnected);
                room.participants.forEach(participantConnected);
            });

            return () => {
                setRoom(currentRoom => {
                    if (currentRoom && currentRoom.localParticipant.state === 'connected') {
                        currentRoom.localParticipant.tracks.forEach(function (trackPublication) {
                            trackPublication.track.stop();
                        });
                        currentRoom.disconnect();
                        return null;
                    }
                    else {
                        return currentRoom;
                    }
                });
            };
        },
        [ state.accessToken ]
    );

    const handleAudioMute = () => {
        if (isAudioOn === true) {
            room.localParticipant.audioTracks.forEach(trackPublication => {
                trackPublication.track.disable();
            });
            setIsAudioOn(false);
        }
        else {
            room.localParticipant.audioTracks.forEach(trackPublication => {
                trackPublication.track.enable();
                setIsAudioOn(true);
            });
        }
    };
    const handleVideoMute = () => {
        if (isVideoOn === true) {
            room.localParticipant.videoTracks.forEach(publication => {
                publication.track.disable();
                setIsVideoOn(false);
            });
        }
        else {
            room.localParticipant.videoTracks.forEach(publication => {
                publication.track.enable();
                setIsVideoOn(true);
            });
        }
    };
    const dropCall = useCallback(() => {
        setRoom(prevRoom => {
            if (prevRoom) {
                prevRoom.localParticipant.tracks.forEach(trackPub => {
                    trackPub.track.stop();
                });
                prevRoom.disconnect();
                history.push('/Home');
            }
            return null;
        });
    }, []);

    const handleChat = () => {
        if (isChatActive === true) {
            setIsChatActive(false);
        }
        else {
            setIsChatActive(true);
            setIsParticipantListActive(false);
        }
    };

    const handleParticipants = () => {
        if (isParticipantListActive) {
            setIsParticipantListActive(false);
        }
        else {
            setIsParticipantListActive(true);
            setIsChatActive(false);
        }
    };
    const remoteParticipants = participants.map(participant => (
        <Participant dimension={dimension} key={participant.sid} participant={participant} />
    ));

    //participants list

    const people = participants.map(participant => (
        <div>{participant.identity.substring(0, participant.identity.indexOf('@'))}</div>
    ));
    //console.log(room.localParticipant.uniqueName);
    return (
        <Grid item container direction="row" xs={12}>
            <Grid
                item
                container
                justify="center"
                alignItems="center"
                className="videoContainer"
                xs={isChatActive || isParticipantListActive ? 9 : 12}
            >
                {room ? (
                    <Participant
                        dimension={dimension}
                        key={room.localParticipant.sid}
                        participant={room.localParticipant}
                    />
                ) : (
                    ''
                )}
                {remoteParticipants}
                <Grid className="controlContainer">
                    <BtnGroup
                        isAudioOn={isAudioOn}
                        isVideoOn={isVideoOn}
                        handleVideoMute={handleVideoMute}
                        handleAudioMute={handleAudioMute}
                        handleChat={handleChat}
                        dropCall={dropCall}
                        handleParticipants={handleParticipants}
                    />
                </Grid>
            </Grid>
            {isChatActive ? (
                <Grid container item xs={3}>
                    <ChatBox handleChat={handleChat} />
                </Grid>
            ) : null}
            {isParticipantListActive ? (
                <Grid container item xs={3}>
                    <ParticipantList
                        handleParticipants={handleParticipants}
                        people={people}
                        owner={room.localParticipant.identity}
                    />
                </Grid>
            ) : null}
        </Grid>
    );
};

export default VideoScreen;
