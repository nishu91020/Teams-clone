import React, { useEffect, useRef } from 'react';
const VideoTrack = props => {
    // const track = props.track;
    const videoRef = useRef(null);
    const audioRef = useRef(null);
    useEffect(
        () => {
            if (props.track) {
                props.track[0]?.attach(videoRef.current);
                props.track[1]?.attach(audioRef.current);
            }
        },
        [ props.track ]
    );
    // console.log(props.track);
    return (
        <React.Fragment>
            <video ref={videoRef} />
            <audio ref={audioRef} />
        </React.Fragment>
    );
};

export default VideoTrack;
