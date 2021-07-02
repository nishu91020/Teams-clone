import { useEffect, useState, useRef, useCallback } from 'react';
import { connect as roomConnect } from 'twilio-video';

const useRoom = (localTracks, options) => {
    const [ room, setRoom ] = useState(null);
    const [ isconnecting, setIsconnecting ] = useState(false);
    const optionRef = useRef(null);

    useEffect(
        () => {
            optionRef.current = options;
        },
        [ options ]
    );
    const connect = useCallback(
        token => {
            setIsconnecting(true);
            return roomConnect(token, { ...optionRef.current, tracks: localTracks }).then(
                newRoom => {
                    setRoom(newRoom);
                    const disconnect = () => newRoom.disconnect();

                    newRoom.setMaxListeners(15);

                    newRoom.once('disconnect', () => {
                        setTimeout(() => setTimeout(null));
                        window.removeEventListener('beforeunload', disconnect);
                    });
                    window.twilioRoom = newRoom;
                    newRoom.localParticipant.videoTracks.forEach(track => {
                        track.setPriority('low');
                    });
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
        [ localTracks ]
    );
    return { room, isconnecting, connect };
};
export default useRoom;
