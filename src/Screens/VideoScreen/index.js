import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
import Video from 'twilio-video';
import { Grid, makeStyles } from '@material-ui/core';
import Participant from '../../Components/Praticipant';
import { VideoContext } from '../../Context/VideoContext';
import BtnGroup from '../../Components/BtnGroup';
import ChatBox from '../../Components/ChatBox';
import ParticipantList from '../../Components/ParticipantList';
import './styles.css';
import history from '../../history';
import MediaConstraints from '../../constants/MediaConstraints';
import ParticipantCard from '../../Components/ParticipantCard';

const VideoScreen = () => {
    const [ room, setRoom ] = useState(null);
    const [ participants, setParticipants ] = useState([]);
    const { state } = useContext(VideoContext);
    const [ isChatActive, setIsChatActive ] = useState(false);
    const [ isVideoOn, setIsVideoOn ] = useState(true);
    const [ isAudioOn, setIsAudioOn ] = useState(true);
    const [ isParticipantListActive, setIsParticipantListActive ] = useState(false);
    const [ selectedParticipant, setSelectedParticipant ] = useState(room?.localParticipant);

    const classes = useStyles();
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
                history.push('/');
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
    const remoteParticipants = participants.map(participant => <Participant key={participant.sid} participant={participant} onClick={setSelectedParticipant} />);
    const people = participants.map(participant => <ParticipantCard name={participant.identity.substring(0, participant.identity.indexOf('@'))} />);
    const ownerName = state.identity;
    // console.log('this is user in participant list');
    // console.log(state.identity);
    //console.log(room.localParticipant.uniqueName);
    return (
        <Grid item container direction="row" xs={12} className={classes.wrapper}>
            <Grid container item xs={isParticipantListActive || isChatActive ? 9 : 12}>
                <Grid container item style={{ height: '93vh', overflowY: 'hidden' }}>
                    <Grid item container className="carousel-container" xs={3}>
                        {room ? <Participant key={room.localParticipant.sid} participant={room.localParticipant} onClick={setSelectedParticipant}/> : ''}
                        {remoteParticipants}
                    </Grid>
                    <Grid container item xs={9} justify="center" alignItems="center">
                        {
                            selectedParticipant && <Participant participant={selectedParticipant}/>
                        }
                        
                    </Grid>
                </Grid>
                
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
                <Grid container item xs={3} className={classes.side}>
                    <ChatBox handleChat={handleChat} />
                </Grid>
            ) : null}
            {isParticipantListActive ? (
                <Grid container item xs={3}>
                    <ParticipantList handleParticipants={handleParticipants} people={people} owner={ownerName} room={state.room.uniqueName} />
                </Grid>
            ) : null}
        </Grid>
    );
};

export default VideoScreen;

const useStyles = makeStyles({
    wrapper: {
        backgroundColor: '#272727'
    },
    side: {
        right: 0
    }
});
