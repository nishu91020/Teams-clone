import React from 'react';
import { Grid, Button, makeStyles, List } from '@material-ui/core';
import ParticipantCard from '../ParticipantCard';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Close, Share } from '@material-ui/icons';

const useStyles = makeStyles({
    box: {
        paddingLeft: '1%',
        backgroundColor: '#ffffff'
    },
    invite: {
        width: '80%',
        margin: '2%',
        marginLeft: '8%'
    }
});

const ParticipantList = props => {
    const classes = useStyles();
    console.log('participants in room');
    console.log(props.owner);
    const ownerName = props.owner;
    return (
        <Grid sm={12} className={classes.box}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>Participants</h3>
                <Button size="small" disableRipple disableFocusRipple variant="text" className="cross" onClick={props.handleParticipants}>
                    <Close />
                </Button>
            </div>
            <CopyToClipboard text={props.room}>
                <Button className={classes.invite} variant="outlined">
                    <Share /> Share Invite
                </Button>
            </CopyToClipboard>
            <List component="nav">
                <ParticipantCard name={ownerName} />
                <Grid>{props.people}</Grid>
            </List>
        </Grid>
    );
};

export default ParticipantList;
