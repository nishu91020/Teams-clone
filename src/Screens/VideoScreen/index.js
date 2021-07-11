import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
import Video, { connect } from 'twilio-video';
import { Grid, makeStyles } from '@material-ui/core';
import Participant from '../../Components/Praticipant';
import { VideoContext } from '../../Context/VideoContext';
import BtnGroup from '../../Components/BtnGroup';
import ChatBox from '../../Components/ChatBox';
import ParticipantList from '../../Components/ParticipantList';
import {MeetingControlProvider} from '../../Context/MeetingControlContext';
import './styles.css';
import ParticipantCard from '../../Components/ParticipantCard';
import SelectedParticipant from '../../Components/SelectedParticipant';
import { RoomContext } from '../../Context/RoomContext';

const VideoScreen = () => {
   
    const { state } = useContext(VideoContext);
    const {connect,room,participants}=useContext(RoomContext);
    const [ isParticipantListActive, setIsParticipantListActive ] = useState(false);
    const [ isChatActive, setIsChatActive ] = useState(false);
    const [ selectedParticipant, setSelectedParticipant ] = useState(room?.localParticipant);

    const classes = useStyles();
    useEffect(
        () => {
            const connectRoom=async()=>{
                await connect(state.accessToken);
            }
            connectRoom();
        },
        []
    );
     const handleChat = () => {
        if (isChatActive === true) {
            setIsChatActive(false);
        }
        else {
            setIsChatActive(true);
            setIsParticipantListActive(false);
        }
    };

    const handleParticipants = () => {
        if (isParticipantListActive) {
            setIsParticipantListActive(false);
        }
        else {
            setIsParticipantListActive(true);
            setIsChatActive(false);
        }
    };

    const remoteParticipants = participants.map(participant =>participant!==selectedParticipant && <Participant key={participant.sid} participant={participant} onClick={setSelectedParticipant} />);
    // const people = participants.map(participant => <ParticipantCard name={participant.identity.substring(0, participant.identity.indexOf('@'))} />);
    // const ownerName = state.identity;
    
    return (
        <Grid item container direction="row" xs={12} className={classes.wrapper}>
            <Grid container item xs={isParticipantListActive || isChatActive ? 9 : 12}>
                <Grid container item style={{ height: '93vh', overflowY: 'hidden' }}>
                    <Grid item container className="carousel-container"  xs={isParticipantListActive || isChatActive ? 4:3}>
                        {room && (room.localParticipant!==selectedParticipant) ? <Participant  key={room.localParticipant.sid} participant={room.localParticipant} onClick={setSelectedParticipant}/> : ''}
                        {remoteParticipants}
                    </Grid>
                    <Grid container item xs={isParticipantListActive || isChatActive ?8:9} alignItems="center" justify="center">
                        {
                            selectedParticipant && <Participant participant={selectedParticipant}/>
                        }
                        
                    </Grid>
                </Grid>
                
                <Grid className="controlContainer">
                    <BtnGroup handleChat={handleChat} handleParticipants={handleParticipants} />
                </Grid>
            </Grid>

            {isChatActive ? (
                <Grid container item xs={3} className={classes.side}>
                    <ChatBox handleChat={handleChat} room={state.room}/>
                </Grid>
            ) : null}
            {isParticipantListActive ? (
                <Grid container item xs={3}>
                    <ParticipantList handleParticipants={handleParticipants} room={state.room} />
                </Grid>
            ) : null}
        </Grid>
    );
};

export default ()=>(
    <MeetingControlProvider>
        <VideoScreen/>
    </MeetingControlProvider>);
  


const useStyles = makeStyles({
    wrapper: {
        backgroundColor: '#272727',
        height:'94vh'
    },
    side: {
        right: 0, 
        overflowY: 'hidden',
        height:'94vh'
    }
});
