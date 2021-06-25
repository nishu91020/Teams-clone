import React from 'react';
import Header from '../../Components/Header';
import { Form } from '../../Components/Form';
import './styles.css';
import history from '../../history';
const VideoChat = () => {
    const create = () => {
        history.push('/CreateRoom');
    };
    const join = () => {
        history.push('/JoinRoom');
    };
    return (
        <div>
            <Header />
            <div>
                <div onClick={create} className="btnGroup">
                    <Form.BtnOutline content="Create a room" />
                </div>
                <div onClick={join} className="btnGroup">
                    <Form.BtnOutline content="Join a room" />
                </div>
            </div>
            <div className="image">
                <img
                    src="https://d57439wlqx3vo.cloudfront.net/iblock/5d5/5d56f403033e04db25c5d3bb04e9639f/20f9a94927a2d8b4400129b2c12651b6.jpg"
                    height="350px"
                    alt="teams"
                />
            </div>
        </div>
    );
};

export default VideoChat;
