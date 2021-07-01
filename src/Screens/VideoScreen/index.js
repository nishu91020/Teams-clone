import React, { useState, useContext, useEffect } from 'react';
import './styles.css';
import ChatBox from '../../Components/ChatBox';
import BtnGroup from '../../Components/BtnGroup';
import { Grid } from '@material-ui/core';
import CardContainer from '../../Components/CardContainer';
import { RoomContext } from '../../Context/RoomContext';
import { VideoContext } from '../../Context/VideoContext';

const VideoScreen = () => {
    const { connect, isConnecting } = useContext(RoomContext);
    const { state } = useContext(VideoContext);
    const [ chat, setChat ] = useState({ active: false });

    useEffect(() => {
        console.log(state.accessToken);
        connect(state.accessToken);
    }, []);

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
