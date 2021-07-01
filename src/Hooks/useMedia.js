import { useCallback } from 'react';
import { useState } from 'react';
import Video, { createLocalTracks } from 'twilio-video';

export const useMedia = mediaConstraints => {
    const [ localAudioTrack, setLocalAudioTrack ] = useState(undefined);
    const [ localVideoTrack, setLocalVideoTrack ] = useState(undefined);
    const [ isloading, setIsloading ] = useState(false);

    const getLocalAudio = useCallback(() => {
        setIsloading(true);
        return Video.createLocalAudioTrack(mediaConstraints).then(audioTrack => {
            setLocalAudioTrack(audioTrack);
            setIsloading(false);
            return audioTrack;
        });
    }, []);
    const getLocalVideo = useCallback(() => {
        setIsloading(true);
        return Video.createLocalVideoTrack(mediaConstraints).then(videoTrack => {
            setLocalVideoTrack(videoTrack);
            setIsloading(false);
            return videoTrack;
        });
    }, []);
    const removeLocalAudio = useCallback(
        () => {
            if (localAudioTrack) {
                localAudioTrack.stop();
                setLocalAudioTrack(undefined);
            }
        },
        [ localAudioTrack ]
    );
    const removeLocalVideo = useCallback(
        () => {
            if (localVideoTrack) {
                localVideoTrack.stop();
                setLocalVideoTrack(undefined);
            }
        },
        [ localVideoTrack ]
    );
    const getAudioAndVideoTracks = useCallback(
        () => {
            setIsloading(true);
            const options = {
                audio: { ...mediaConstraints.audio },
                video: { ...mediaConstraints.video, name: `camera-${Date.now()}` }
            };

            return createLocalTracks(options)
                .then(localTrack => {
                    const videoTrack = localTrack.find(track => track.kind === 'video');
                    const audioTrack = localTrack.find(track => track.kind === 'audio');

                    if (videoTrack) {
                        setLocalVideoTrack(videoTrack);
                    }

                    if (audioTrack) {
                        setLocalAudioTrack(audioTrack);
                    }
                })
                .finally(() => setIsloading(false));
        },
        [ localAudioTrack, localVideoTrack, isloading ]
    );

    const localTracks = [ localAudioTrack, localVideoTrack ].filter(track => track !== undefined);
    return {
        removeLocalVideo,
        removeLocalAudio,
        getLocalAudio,
        getLocalVideo,
        getAudioAndVideoTracks,
        localAudioTrack,
        localVideoTrack
    };
};
