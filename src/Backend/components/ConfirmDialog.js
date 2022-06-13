import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material';

const ConfirmDialog = ({ title, children, open, setOpen, onConfirm }) => {
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="confirm-dialog"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="confirm-dialog">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {children}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    color='success'
                    onClick={() => setOpen(false)}>
                    No
                </Button>
                <Button
                    variant="outlined"
                    color='error'
                    onClick={() => {
                        setOpen(false);
                        onConfirm();
                    }}>
                    Yes
                </Button>

            </DialogActions>
        </Dialog>
    );
}

export default ConfirmDialog;