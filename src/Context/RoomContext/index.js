import { createContext } from 'react';
import useRoom from '../../Hooks/useRoom';
import useHandleRoomDisconnect from '../../Hooks/useHandleRoomDisconnect';
import { useMedia } from '../../Hooks/useMedia.js';
import MediaConstraints from '../../constants/MediaConstraints';
export const RoomContext = createContext(null);

export const RoomProvider = ({ children }) => {
    const { localTracks, removeLocalAudioTrack, removeLocalVideoTrack, isLoading } = useMedia(MediaConstraints);
    const { room, isConnecting, connect } = useRoom(localTracks, {});
    useHandleRoomDisconnect(room, removeLocalAudioTrack, removeLocalVideoTrack);
    return (
        <RoomContext.Provider
            value={{ isConnecting, connect, room, removeLocalAudioTrack, removeLocalVideoTrack, isLoading }}
        >
            {children}
        </RoomContext.Provider>
    );
};