import React, { useState, useContext } from 'react';
import { Form } from '../../Components/Form';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';
import { VideoContext } from '../../Context/VideoContext';
const useStyles = makeStyles({
    input: {
        width: '240px',
        margin: '4%',
        display: 'flex'
    }
});

const CreateRoom = () => {
    const classes = useStyles();
    const [ name, setName ] = useState('');
    const [ roomName, setRoomName ] = useState('');
    const { room } = useContext(VideoContext);
    return (
        <div>
            <Form.AuthModal>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg"
                    width="34"
                    height="34"
                    alt="Teams"
                />
                <Form.Title heading="Create a room" />
                <TextField
                    label="Name"
                    className={classes.input}
                    value={name}
                    type="text"
                    size="small"
                    id="outlined-basic"
                    onChange={e => setName(e.target.value)}
                />
                <TextField
                    label="Room Name"
                    className={classes.input}
                    value={roomName}
                    type="text"
                    size="small"
                    id="outlined-basic"
                    onChange={e => setRoomName(e.target.value)}
                />
                <div onClick={room}>
                    <Form.BtnForm content="Create" />
                </div>
            </Form.AuthModal>
        </div>
    );
};

export default CreateRoom;
