import React, { useContext } from 'react';
import { Button, ButtonGroup, makeStyles } from '@material-ui/core';
import { Videocam, Mic, Chat, CallEnd, PresentToAll, Group, VideocamOff, MicOff } from '@material-ui/icons';
import { MeetingControlContext } from '../../Context/MeetingControlContext';
const useStyles = makeStyles({
    btn: {
        bottom: '10px',
        left: '50%'
    }
});
const BtnGroup = props => {
    const classes = useStyles();
    const { isVideoOn, isAudioOn, handleAudioMute, handleVideoMute, dropCall } = useContext(MeetingControlContext);
    return (
        <div>
            <ButtonGroup size="large" className={classes.btn} variant="contained" color="default" aria-label="contained primary button group">
                <Button onClick={handleVideoMute}>{isVideoOn ? <Videocam /> : <VideocamOff />}</Button>
                <Button onClick={handleAudioMute}>{isAudioOn ? <Mic /> : <MicOff />}</Button>
                <Button>
                    <PresentToAll />
                </Button>
                <Button onClick={props.handleChat}>
                    <Chat />
                </Button>
                <Button onClick={props.handleParticipants}>
                    <Group />
                </Button>
                <Button color="secondary" onClick={dropCall}>
                    <CallEnd />
                </Button>
            </ButtonGroup>
        </div>
    );
};
export default BtnGroup;
