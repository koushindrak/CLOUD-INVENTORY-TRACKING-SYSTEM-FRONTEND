import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

const DeleteDialog = ({open, handleClose, handleConfirmDelete, entityName}) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="md"
            PaperProps={{
                style: {
                    backgroundColor: '#f5f5f5',
                    borderRadius: 5,
                    padding: 10,
                },
            }}
            sx={{
                '& .MuiTypography-root': {fontSize: '1.2rem'},
                '& .MuiDialogTitle-root': {fontWeight: 'bold'},
                '& .MuiButton-root': {fontSize: '1.1rem', fontWeight: 'bold'}
            }}
        >
            <DialogTitle id="alert-dialog-title" style={{color: '#3f51b5', textAlign: 'center'}}>
                {"Delete Item"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" style={{color: '#060304'}}>
                    Are you sure you want to delete the item - {entityName}?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" variant="contained"
                        style={{marginRight: '10px', color: '#ffffff', backgroundColor: '#010c3f'}}>
                    Cancel
                </Button>
                <Button onClick={handleConfirmDelete} color="secondary" variant="contained"
                        style={{color: '#ffffff', backgroundColor: '#f44336'}}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteDialog;
