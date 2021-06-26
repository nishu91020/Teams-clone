import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Form } from '../../Components/Form';
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles({
    input: {
        width: '240px',
        margin: '4%',
        display: 'flex'
    }
});
const JoinRoom = () => {
    const classes = useStyles();
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
                <TextField label="Name" className={classes.input} type="text" id="outlined-basic" />
                <TextField label="Passcode" className={classes.input} type="text" id="outlined-basic" />
                <TextField label="Room Name" className={classes.input} type="text" id="outlined-basic" />
                <Form.BtnForm content="Join" />
            </Form.AuthModal>
        </div>
    );
};

export default JoinRoom;
