import { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { createLocalTracks } from 'twilio-video';

export const useMedia = mediaConstraints => {
    const [ localTracks, setLocalTracks ] = useState([]);
    // const [ localAudioTrack, setLocalAudioTracks ] = useState(undefined);
    // const [ localVideoTrack, setLocalVideoTracks ] = useState(undefined);
    const [ isloading, setIsloading ] = useState(false);
    useEffect(
        () => {
            async function getMedia () {
                try {
                    setLocalTracks(await createLocalTracks(mediaConstraints));
                } catch (err) {
                    console.log(err);
                } finally {
                    setIsloading(false);
                }
            }
            if (!localTracks.length) {
                setIsloading(true);
                getMedia();
            }
            else {
                return () => {
                    localTracks.forEach(track => track.stop());
                };
            }
        },
        [ localTracks, mediaConstraints ]
    );
    // const getLocalAudio = useCallback(() => {
    //     setIsloading(true);
    //     return Video.createLocalAudioTrack(mediaConstraints).then(audioTrack => {
    //         setLocalAudioTracks(audioTrack);
    //         setIsloading(false);
    //         return audioTrack;
    //     });
    // }, []);
    // const getLocalVideo = useCallback(() => {
    //     setIsloading(true);
    //     return Video.createLocalVideoTracks(mediaConstraints).then(videoTrack => {
    //         setLocalVideoTracks(videoTrack);
    //         setIsloading(false);
    //         return videoTrack;
    //     });
    // }, []);
    const removeLocalAudio = useCallback(
        () => {
            if (localTracks[0]) {
                localTracks[0].stop();
                setLocalTracks(undefined, localTracks[1]);
            }
        },
        [ localTracks ]
    );
    const removeLocalVideo = useCallback(
        () => {
            if (localTracks[1]) {
                localTracks[1].stop();
                setLocalTracks(localTracks[0], undefined);
            }
        },
        [ localTracks ]
    );
    return { localTracks, removeLocalVideo, removeLocalAudio };
};
