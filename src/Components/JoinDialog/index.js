import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@material-ui/core';
const JoinDialog = props => {
    return (
        <div>
            <Dialog open={true} onClose={props.handleClose}>
                <DialogTitle>Join Room</DialogTitle>
                <DialogContent>
                    <TextField variant="outlined" label="Room ID" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        Close
                    </Button>
                    <Button onClick={props.handleClose} color="primary">
                        Join
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default JoinDialog;
