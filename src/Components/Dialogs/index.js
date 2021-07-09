import React, { useState, useContext } from 'react';
import { db } from '../../firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { RoomContext } from '../../Context/RoomContext';
import { MoreVert } from '@material-ui/icons';
import { VideoContext } from '../../Context/VideoContext';
import { UserContext } from '../../Context/AuthContext';
import { Menu, MenuItem, Dialog, DialogContent, DialogTitle, DialogActions, TextField, Button } from '@material-ui/core';

const Dialogs = () => {
    const { room } = useContext(RoomContext);
    const { state } = useContext(UserContext);
    const [ isJoinDialogOpen, setIsJoinDialogOpen ] = useState(false);
    const [ isCreateDialogOpen, setIsCreateDialogOpen ] = useState(false);
    const [ anchorEl, setAnchorEl ] = useState(null);
    const { createRoom, joinChat } = useContext(VideoContext);
    const [ name, setName ] = useState('');
    const [ roomId, setRoomId ] = useState('');

    const handleCreate = async () => {
        await createRoom(name);
        setIsCreateDialogOpen(false);
        setName('');
    };
    const handleJoin = async () => {
        await joinChat(roomId);
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
        </div>
    );
};

export default Dialogs;
