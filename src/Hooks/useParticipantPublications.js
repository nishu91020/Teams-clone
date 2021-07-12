//handle publication of participants inside the room

import { useEffect, useState } from 'react';

export const useParticipantPublications = (participant) => {
    const [ pubs, setPubs ] = useState([]);

    useEffect(
        () => {
            setPubs(participant ? [ ...participant.tracks.values() ] : []);

            const publicationAdded = (publication) => {
                setPubs([ ...pubs, publication ]);
            };

            const publicationRemoved = (publication) => {
                setPubs(pubs.forEach((p) => p !== publication));
            };

            participant?.on('trackPublished', publicationAdded);
            participant?.on('trackUnpublished', publicationRemoved);

            return function cleanup () {
                participant?.off('trackPublished', publicationAdded);
                participant?.off('trackUnpublished', publicationRemoved);
            };
        },
        [ participant ],
    );

    return pubs;
};