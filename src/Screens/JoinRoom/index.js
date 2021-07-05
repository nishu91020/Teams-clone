import React, { useState, useContext, useEffect } from 'react';
import { TextField, makeStyles, Grid, CircularProgress } from '@material-ui/core';
import { Form } from '../../Components/Form';
import { VideoContext } from '../../Context/VideoContext';
import { RoomContext } from '../../Context/RoomContext';
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
    const { generateToken, isConnecting } = useContext(VideoContext);

    const handleJoin = () => {
        const getToken = async () => {
            await generateToken(roomId, name);
        };
        getToken();
    };
    // console.log(localAudioTrack);
    // console.log(localVideoTrack);
    if (isConnecting) {
        return (
            <Grid item container alignItems="center" justify="center">
                <CircularProgress thickness={5} />
            </Grid>
        );
    }
    else {
        return (
            <Grid item className={classes.container} container direction="row" alignItems="center" justify="center" xs={12}>
                <Grid item container sm={6} xs={12}>
                    <Preview />
                </Grid>
                <Grid item container alignItems="center" direction="column" xs={12} sm={3} justify="space-evenly">
                    <Form.Title heading="Join a room" />
                    <TextField value={name} label="Name" className={classes.input} type="text" size="small" variant="outlined" onChange={e => setName(e.target.value)} />
                    <TextField value={roomId} size="small" label="Room ID" className={classes.input} type="text" variant="outlined" onChange={e => setRoomId(e.target.value)} />
                    <div onClick={handleJoin}>
                        <Form.BtnForm content="Join" />
                    </div>
                </Grid>
            </Grid>
        );
    }
};

export default JoinRoom;
