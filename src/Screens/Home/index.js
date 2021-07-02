import React, { useContext, useEffect } from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import './styles.css';
import history from '../../history';
import { VideoContext } from '../../Context/VideoContext';
import { UserContext } from '../../Context/AuthContext';
import Button from '@material-ui/core/Button';
import { Form } from '../../Components/Form';

const useStyles = makeStyles({
    one: {
        fontSize: '40px',
        fontStyle: 'Lato',
        fontWeight: 'bold'
    },
    two: {
        fontSize: '30px',
        fontStyle: 'Lato'
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
        <div style={{ padding: '1%' }}>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '50%' }}>
                    <Typography className={classes.one}>Hello {state.user.displayName} !</Typography>
                    <Typography className={classes.two}>Welcome to Microsoft Teams</Typography>
                    <div style={{ display: 'flex', paddingTop: '10%' }}>
                        <div style={{ width: '30%' }} onClick={handleCreate} className="btnGroup">
                            <Form.BtnForm content="Create a room" />
                        </div>
                        <div style={{ width: '30%' }} onClick={join} className="btnGroup">
                            <Form.BtnForm content="Join a room" />
                        </div>
                    </div>
                </div>

                <div className="image">
                    <img
                        src="https://image.freepik.com/free-vector/flat-worker-conducts-online-meeting-virtual-team-building-videoconference-home-office_88138-508.jpg"
                        height="400px"
                        alt="teams"
                    />
                    <div onClick={handleLogout} style={{ textAlign: 'right', marginTop: '10%' }}>
                        <Button size="small" variant="outlined" color="secondary">
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};

export default Home;
