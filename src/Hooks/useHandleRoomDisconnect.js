import { useEffect } from 'react';

const useHandleRoomDisconnect = (room, removeLocalVideoTrack, removeLocalAudioTrack) => {
    useEffect(
        () => {
            if (room) {
                const onDisconnected = (_, error) => {
                    if (error) {
                        console.log(error);
                    }
                    removeLocalVideoTrack();
                    removeLocalAudioTrack();
                };
                room.on('disconnected', onDisconnected);
                return function cleanup () {
                    room.off('disconnected', onDisconnected);
                };
            }
        },
        [ room, removeLocalAudioTrack, removeLocalVideoTrack ]
    );
};
export default useHandleRoomDisconnect;
