import React, { useState } from 'react';
import { MoreVert } from '@material-ui/icons';
import { Menu, MenuItem, Dialog, DialogContent, DialogTitle, DialogActions, TextField, Button } from '@material-ui/core';
const Dialogs = () => {
    const [ isJoinDialogOpen, setIsJoinDialogOpen ] = useState(false);
    const [ isCreateDialogOpen, setIsCreateDialogOpen ] = useState(false);
    const [ isJoinMessageDialogOpen, setIsJoinMessageDialogOpen ] = useState(false);
    const [ anchorEl, setAnchorEl ] = useState(null);
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
    const handleJoinMessageDialogClose = () => {
        setIsJoinMessageDialogOpen(false);
    };
    const handleJoinMessageDialog = () => {
        setIsJoinMessageDialogOpen(true);
    };
    return (
        <div>
            <MoreVert onClick={handleClick} />
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={handleCreateDialog}>Create Meeting</MenuItem>
                <MenuItem onClick={handleJoinDialog}>Join Meeting</MenuItem>
                <MenuItem onClick={handleJoinMessageDialog}>Join Chats</MenuItem>
            </Menu>
            <Dialog open={isCreateDialogOpen} onClose={handleCreateDialogClose}>
                <DialogTitle>Crete a room</DialogTitle>
                <DialogContent>
                    <TextField label=" Meeting Title" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCreateDialogClose} color="primary">
                        Close
                    </Button>
                    <Button onClick={handleCreateDialogClose} color="primary">
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
                    <Button onClick={handleJoinDialogClose} color="primary">
                        Join
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={isJoinMessageDialogOpen} onClose={handleJoinMessageDialogClose}>
                <DialogTitle>Join Room</DialogTitle>
                <DialogContent>
                    <TextField label="Room ID" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleJoinMessageDialogClose} color="primary">
                        Close
                    </Button>
                    <Button onClick={handleJoinMessageDialogClose} color="primary">
                        Join ChatRoom
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Dialogs;
