import { useEffect, useState, useRef, useCallback } from 'react';
import { connect as roomConnect } from 'twilio-video';
import MediaConstraints from '../constants/MediaConstraints';

const useRoom = () => {
    const [ room, setRoom ] = useState(null);
    const [ isconnecting, setIsconnecting ] = useState(false);
    const [ participants, setParticipants ] = useState([]);

    const connect = useCallback(
        token => {
            setIsconnecting(true);
            return roomConnect(token, {...MediaConstraints }).then(
                newRoom => {
                    setRoom(newRoom);
                    const disconnect = () => newRoom.disconnect();

                    newRoom.setMaxListeners(15);

                    newRoom.once('disconnect', () => {
                        setTimeout(() => setRoom(null));
                        window.removeEventListener('beforeunload', disconnect);
                    });
                    window.twilioRoom = newRoom;
                    newRoom.localParticipant.videoTracks.forEach(track => {
                        track.setPriority('low');
                    });
                    const participantConnect = participant => {
                        setParticipants(prevParticipant => [ ...prevParticipant, participant ]);
                    };

                    const participantDisconnect = part => {
                        setParticipants(participants => participants.filter(participant => part !== participant));
                    };
                    newRoom?.on('participantConnected', participantConnect);
                    newRoom?.on('participantDisconnected', participantDisconnect);
                    newRoom?.participants.forEach(participantConnect);
                    window.addEventListener('beforeunload', disconnect);
                    console.log(newRoom);
                    setIsconnecting(false);
                },
                err => {
                    console.log(err);
                    setIsconnecting(false);
                }
            );
        },
        []
    );
    return { room, isconnecting, connect,participants };
};
export default useRoom;
