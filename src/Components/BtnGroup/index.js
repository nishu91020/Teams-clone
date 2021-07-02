import React from 'react';
import { Button, ButtonGroup, makeStyles } from '@material-ui/core';
import { Videocam, Mic, Chat, CallEnd, PresentToAll, Group } from '@material-ui/icons';

const useStyles = makeStyles({
    btn: {
        bottom: '10px',
        left: '50%'
    }
});
const BtnGroup = props => {
    const classes = useStyles();

    return (
        <div>
            <ButtonGroup
                size="large"
                className={classes.btn}
                variant="contained"
                color="default"
                aria-label="contained primary button group"
            >
                <Button>
                    <Videocam />
                </Button>
                <Button>
                    <Mic />
                </Button>
                <Button>
                    <PresentToAll />
                </Button>
                <Button onClick={props.handleChat}>
                    <Chat />
                </Button>
                <Button>
                    <Group />
                </Button>
                <Button color="secondary" onClick={props.dropCall}>
                    <CallEnd />
                </Button>
            </ButtonGroup>
        </div>
    );
};
export default BtnGroup;
