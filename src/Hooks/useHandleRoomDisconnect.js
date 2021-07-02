import { useEffect } from 'react';

const useHandleRoomDisconnect = room => {
    useEffect(
        () => {
            if (room) {
                const onDisconnected = (room, error) => {
                    if (error) {
                        console.log(error);
                    }
                };
                room.on('disconnected', onDisconnected);
                return function cleanup () {
                    room.off('disconnected', onDisconnected);
                };
            }
        },
        [ room ]
    );
};
export default useHandleRoomDisconnect;
