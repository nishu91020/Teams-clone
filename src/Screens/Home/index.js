import React, { useContext, useEffect, useState } from 'react';
import { Typography, makeStyles, Grid, CircularProgress, TextField, Dialog, DialogContent, DialogTitle, DialogActions, Snackbar } from '@material-ui/core';
import './styles.css';
import { Chat } from '@material-ui/icons';
import history from '../../history';
import { VideoContext } from '../../Context/VideoContext';
import { UserContext } from '../../Context/AuthContext';
import Button from '@material-ui/core/Button';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
    one: {
        color: '#3f51b5',
        fontSize: '290%',
        fontFamily: 'cursive',
        fontStyle: 'italic'
    },
    two: {
        fontSize: '220%',
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
    const [ isCreateDialogOpen, setIsCreateDialogOpen ] = useState(false);
    const { state, logout, isLoading } = useContext(UserContext);
    const { joinChat, createRoom, isConnecting } = useContext(VideoContext);
    const [ failSnackbar, setFailSnackbar ] = useState(false);

    const [ roomId, setRoomId ] = useState('');
    const [ name, setName ] = useState('');

    const Alert = props => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    };
    const handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setFailSnackbar(false);
    };

    const handleJoin = async () => {
        const result = await joinChat(roomId);
        if (result) {
            history.push('/ChatScreen');
        }
        else {
            setFailSnackbar(true);
        }
        setRoomId('');
    };
    const handleCreteDialog = () => {
        setIsCreateDialogOpen(true);
    };
    const handleCreateDialogClose = () => {
        setIsCreateDialogOpen(false);
    };
    const handleCreate = async () => {
        await createRoom(name);
        setIsCreateDialogOpen(false);
        history.push('/ChatScreen');
    };
    const handleLogout = () => {
        const out = async () => {
            await logout();
        };
        out();
    };
    const goToChat = () => {
        history.push('/ChatScreen');
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
                <div style={{ alignItems: 'center', textAlign: 'center' }}>
                    <Typography className={classes.one}>Hello {state.user.displayName} !</Typography>
                    <Typography className={classes.two}>Welcome to Microsoft Teams</Typography>
                </div>

                <Grid container item justify="space-around" className={classes.btnAll} alignItems="center" justify="center">
                    <Grid item container direction="row" justify="center">
                        <TextField value={roomId} size="small" label="Room ID" className={classes.input} type="text" variant="outlined" onChange={e => setRoomId(e.target.value)} />

                        <Button styles={classes.btn} onClick={handleJoin} color="primary" variant="contained" disabled={!roomId}>
                            Join
                        </Button>
                    </Grid>
                    <Grid container item justify="space-around" className={classes.btnAll}>
                        <Button styles={classes.btn} onClick={handleCreteDialog} color="primary" variant="contained">
                            Create a room
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item container sm={6} xs={12} direction="column">
                <img
                    src="https://image.freepik.com/free-vector/flat-worker-conducts-online-meeting-virtual-team-building-videoconference-home-office_88138-508.jpg"
                    width="80%"
                    alt="teams"
                />
                <Grid item container direction="row" alignItems="flex-end" justify="flex-end">
                    <Button variant="contained" color="primary" className={classes.minorBtn} onClick={goToChat}>
                        <Chat /> Chat
                    </Button>
                    <Button className={classes.minorBtn} onClick={handleLogout} variant="outlined" color="secondary">
                        Logout
                    </Button>
                </Grid>
            </Grid>
            <Dialog open={isCreateDialogOpen} onClose={handleCreateDialogClose}>
                <DialogTitle>Crete a room</DialogTitle>
                <DialogContent>
                    <TextField label=" Meeting Title" value={name} onChange={e => setName(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCreateDialogClose} color="primary">
                        Close
                    </Button>
                    <Button onClick={handleCreate} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={failSnackbar} autoHideDuration={2000} onClose={handleErrorClose}>
                <Alert severity="error">This room does not exists</Alert>
            </Snackbar>
        </Grid>
    );
};

export default Home;
