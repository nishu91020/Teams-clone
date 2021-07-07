import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@material-ui/core';

const JoinMessage = (open, handleClose) => {
    return (
        <div>
            <Dialog open={true} onClose={handleClose}>
                <DialogTitle>Join Room</DialogTitle>
                <DialogContent>
                    <TextField variant="outlined" label="Room ID" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Join ChatRoom
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default JoinMessage;
