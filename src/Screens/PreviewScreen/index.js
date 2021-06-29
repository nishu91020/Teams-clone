import React, { useState } from 'react';
import { Paper, Button, makeStyles, Fab } from '@material-ui/core';
import { Videocam, Mic, VideocamOff, MicOff } from '@material-ui/icons';
import history from '../../history';
import VideoTrack from '../../Components/VideoTracks';
import { useMedia } from '../../Hooks/useMedia'; //named
import MediaConstraints from '../../constants/MediaConstraints';
import './styles.css';

const useStyles = makeStyles({
    btncontrol: {
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    videoComp: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        textAlign: 'center',
        AlignItems: 'center',
        justifyContent: 'center',
        transform: 'translate(-50%, -50%)',
        height: '62%',
        width: '40%'
    }
});
const PreviewScreen = () => {
    const [ mediaState, setMediaState ] = useState({ isMuted: false, isCamerOff: false });
    const media = useMedia(MediaConstraints);
    const classes = useStyles();
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
    const handleJoin = () => {
        history.push(`/VideoScreen`);
    };
    return (
        <div>
            <div className="preview">
                <Paper className={classes.videoComp}>
                    <div className="videoBox">
                        <VideoTrack track={media} />
                    </div>
                    <div className={classes.btncontrol}>
                        <div style={{ margin: '1%' }} onClick={handleCamera}>
                            <Fab color="primary">{mediaState.isCameraOff ? <VideocamOff /> : <Videocam />}</Fab>
                        </div>
                        <div style={{ margin: '1%' }} onClick={handleMic}>
                            <Fab color="primary">{mediaState.isMuted ? <MicOff /> : <Mic />}</Fab>
                        </div>
                        <div style={{ marginLeft: '20%' }} onClick={handleJoin}>
                            <Button variant="outlined" color="primary">
                                Join
                            </Button>
                        </div>
                    </div>
                </Paper>
            </div>
        </div>
    );
};
export default PreviewScreen;
