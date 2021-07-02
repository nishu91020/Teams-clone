import React, { useState, useContext, useEffect } from 'react';
import './styles.css';
import ChatBox from '../../Components/ChatBox';
import BtnGroup from '../../Components/BtnGroup';
import { Grid } from '@material-ui/core';
import CardContainer from '../../Components/CardContainer';
import { RoomContext, RoomProvider } from '../../Context/RoomContext';
import { VideoContext } from '../../Context/VideoContext';
import Participant from '../../Components/Praticipant';

const VideoScreen = () => {
    const { connect, room, isConnecting, settings, localTracks, participants } = useContext(RoomContext);
    const { state } = useContext(VideoContext);
    const [ chat, setChat ] = useState({ active: false });

    // console.log(settings);
    // console.log(localTracks);
    console.log(participants);
    console.log(room);
    useEffect(() => {
        const connectRoom = async () => {
            await connect(state.accessToken);

            console.log('this is room');
            console.log(room);
        };
        console.log(state.accessToken);
        connectRoom();
        return () => {
            if (room && room.localParticipant.state === 'connected') {
                room.localParticipant.tracks.forEach(function (trackPublication) {
                    trackPublication.track.stop();
                });
                room.disconnect();
            }
        };
    }, []);

    const remoteParticipant = participants.map(participant => (
        <Participant key={participant.sid} participant={participant} />
    ));
    const handleChat = () => {
        if (chat.active === true) {
            setChat({ active: false });
        }
        else {
            setChat({ active: true });
        }
    };

    return (
        <Grid style={{ display: 'flex', overflowY: 'hidden' }}>
            <Grid className="videoContainer">
                {room ? <Participant key={room.localParticipant.sid} participant={room.localParticipant} /> : ''}
                <div>{remoteParticipant}</div>
                <Grid className="controlContainer">
                    <BtnGroup handleChat={handleChat} />
                </Grid>
            </Grid>
            {chat.active ? <ChatBox handleChat={handleChat} /> : null}
        </Grid>
    );
};

export default () => (
    <RoomProvider>
        <VideoScreen />
    </RoomProvider>
);
