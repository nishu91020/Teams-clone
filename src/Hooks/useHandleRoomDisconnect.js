//handle disconnection from room.

import { useEffect } from 'react';
import history from '../history';
const useHandleRoomDisconnect = room => {
    useEffect(
        () => {
            if (room) {
                const onDisconnected = (room, error) => {
                    if (error) {
                        console.log(error);
                    }
                    history.push('/');
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
