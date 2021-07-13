//handle props related to room.

import {  useState, useCallback } from 'react';
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

                    if(window.mediaSettings.isAudioMuted)
                    {
                        newRoom.localParticipant.audioTracks.forEach(trackPublication=>{
                            trackPublication.track.disable();
                        })
                    }
                    if(window.mediaSettings.isVideoMuted){
                        newRoom.localParticipant.videoTracks.forEach(trackPublication=>{
                            trackPublication.track.disable();
                        })
                    }
                    newRoom.setMaxListeners(15);

                    newRoom.once('disconnected', () => {
                        setTimeout(()=>setRoom(null));
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
