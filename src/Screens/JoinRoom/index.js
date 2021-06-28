import React, { useState, useContext } from 'react';
import { TextField, makeStyles } from '@material-ui/core';
import { Form } from '../../Components/Form';
import history from '../../history';
import { VideoContext } from '../../Context/VideoContext';
const useStyles = makeStyles({
    input: {
        width: '240px',
        margin: '4%',
        display: 'flex'
    }
});
const JoinRoom = () => {
    const classes = useStyles();
    const [ name, setName ] = useState('');
    const [ roomId, setRoomId ] = useState('');
    const { generateToken } = useContext(VideoContext);
    const handleJoin = () => {
        generateToken(roomId, name);
        history.push(`/PreviewScreen/${roomId}`);
    };
    return (
        <div>
            <Form.AuthModal>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg"
                    width="34"
                    height="34"
                    alt="Teams"
                />
                <Form.Title heading="Join a room" />
                <TextField
                    value={name}
                    label="Name"
                    className={classes.input}
                    type="text"
                    id="outlined-basic"
                    onChange={e => setName(e.target.value)}
                />
                <TextField
                    value={roomId}
                    label="Room ID"
                    className={classes.input}
                    type="text"
                    id="outlined-basic"
                    onChange={e => setRoomId(e.target.value)}
                />
                <div onClick={handleJoin}>
                    <Form.BtnForm content="Join" />
                </div>
            </Form.AuthModal>
        </div>
    );
};

export default JoinRoom;
