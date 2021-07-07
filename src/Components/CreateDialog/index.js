import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@material-ui/core';

const CreateDialog = (open, handleClose) => {
    return (
        <div>
            <Dialog open={true} onClose={handleClose}>
                <DialogTitle>Crete a room</DialogTitle>
                <DialogContent>
                    <TextField label=" Meeting Title" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CreateDialog;
