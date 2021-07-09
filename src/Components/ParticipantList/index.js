import React, { useEffect, useState } from 'react';
import { Grid, Button, makeStyles, List } from '@material-ui/core';
import ParticipantCard from '../ParticipantCard';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Close, Share } from '@material-ui/icons';
import { fetchParticipants } from '../../db';
const useStyles = makeStyles({
    box: {
        paddingLeft: '1%',
        backgroundColor: '#ffffff'
    },
    invite: {
        width: '80%',
        margin: '2%',
        marginLeft: '8%'
    },
    participantlist: {
        marginTop: '5%'
    }
});

const ParticipantList = ({ handleParticipants, room }) => {
    const [ participants, setParticipants ] = useState([]);
    const classes = useStyles();
    console.log(room);
    useEffect(() => {
        const callback = snapshot => {
            let participantList = [];
            snapshot.forEach(participant => {
                participantList.push(participant.data());
            });
            setParticipants(participantList);
        };
        fetchParticipants(room.roomId, callback);
    }, []);
    console.log(participants);
    return (
        <Grid sm={12} className={classes.box}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>Participants</h3>
                <Button size="small" disableRipple disableFocusRipple variant="text" className="cross" onClick={handleParticipants}>
                    <Close />
                </Button>
            </div>
            <CopyToClipboard text={room.roomId}>
                <Button className={classes.invite} variant="outlined">
                    <Share /> Share Invite
                </Button>
            </CopyToClipboard>
            <Grid container item className={classes.participantlist}>
                {participants.map((participant, key) => <ParticipantCard participant={participant} key={key} />)}
            </Grid>
        </Grid>
    );
};

export default ParticipantList;
