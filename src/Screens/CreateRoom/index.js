import React, { useState } from 'react';
import { Form } from '../../Components/Form';
import TextField from '@material-ui/core/TextField';
import Header from '../../Components/Header';
import { makeStyles } from '@material-ui/core';

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
    const [ roomName, , setRoomName ] = useState('');
    return (
        <div>
            <Header />
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
                />
                <TextField
                    label="Room Name"
                    className={classes.input}
                    value={roomName}
                    type="text"
                    size="small"
                    id="outlined-basic"
                />
            </Form.AuthModal>
        </div>
    );
};

export default CreateRoom;
