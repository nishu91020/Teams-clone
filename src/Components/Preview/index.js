import React, { useState } from 'react';
import { Fab } from '@material-ui/core';
import { Videocam, Mic, VideocamOff, MicOff } from '@material-ui/icons';
import VideoTrack from '../VideoTracks';
import { useMedia } from '../../Hooks/useMedia'; //named
import MediaConstraints from '../../constants/MediaConstraints';
import './styles.css';

const Preview = () => {
    const [ mediaState, setMediaState ] = useState({ isMuted: false, isCamerOff: false });
    const media = useMedia(MediaConstraints);

    const handleMic = () => {
        if (!mediaState.isMuted) {
            media[0].disable();
            setMediaState({ ...mediaState, isMuted: true });
        }
        else {
            media[0].enable();
            setMediaState({ ...mediaState, isMuted: false });
        }
    };
    const handleCamera = () => {
        if (!mediaState.isCameraOff) {
            media[1].disable();
            setMediaState({ ...mediaState, isCameraOff: true });
        }
        else {
            media[1].enable();
            setMediaState({ ...mediaState, isCameraOff: false });
        }
    };
    return (
        <div>
            <VideoTrack track={media} />
            <div className="btngroup">
                {mediaState.isCameraOff ? (
                    <Fab onClick={handleCamera} color="default" style={{ margin: '1%' }}>
                        <VideocamOff />
                    </Fab>
                ) : (
                    <Fab onClick={handleCamera} color="primary" style={{ margin: '1%' }}>
                        <Videocam />
                    </Fab>
                )}

                {mediaState.isMuted ? (
                    <Fab onClick={handleMic} color="default" style={{ margin: '1%' }}>
                        <MicOff />
                    </Fab>
                ) : (
                    <Fab onClick={handleMic} color="primary" style={{ margin: '1%' }}>
                        <Mic />
                    </Fab>
                )}
            </div>
        </div>
    );
};
export default Preview;
