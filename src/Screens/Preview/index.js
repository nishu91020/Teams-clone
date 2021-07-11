import React, { useState, useEffect,useContext } from 'react';
import { Videocam, Mic, VideocamOff, MicOff } from '@material-ui/icons';
import VideoTrack from '../../Components/VideoTracks';
import {CircularProgress,Button,Fab} from '@material-ui/core';
import {VideoContext} from '../../Context/VideoContext';
import './styles.css';
import {useMedia} from '../../Hooks/useMedia';

const Preview = (props) => {
    
    const {localTracks,setSettings,isLoading} =useMedia();
    const {isConnecting,state,generateToken}=useContext(VideoContext);
    const [ mediaState, setMediaState ] = useState({ isMuted: false, isCamerOff: false });
    //console.log(state.room.uniqueName);
    useEffect(()=>{
        return()=>{
            setSettings(mediaState);
        }
    })
    const enterRoom=()=>{
        generateToken(props.match.params.id);
    }
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
    if(isLoading ||isConnecting)
    {
        return(
            <div className="loader">
                <CircularProgress thickness={5} />
            </div>
        )
    }
    return (
        <div className="outer-preview">
        <div className="previewContainer">
    
            <VideoTrack track={localTracks} isVideoEnabled={!mediaState.isCamerOff}/>
            <div style={{marginLeft:'-10%'}}>
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
            <Button style={{marginLeft:'-10%',marginTop:'2%'}} onClick={enterRoom} variant="outlined" color="primary">Enter Room</Button>
        </div>
        </div>
    );
};
export default Preview;
