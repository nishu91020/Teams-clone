import React, { useState } from 'react';
import { Button, ButtonGroup, makeStyles } from '@material-ui/core';
import { Videocam, Mic, Chat, CallEnd, PresentToAll, Group } from '@material-ui/icons';
import './styles.css';
import ChatBox from '../../Components/ChatBox';
const useStyles = makeStyles({
    btn: {
        bottom: '10px',
        left: '50%'
    }
});
const VideoScreen = () => {
    const classes = useStyles();
    const [ chat, setChat ] = useState({ active: false });
    const handleChat = () => {
        if (chat.active === true) {
            setChat({ active: false });
        }
        else {
            setChat({ active: true });
        }
    };
    return (
        <div style={{ display: 'flex', overflowY: 'hidden' }}>
            <div className="videoContainer">
                <div className="controlContainer">
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
                        <Button onClick={handleChat}>
                            <Chat />
                        </Button>
                        <Button>
                            <Group />
                        </Button>
                        <Button color="secondary">
                            <CallEnd />
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
            {chat.active ? <ChatBox /> : null}
        </div>
    );
};

export default VideoScreen;
