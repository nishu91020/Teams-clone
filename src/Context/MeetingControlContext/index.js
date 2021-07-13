//handle user state inside the room

import React, { useState, useContext } from 'react';
import { RoomContext } from '../RoomContext';

export const MeetingControlContext = React.createContext();

export const MeetingControlProvider = ({ children }) => {
    const { room } = useContext(RoomContext);
    const [ isVideoOn, setIsVideoOn ] = useState(!window.mediaSettings?.isVideoMuted);
    const [ isAudioOn, setIsAudioOn ] = useState(!window.mediaSettings?.isAudioMuted);

    const handleAudioMute = () => {
        if (isAudioOn === true) {
            room?.localParticipant.audioTracks.forEach(trackPublication => {
                trackPublication.track.disable();
            });
            setIsAudioOn(false);
        }
        else {
            room?.localParticipant.audioTracks.forEach(trackPublication => {
                trackPublication.track.enable();
                setIsAudioOn(true);
            });
        }
    };
    const handleVideoMute = () => {
        if (isVideoOn === true) {
            room?.localParticipant.videoTracks.forEach(publication => {
                publication.track.disable();
                setIsVideoOn(false);
            });
        }
        else {
            room?.localParticipant.videoTracks.forEach(publication => {
                publication.track.enable();
                setIsVideoOn(true);
            });
        }
    };
    const dropCall = () => {
        if (room) {
            room.localParticipant.tracks.forEach(trackPub => {
                trackPub.track.stop();
                trackPub.unpublish();
            });
            room.disconnect();
        }
    };

    return <MeetingControlContext.Provider value={{ isVideoOn, isAudioOn, dropCall, handleVideoMute, handleAudioMute }}>{children}</MeetingControlContext.Provider>;
};
