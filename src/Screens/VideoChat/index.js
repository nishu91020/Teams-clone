import React, { useContext } from 'react';
import { Form } from '../../Components/Form';
import './styles.css';
import history from '../../history';
import { VideoContext } from '../../Context/VideoContext';

const VideoChat = () => {
    const { createRoom } = useContext(VideoContext);
    const handleCreate = () => {
        createRoom();
    };
    const join = () => {
        history.push('/JoinRoom');
    };
    return (
        <div>
            <div className="image">
                <img
                    src="https://image.freepik.com/free-vector/flat-worker-conducts-online-meeting-virtual-team-building-videoconference-home-office_88138-508.jpg"
                    height="350px"
                    alt="teams"
                />
            </div>
            <div>
                <div onClick={handleCreate} className="btnGroup">
                    <Form.BtnForm content="Create a room" />
                </div>
                <div onClick={join} className="btnGroup">
                    <Form.BtnForm content="Join a room" />
                </div>
            </div>
        </div>
    );
};

export default VideoChat;
