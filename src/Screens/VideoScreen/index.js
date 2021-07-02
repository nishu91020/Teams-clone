import React, { useState, useEffect, useContext, useCallback } from 'react';
import Video from 'twilio-video';
import { Grid } from '@material-ui/core';
import Participant from '../../Components/Praticipant';
import { VideoContext } from '../../Context/VideoContext';
import BtnGroup from '../../Components/BtnGroup';
import ChatBox from '../../Components/ChatBox';
import './styles.css';
import history from '../../history';

const VideoScreen = () => {
    const [ room, setRoom ] = useState(null);
    const [ participants, setParticipants ] = useState([]);
    const { state } = useContext(VideoContext);
    const [ chat, setChat ] = useState({ active: false });

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

    const dropCall = useCallback(() => {
        setRoom(prevRoom => {
            if (prevRoom) {
                prevRoom.localParticipant.tracks.forEach(trackPub => {
                    trackPub.track.stop();
                });
                prevRoom.disconnect();
                history.push('/VideoChat');
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
        }
    };
    const remoteParticipants = participants.map(participant => (
        <Participant key={participant.sid} participant={participant} />
    ));

    return (
        <Grid className="videoContainer" style={{ display: 'flex' }}>
            <Grid>
                <div className="local-participant">
                    {room ? <Participant key={room.localParticipant.sid} participant={room.localParticipant} /> : ''}
                </div>
                <div className="remote-participants">{remoteParticipants}</div>
                <div className="controlContainer">
                    <BtnGroup handleChat={handleChat} dropCall={dropCall} />
                </div>
            </Grid>
            {chat.active ? <ChatBox handleChat={handleChat} /> : null}
        </Grid>
    );
};

export default VideoScreen;
