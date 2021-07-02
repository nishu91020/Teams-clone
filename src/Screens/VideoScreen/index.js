import React, { useState, useEffect, useContext } from 'react';
import Video from 'twilio-video';
import Participant from '../../Components/Praticipant';
import { VideoContext } from '../../Context/VideoContext';

const VideoScreen = () => {
    const [ room, setRoom ] = useState(null);
    const [ participants, setParticipants ] = useState([]);
    const { state } = useContext(VideoContext);
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

    const remoteParticipants = participants.map(participant => (
        <Participant key={participant.sid} participant={participant} />
    ));

    return (
        <div className="room">
            <div className="local-participant">
                {room ? <Participant key={room.localParticipant.sid} participant={room.localParticipant} /> : ''}
            </div>
            <h3>Remote Participants</h3>
            <div className="remote-participants">{remoteParticipants}</div>
        </div>
    );
};

export default VideoScreen;
