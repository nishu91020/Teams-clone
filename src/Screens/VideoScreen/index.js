import React, { useState, useEffect, useContext, useCallback } from 'react';
import Video from 'twilio-video';
import { Grid } from '@material-ui/core';
import Participant from '../../Components/Praticipant';
import { VideoContext } from '../../Context/VideoContext';
import BtnGroup from '../../Components/BtnGroup';
import ChatBox from '../../Components/ChatBox';
import ParticipantList from '../../Components/ParticipantList';
import './styles.css';
import history from '../../history';

const VideoScreen = () => {
    const [ room, setRoom ] = useState(null);
    const [ participants, setParticipants ] = useState([]);
    const { state } = useContext(VideoContext);
    const [ chat, setChat ] = useState({ active: false });
    const [ videoTrack, setVideoTrack ] = useState({ active: true });
    const [ audioTrack, setAudioTrack ] = useState({ active: true });
    const [ participantList, setParticipantList ] = useState({ active: false });
    useEffect(
        () => {
            const participantConnected = participant => {
                setParticipants(prevParticipants => [ ...prevParticipants, participant ]);
            };

            const participantDisconnected = participant => {
                setParticipants(prevParticipants => prevParticipants.filter(p => p !== participant));
            };

            Video.connect(state.accessToken, {
                name: 'ascn'
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
        if (audioTrack === true) {
            room.localParticipant.audioTracks.forEach(trackPublication => {
                trackPublication.track.disable();
            });
            setAudioTrack(false);
        }
        else {
            room.localParticipant.audioTracks.forEach(trackPublication => {
                trackPublication.track.enable();
                setAudioTrack(true);
            });
        }
    };
    const handleVideoMute = () => {
        if (videoTrack === true) {
            room.localParticipant.videoTracks.forEach(publication => {
                publication.track.disable();
                setVideoTrack(false);
            });
        }
        else {
            room.localParticipant.videoTracks.forEach(publication => {
                publication.track.enable();
                setVideoTrack(true);
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
        if (chat.active === true) {
            setChat({ active: false });
        }
        else {
            setChat({ active: true });
            setParticipantList({ active: false });
        }
    };

    const handleParticipants = () => {
        if (participantList.active === true) {
            setParticipantList({ active: false });
        }
        else {
            setParticipantList({ active: true });
            setChat({ active: false });
        }
    };
    const remoteParticipants = participants.map(participant => (
        <Participant key={participant.sid} participant={participant} />
    ));

    return (
        <Grid style={{ display: 'flex' }}>
            <Grid className="videoContainer">
                <div className="local-participant">
                    {room ? <Participant key={room.localParticipant.sid} participant={room.localParticipant} /> : ''}
                    {remoteParticipants}
                </div>
                <Grid className="controlContainer">
                    <BtnGroup
                        audioTrack={audioTrack}
                        videoTrack={videoTrack}
                        handleVideoMute={handleVideoMute}
                        handleAudioMute={handleAudioMute}
                        handleChat={handleChat}
                        dropCall={dropCall}
                        handleParticipants={handleParticipants}
                    />
                </Grid>
            </Grid>
            {chat.active ? <ChatBox handleChat={handleChat} /> : null}
            {participantList.active ? <ParticipantList handleParticipants={handleParticipants} /> : null}
        </Grid>
    );
};

export default VideoScreen;
