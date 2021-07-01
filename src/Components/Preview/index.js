import React, { useState, useEffect } from 'react';
import { Fab } from '@material-ui/core';
import { Videocam, Mic, VideocamOff, MicOff } from '@material-ui/icons';
import VideoTrack from '../VideoTracks';
import './styles.css';
import { useMedia } from '../../Hooks/useMedia';
import MediaConstraints from '../../constants/MediaConstraints';

const Preview = () => {
    const {
        getLocalVideo,
        getLocalAudio,
        removeLocalAudio,
        removeLocalVideo,
        localVideoTrack,
        localAudioTrack
    } = useMedia(MediaConstraints);
    useEffect(() => {
        return () => {
            removeLocalAudio();
            removeLocalVideo();
        };
    });
    useEffect(() => {
        getLocalAudio();
        getLocalVideo();
    }, []);
    console.log(localAudioTrack);
    console.log(localVideoTrack);
    const [ mediaState, setMediaState ] = useState({ isMuted: false, isCamerOff: false });

    const handleMic = () => {
        if (!mediaState.isMuted) {
            if (localAudioTrack) {
                localAudioTrack.disable();
            }
            setMediaState({ ...mediaState, isMuted: true });
        }
        else {
            localAudioTrack.enable();
            setMediaState({ ...mediaState, isMuted: false });
        }
    };
    const handleCamera = () => {
        if (!mediaState.isCameraOff) {
            if (localAudioTrack) localVideoTrack.disable();
            setMediaState({ ...mediaState, isCameraOff: true });
        }
        else {
            localVideoTrack.enable();
            setMediaState({ ...mediaState, isCameraOff: false });
        }
    };
    // console.log(audioTrack);
    // console.log(videoTrack);
    return (
        <div>
            <VideoTrack track={localVideoTrack} />
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
