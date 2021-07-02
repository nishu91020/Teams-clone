import { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { createLocalTracks } from 'twilio-video';

export const useMedia = mediaConstraints => {
    const [ localTracks, setLocalTracks ] = useState([]);
    const [ settings, setSettings ] = useState([]);
    // const [ localAudioTrack, setLocalAudioTracks ] = useState(undefined);
    // const [ localVideoTrack, setLocalVideoTracks ] = useState(undefined);
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(
        () => {
            async function getMedia () {
                try {
                    setLocalTracks(await createLocalTracks(mediaConstraints));
                } catch (err) {
                    console.log(err);
                } finally {
                    setIsLoading(false);
                }
            }
            if (!localTracks.length) {
                setIsLoading(true);
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
    const removeLocalAudio = useCallback(
        () => {
            if (localTracks[0]) {
                localTracks[0].stop();
                setLocalTracks(undefined);
            }
        },
        [ localTracks ]
    );
    const removeLocalVideo = useCallback(
        () => {
            if (localTracks[1]) {
                localTracks[1].stop();
                setLocalTracks(undefined);
            }
        },
        [ localTracks ]
    );
    // const getAudioAndVideoTracks = useCallback(
    //     () => {
    //         setIsloading(true);
    //         const options = {
    //             audio: { ...mediaConstraints.audio },
    //             video: { ...mediaConstraints.video, name: `camera-${Date.now()}` }
    //         };

    //         return createLocalTracks(options)
    //             .then(localTrack => {
    //                 const videoTrack = localTrack.find(track => track.kind === 'video');
    //                 const audioTrack = localTrack.find(track => track.kind === 'audio');

    //                 if (videoTrack) {
    //                     setLocalVideoTrack(videoTrack);
    //                 }

    //                 if (audioTrack) {
    //                     setLocalAudioTrack(audioTrack);
    //                 }
    //             })
    //             .finally(() => setIsloading(false));
    //     },
    //     [ localAudioTrack, localVideoTrack, isloading ]
    // );

    return { localTracks, removeLocalVideo, removeLocalAudio, setSettings, settings, isLoading };
};
