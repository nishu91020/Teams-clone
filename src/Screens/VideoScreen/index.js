import React, { useState, useEffect, useContext } from 'react';
import { Paper, Grid, makeStyles } from '@material-ui/core';
import Participant from '../../Components/Praticipant';
import { VideoContext } from '../../Context/VideoContext';
import BtnGroup from '../../Components/BtnGroup';
import ChatBox from '../../Components/ChatBox';
import ParticipantList from '../../Components/ParticipantList';
import { MeetingControlProvider } from '../../Context/MeetingControlContext';
import { RoomContext } from '../../Context/RoomContext';

const VideoScreen = () => {
    const { state } = useContext(VideoContext);
    const { connect, room, participants } = useContext(RoomContext);
    const [ isParticipantListActive, setIsParticipantListActive ] = useState(false);
    const [ isChatActive, setIsChatActive ] = useState(false);
    const [ selectedParticipant, setSelectedParticipant ] = useState(room?.localParticipant);

    const classes = useStyles();
    useEffect(() => {
        const connectRoom = async () => {
            await connect(state.accessToken);
        };
        connectRoom();
    }, []);
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

    const remoteParticipants = participants.map(
        participant => participant !== selectedParticipant && <Participant key={participant.sid} participant={participant} onClick={setSelectedParticipant} />
    );

    return (
        <Grid item container direction="row" xs={12} className={classes.wrapper}>
            <Grid container item className={classes.mainVideoContainer} direction="column" xs={isParticipantListActive || isChatActive ? 9 : 12}>
                <Grid container item direction="row" className={classes.videoContainer}>
                    <Paper elevation={0} className={classes.carousel}>
                        {room && room.localParticipant !== selectedParticipant ? (
                            <Participant key={room.localParticipant.sid} participant={room.localParticipant} onClick={setSelectedParticipant} />
                        ) : (
                            ''
                        )}
                        {remoteParticipants}
                    </Paper>
                    <Grid container item justify="center" alignItems="center" className={classes.selected} xs={9}>
                        {selectedParticipant ? (
                            <Participant participant={selectedParticipant} onClick={setSelectedParticipant} />
                        ) : (
                            room && <Participant participant={room.localParticipant} onClick={setSelectedParticipant} />
                        )}
                    </Grid>
                </Grid>

                <Grid container item direction="row" justify="center" alignItems="center" className={classes.controlContainer}>
                    <BtnGroup handleChat={handleChat} handleParticipants={handleParticipants} />
                </Grid>
            </Grid>

            {isChatActive ? (
                <Grid container item xs={3} className={classes.side}>
                    <ChatBox handleChat={handleChat} room={state.room} />
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

export default () => (
    <MeetingControlProvider>
        <VideoScreen />
    </MeetingControlProvider>
);

const useStyles = makeStyles({
    wrapper: {
        backgroundColor: '#272727',
        height: '94vh',
        margin: 0
    },
    side: {
        right: 0,
        overflowY: 'hidden',
        height: '94vh'
    },
    mainVideoContainer: {
        height: '100%',
        transition: 'all 0.4s'
    },
    videoContainer: {
        height: '90%',
        width: '100%',
        transition: 'all 0.4s'
    },
    controlContainer: {
        height: '10%',
        width: '100%'
    },
    carousel: {
        height: '100%',
        border: '1px solid white',
        background: 'transparent',
        overflowX: 'hidden',
        overflowY: 'auto',
        width: '20%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
    selected: {
        height: '100%'
    }
});
