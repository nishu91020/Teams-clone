import React, { useState, useEffect,useContext } from 'react';
import { Fab } from '@material-ui/core';
import { Videocam, Mic, VideocamOff, MicOff } from '@material-ui/icons';
import VideoTrack from '../VideoTracks';
import {Grid,CircularProgress} from '@material-ui/core'
import './styles.css';

import {RoomProvider,RoomContext} from '../../Context/RoomContext';

const Preview = () => {
    
    const {localTracks,setSettings,isLoading} = useContext(RoomContext);

    const [ mediaState, setMediaState ] = useState({ isMuted: false, isCamerOff: false });
    useEffect(()=>{
        return()=>{
            setSettings(mediaState);
        }
    })
    const handleMic = () => {
        if (!mediaState.isMuted) {
         
                localTracks[0]?.disable();
         
            setMediaState({ ...mediaState, isMuted: true });
        }
        else {
            localTracks[0].enable();
            setMediaState({ ...mediaState, isMuted: false });
        }
    };
    const handleCamera = () => {
        if (!mediaState.isCameraOff) {
           localTracks[1]?.disable();
            setMediaState({ ...mediaState, isCameraOff: true });
        }
        else {
            localTracks[1].enable();
            setMediaState({ ...mediaState, isCameraOff: false });
        }
    };
    // console.log(audioTrack);
    // console.log(videoTrack);
    if(isLoading)
    {
        return(
            <Grid item container alignItems="center" justify="center">
                <CircularProgress thickness={5} />
            </Grid>
        )
    }
    return (
        
        <div>
            <VideoTrack track={localTracks} />
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
export default ()=>(<RoomProvider><Preview/></RoomProvider>);
