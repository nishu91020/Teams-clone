import React, { useContext, useEffect } from 'react';
import { Typography, makeStyles, Grid } from '@material-ui/core';
import './styles.css';
import history from '../../history';
import { VideoContext } from '../../Context/VideoContext';
import { UserContext } from '../../Context/AuthContext';
import Button from '@material-ui/core/Button';
import { Form } from '../../Components/Form';

const useStyles = makeStyles({
    one: {
        fontSize: '50px',
        fontFamily: 'cursive',
        fontStyle: 'italic',
        fontWeight: 'bold'
    },
    two: {
        fontSize: '30px',
        fontFamily: 'cursive',
        fontStyle: 'italic'
    }
});
const Home = () => {
    const classes = useStyles();
    const { state, logout } = useContext(UserContext);
    const { createRoom } = useContext(VideoContext);
    useEffect(() => {
        if (!state.token) {
            history.push('/');
        }
    });
    const handleLogout = () => {
        logout();
    };
    const handleCreate = () => {
        createRoom();
    };
    const join = () => {
        history.push('/JoinRoom');
    };
    return state.user ? (
        <Grid item style={{ padding: '1%', display: 'flex' }} sm={12}>
            <Grid item className="textArea" sm={6} xs={12} alignItems="center" justify="center">
                <Typography className={classes.one}>Hello {state.user.displayName} !</Typography>
                <Typography className={classes.two}>Welcome to Microsoft Teams</Typography>
                <Grid item style={{ display: 'flex', paddingTop: '10%' }}>
                    <Grid item style={{ width: '30%' }} onClick={handleCreate} className="btnGroup">
                        <Form.BtnForm content="Create a room" />
                    </Grid>
                    <Grid item style={{ width: '30%' }} onClick={join} className="btnGroup">
                        <Form.BtnForm content="Join a room" />
                    </Grid>
                </Grid>
            </Grid>

            <Grid item sm={6} xs={12}>
                <img
                    src="https://image.freepik.com/free-vector/flat-worker-conducts-online-meeting-virtual-team-building-videoconference-home-office_88138-508.jpg"
                    height="400px"
                    alt="teams"
                />
                <Grid item onClick={handleLogout} style={{ textAlign: 'right', marginTop: '10%' }}>
                    <Button size="small" variant="outlined" color="secondary">
                        Logout
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    ) : null;
};

export default Home;
