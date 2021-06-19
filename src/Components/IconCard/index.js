import React from 'react';
import ChatIcon from '@material-ui/icons/Chat';
import VideocamIcon from '@material-ui/icons/Videocam';
const IconCard = () => {
    return (
        <div>
            <div className="item">
                <ChatIcon />
                <label>Chat</label>
            </div>
            <div className="item">
                <VideocamIcon />
                <label>Video Chat</label>
            </div>
        </div>
    );
};

export default IconCard;
