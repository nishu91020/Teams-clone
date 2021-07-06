import { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { createLocalTracks } from 'twilio-video';
import MediaConstraints from '../constants/MediaConstraints';

export const useMedia = () => {
    const [ localTracks, setLocalTracks ] = useState([]);
    const [ settings, setSettings ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(
        () => {
            async function getMedia () {
                try {
                    setLocalTracks(await createLocalTracks(MediaConstraints));
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
        [ localTracks ]
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

    return { localTracks, removeLocalVideo, removeLocalAudio, setSettings, settings, isLoading };
};
