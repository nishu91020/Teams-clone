import React, { useState, useContext } from 'react';
import { TextField, makeStyles, Paper, Grid } from '@material-ui/core';
import { Form } from '../../Components/Form';
import { VideoContext } from '../../Context/VideoContext';
import Preview from '../../Components/Preview';
const useStyles = makeStyles({
    input: {
        width: '240px',
        margin: '4%',
        display: 'flex'
    },
    container: {
        padding: '2%',
        height: '93vh',
        width: '100vw',
        display: 'flex'
    },
    element: {
        padding: '2%'
    }
});
const JoinRoom = () => {
    const classes = useStyles();
    const [ name, setName ] = useState('');
    const [ roomId, setRoomId ] = useState('');
    const { generateToken, state } = useContext(VideoContext);
    const handleJoin = () => {
        console.log(state.room.uniqueName);
        generateToken(roomId, name);
    };
    return (
        <Grid className={classes.container} container direction="row" alignItems="center" justify="center" xs={12}>
            <Grid Item container sm={6} xs={12}>
                <Preview />
            </Grid>
            <Grid Item container alignItems="center" direction="column" xs={12} sm={3} justify="space-evenly">
                <Form.Title heading="Join a room" />
                <TextField
                    value={name}
                    label="Name"
                    className={classes.input}
                    type="text"
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    onChange={e => setName(e.target.value)}
                />
                <TextField
                    value={roomId}
                    size="small"
                    label="Room ID"
                    className={classes.input}
                    type="text"
                    variant="outlined"
                    id="outlined-basic"
                    onChange={e => setRoomId(e.target.value)}
                />
                <div onClick={handleJoin}>
                    <Form.BtnForm content="Join" />
                </div>
            </Grid>
        </Grid>
    );
};

export default JoinRoom;
