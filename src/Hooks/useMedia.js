import { useEffect, useState } from 'react';
import { createLocalTracks } from 'twilio-video';

export const useMedia = mediaConstraints => {
    const [ localTracks, setLocalTracks ] = useState([]);
    useEffect(
        () => {
            async function getMedia () {
                try {
                    setLocalTracks(await createLocalTracks(mediaConstraints));
                } catch (err) {
                    console.log(err);
                }
            }
            if (!localTracks.length) {
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
    return localTracks;
};
