import React, { useState } from 'react';
import { Paper, Button, makeStyles } from '@material-ui/core';
import { Camera, Mic } from '@material-ui/icons';
import VideoTrack from '../../Components/VideoTracks';
import { useMedia } from '../../Hooks/useMedia'; //named
import MediaConstraints from '../../constants/MediaConstraints';
import './styles.css';

const useStyles = makeStyles({
    btncontrol: {
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '2%'
    },
    videoComp: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        textAlign: 'center',
        AlignItems: 'center',
        justifyContent: 'center',
        transform: 'translate(-50%, -50%)',
        height: '50%',
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
            setMediaState({ isMuted: true });
        }
        else {
            media[0].enable();
            setMediaState({ isMuted: false });
        }
    };
    const handleCamera = () => {
        if (!mediaState.isCamerOff) {
            media[1].disable();
            setMediaState({ isCamerOff: true });
        }
        else {
            media[1].enable();
            setMediaState({ isCamera: false });
        }
    };
    return (
        <div>
            <div className="preview">
                <div className={classes.btncontrol}>
                    <div onClick={handleCamera}>
                        <Button variant="outlined" color="primary" startIcon={<Camera />}>
                            Camera
                        </Button>
                    </div>
                    <div onClick={handleMic}>
                        <Button variant="outlined" color="primary" startIcon={<Mic />}>
                            Mic
                        </Button>
                    </div>
                </div>
                <Paper className={classes.videoComp}>
                    <div className="videoBox">
                        <VideoTrack track={media} />
                    </div>
                </Paper>
            </div>
        </div>
    );
};
export default PreviewScreen;
