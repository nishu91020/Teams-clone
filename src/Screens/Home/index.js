import React, { useContext, useEffect } from 'react';
import { Typography, makeStyles, Grid } from '@material-ui/core';
import './styles.css';
import history from '../../history';
import { VideoContext } from '../../Context/VideoContext';
import { UserContext } from '../../Context/AuthContext';
import Button from '@material-ui/core/Button';

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
    },
    btnAll: {
        width: '50%',
        margin: '5%'
    },
    logout: {
        marginTop: '20%',
        right: '5%'
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
        <Grid
            container
            item
            direction="row"
            xs={12}
            alignItems="center"
            justify="center"
            className={classes.homeContainer}
        >
            <Grid container item className="textArea" sm={6} xs={12} alignItems="center" justify="center">
                <Typography className={classes.one}>Hello {state.user.displayName} !</Typography>
                <Typography className={classes.two}>Welcome to Microsoft Teams</Typography>
                <Grid container item justify="space-around" className={classes.btnAll}>
                    <Button styles={classes.btn} onClick={handleCreate} color="primary" variant="contained">
                        Create a room
                    </Button>

                    <Button styles={classes.btn} onClick={join} color="primary" variant="contained">
                        Join a room
                    </Button>
                </Grid>
            </Grid>

            <Grid item sm={6} xs={12}>
                <img
                    src="https://image.freepik.com/free-vector/flat-worker-conducts-online-meeting-virtual-team-building-videoconference-home-office_88138-508.jpg"
                    height="400px"
                    alt="teams"
                />

                <Button
                    className={classes.logout}
                    onClick={handleLogout}
                    size="small"
                    variant="outlined"
                    color="secondary"
                >
                    Logout
                </Button>
            </Grid>
        </Grid>
    ) : null;
};

export default Home;
