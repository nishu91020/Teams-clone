import React, { useState } from 'react';
import Video from 'twilio-video';
import axios from 'axios';
import Button from '@material-ui/core/Button';
const VideoScreen = () => {
    const [ identity, setIdentity ] = useState('');
    const [ room, setRoom ] = useState(null);
    return (
        <div>
            VideoScreen
            <Button variant="contained" color="secondary">
                Leave
            </Button>
        </div>
    );
};

export default VideoScreen;
