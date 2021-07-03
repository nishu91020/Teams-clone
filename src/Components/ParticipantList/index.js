import React from 'react';
import { Grid, Button, makeStyles } from '@material-ui/core';
import { Close } from '@material-ui/icons';

const useStyles = makeStyles({
    box: {
        paddingLeft: '1%'
    }
});
const ParticipantList = props => {
    const classes = useStyles();
    return (
        <Grid sm={4} className={classes.box}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>Participants</h3>
                <Button
                    size="small"
                    disableRipple
                    disableFocusRipple
                    variant="text"
                    className="cross"
                    onClick={props.handleParticipants}
                >
                    <Close />
                </Button>
            </div>
            <div>Nishu</div>
            <div>Nishu</div>
            <div>Nishu</div>
        </Grid>
    );
};

export default ParticipantList;
