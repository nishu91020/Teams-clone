import React, { useState } from 'react';
import './styles.css';
import ChatBox from '../../Components/ChatBox';
import BtnGroup from '../../Components/BtnGroup';
import { Grid } from '@material-ui/core';
import CardContainer from '../../Components/CardContainer';

const VideoScreen = () => {
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
        <Grid style={{ display: 'flex', overflowY: 'hidden' }}>
            <Grid className="videoContainer">
                <CardContainer />
                <Grid className="controlContainer">
                    <BtnGroup handleChat={handleChat} />
                </Grid>
            </Grid>
            {chat.active ? <ChatBox handleChat={handleChat} /> : null}
        </Grid>
    );
};

export default VideoScreen;
