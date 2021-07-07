import React, { useContext, useEffect, useState } from 'react';
import { Typography, makeStyles, Grid, CircularProgress, TextField } from '@material-ui/core';
import './styles.css';
import { Chat } from '@material-ui/icons';
import history from '../../history';
import { VideoContext } from '../../Context/VideoContext';
import { UserContext } from '../../Context/AuthContext';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    one: {
        color: '#3f51b5',
        fontSize: '50px',
        fontFamily: 'cursive',
        fontStyle: 'italic',
        fontWeight: 'bold'
    },
    two: {
        fontSize: '30px',
        fontFamily: 'cursive',
        fontStyle: 'italic'
    },
    btnAll: {
        width: '50%',
        margin: '5%'
    },
    minorBtn: {
        margin: '2%',
        marginTop: '12%'
    }
});
const Home = () => {
    const classes = useStyles();
    const { state, logout, isLoading } = useContext(UserContext);
    const { createRoom, isConnecting, generateToken } = useContext(VideoContext);
    const [ roomId, setRoomId ] = useState('');
    // useEffect(() => {
    //     if (!state.token) {
    //         history.push('/');
    //     }
    // });
    const handleLogout = () => {
        const out = async () => {
            await logout();
        };
        out();
    };
    const handleCreate = async () => {
        const create = async () => {
            await createRoom();
        };
        create();
    };
    const handleJoin = () => {
        history.push(`/Preview/${roomId}`);
    };

    if (isConnecting || isLoading) {
        return (
            <div style={{ top: '50%', left: '50%', position: 'absolute' }}>
                <CircularProgress thickness={5} />
            </div>
        );
    }
    return (
        <Grid container item direction="row" xs={12} alignItems="center" justify="center" className={classes.homeContainer}>
            <Grid container item className="textArea" sm={6} xs={12} alignItems="center" justify="center">
                <Typography className={classes.one}>Hello {state.user.displayName} !</Typography>
                <Typography className={classes.two}>Welcome to Microsoft Teams</Typography>
                <Grid container item justify="space-around" className={classes.btnAll}>
                    <Grid item container direction="row">
                        <TextField value={roomId} size="small" label="Room ID" className={classes.input} type="text" variant="outlined" onChange={e => setRoomId(e.target.value)} />

                        <Button styles={classes.btn} onClick={handleJoin} color="primary" variant="contained">
                            Join
                        </Button>
                    </Grid>
                    <Grid container item justify="space-around" className={classes.btnAll}>
                        <Button styles={classes.btn} onClick={handleCreate} color="primary" variant="contained">
                            Create a room
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item container sm={6} xs={12} direction="column">
                <img
                    src="https://image.freepik.com/free-vector/flat-worker-conducts-online-meeting-virtual-team-building-videoconference-home-office_88138-508.jpg"
                    width="500px"
                    alt="teams"
                />
                <Grid item container direction="row" alignItems="flex-end" justify="flex-end">
                    <Button variant="contained" color="primary" className={classes.minorBtn}>
                        <Chat />
                    </Button>
                    <Button className={classes.minorBtn} onClick={handleLogout} variant="outlined" color="secondary">
                        Logout
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Home;
