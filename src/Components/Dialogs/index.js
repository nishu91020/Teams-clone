//joining and creating options in chat screen.

import React, { useState, useContext } from 'react';
import 'firebase/firestore';
import { VideoContext } from '../../Context/VideoContext';
import { MoreVert } from '@material-ui/icons';
import MuiAlert from '@material-ui/lab/Alert';
import { Menu, MenuItem, Dialog, DialogContent, DialogTitle, DialogActions, TextField, Button, Snackbar } from '@material-ui/core';

const Dialogs = () => {
    const [ isJoinDialogOpen, setIsJoinDialogOpen ] = useState(false);
    const [ isCreateDialogOpen, setIsCreateDialogOpen ] = useState(false);
    const [ anchorEl, setAnchorEl ] = useState(null);
    const { createRoom, joinChat } = useContext(VideoContext);
    const [ failSnackbar, setFailSnackbar ] = useState(false);
    const [ successSnackbar, setSuccessSnackbar ] = useState(false);
    const [ name, setName ] = useState('');
    const [ roomId, setRoomId ] = useState('');

    const Alert = props => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    };
    const handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessSnackbar(false);
        setFailSnackbar(false);
    };

    const handleCreate = async () => {
        await createRoom(name);
        setIsCreateDialogOpen(false);
        setName('');
    };
    const handleJoin = async () => {
        const result = await joinChat(roomId);
        if (!result) setFailSnackbar(true);
        else setSuccessSnackbar(true);
        setIsJoinDialogOpen(false);
        setRoomId('');
    };
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleJoinDialogClose = () => {
        setIsJoinDialogOpen(false);
        setRoomId('');
    };
    const handleJoinDialog = () => {
        setIsJoinDialogOpen(true);
    };
    const handleCreateDialogClose = () => {
        setIsCreateDialogOpen(false);
        setName('');
    };
    const handleCreateDialog = () => {
        setIsCreateDialogOpen(true);
    };
    return (
        <div>
            <MoreVert onClick={handleClick} />
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={handleCreateDialog}>Create Meeting</MenuItem>
                <MenuItem onClick={handleJoinDialog}>Join Meeting</MenuItem>
            </Menu>
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
            <Dialog open={isJoinDialogOpen} onClose={handleJoinDialogClose}>
                <DialogTitle>Join Room</DialogTitle>
                <DialogContent>
                    <TextField label="Room ID" value={roomId} onChange={e => setRoomId(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleJoinDialogClose} color="primary">
                        Close
                    </Button>
                    <Button onClick={handleJoin} color="primary">
                        Join
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={failSnackbar} autoHideDuration={2000} onClose={handleErrorClose}>
                <Alert severity="error">This room does not exists</Alert>
            </Snackbar>
            <Snackbar open={successSnackbar} autoHideDuration={2000} onClose={handleErrorClose}>
                <Alert severity="success">Room added to your chat list</Alert>
            </Snackbar>
        </div>
    );
};

export default Dialogs;
