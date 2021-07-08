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
    const { createRoom } = useContext(VideoContext);
    const [ name, setName ] = useState('');
    const addRoom = () => {
        createRoom(name).then(() => {
            db
                .collection('meeting')
                .doc(room.uniqueName)
                .set({
                    title: room.roomName,
                    uniqueName: room.uniqueName,
                    CreatedAt: firebase.firestore.Timestamp.now()
                })
                .then(() => {
                    console.log('meeting added successfully');
                })
                .catch(() => {
                    console.log('meeting not created');
                });
        });
    };
    const addUserToMeeting = () => {
        const meetingParticipantList = db.collection('meeting').doc(room.uniqueName).collection('participant');
        meetingParticipantList
            .add(state.user)
            .then(() => {
                console.log('participants added');
            })
            .catch(() => {
                console.log('unable to add participnats');
            });
    };

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleJoinDialogClose = () => {
        setIsJoinDialogOpen(false);
    };
    const handleJoinDialog = () => {
        setIsJoinDialogOpen(true);
    };
    const handleCreateDialogClose = () => {
        setIsCreateDialogOpen(false);
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
                    <Button onClick={addRoom} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={isJoinDialogOpen} onClose={handleJoinDialogClose}>
                <DialogTitle>Join Room</DialogTitle>
                <DialogContent>
                    <TextField label="Room ID" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleJoinDialogClose} color="primary">
                        Close
                    </Button>
                    <Button onClick={addUserToMeeting} color="primary">
                        Join
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Dialogs;
