import { createContext } from 'react';
import useRoom from '../../Hooks/useRoom';
import useHandleRoomDisconnect from '../../Hooks/useHandleRoomDisconnect';

export const RoomContext = createContext(null);

export const RoomProvider = ({ children }) => {
    const { room, connect, isConnecting, participants } = useRoom();

    useHandleRoomDisconnect(room);
    return (
        <RoomContext.Provider
            value={{
                isConnecting,
                connect,
                room,
                participants,
                useHandleRoomDisconnect
            }}
        >
            {children}
        </RoomContext.Provider>
    );
};
