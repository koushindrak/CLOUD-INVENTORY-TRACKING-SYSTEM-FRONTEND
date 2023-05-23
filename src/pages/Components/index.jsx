import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, useTheme, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useDispatch, useSelector } from 'react-redux';
import Header from "../../containers/Header";
import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddIcon from '@mui/icons-material/Add';
import { successToast, errorToast } from '../../containers/react-toast-alert';
import 'react-toastify/dist/ReactToastify.css';
import {getComponent, getComponentSuccess} from "./GetAllComponent";
import {getComponentStyles} from "./css/ComponentStyles";


const Component = () => {
    const dispatch = useDispatch();
    const getComponentSuccessResponse = useSelector(getComponentSuccess);

    //style constants
    const theme = useTheme();
    const componentStyles = getComponentStyles(theme);
    const colors = tokens(theme.palette.mode);

    //state constants
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedComponent, setSelectedComponent] = useState(null);

    //routing constants
    const navigate = useNavigate();  // new

    /* Effects Start */


    useEffect(() => {
        dispatch(getComponent());
    }, [dispatch]);





    /*Effects Section Ends here */

    /* Button click actions start here */
    const handleEdit = (row) => {
        // Dispatch the edit action with the row data as payload
        navigate(`/components/edit/${row.id}`);
    };


    const handleDelete = (row) => {
        handleClickOpen(row);
    };

    const handleClickOpen = (component) => {
        setSelectedComponent(component);
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmDelete = () => {
         // dispatch(deleteComponent(selectedComponent.id));
        setOpen(false);
    };

    const handleAdd = () => {
        navigate('/components/add'); // Change this to the correct route
    };
    /* Button click actions ends here */

    const columns = [
        {
            field: "id",
            headerName: "ID",
            headerAlign: "center",
            align: "center",
            cellClassName: "id-column--cell",  // Add the className here
        },
        {
            field: "mfrptn",
            headerName: "MFRPTN",
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "description",
            headerName: "Description",
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "componentCategoryName",
            headerName: "Category",
            flex: 1,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "footprint",
            headerName: "FOOTPRINT",
            flex: 1,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "value",
            headerName: "VALUE",
            flex: 1,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "isObselete",
            headerName: "Obselete",
            flex: 1,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "threshold",
            headerName: "Threshold",
            flex: 1,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "stock",
            headerName: "Stock",
            flex: 1,
            headerAlign: "center",
            align: "center",
        },
        {
            headerName: "Actions",
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: (params) => {
                return (
                    <div>
                        <IconButton color="secondary" onClick={() => handleEdit(params.row)}>
                            <EditOutlinedIcon />
                        </IconButton>
                        <IconButton color="secondary" onClick={() => handleDelete(params.row)}>
                            <DeleteOutlinedIcon />
                        </IconButton>
                    </div>
                );
            },
        },
    ];
    function Header({ title, subtitle, subtitleStyle }) {
        return (
            <header>
                <h1>{title}</h1>
                <h2 style={subtitleStyle}>{subtitle}</h2>
            </header>
        );
    }


    return (
        <Box m="20px">

            <Box position="relative">
                <Button
                    onClick={handleAdd}
                    variant="outlined"
                    sx={{
                        position: 'absolute',
                        top: 0,
                        right: 10,
                        zIndex: 1000,
                        color: 'white',
                        backgroundColor: '#847343'

                    }}
                    startIcon={<AddIcon />}>
                    Add Component
                </Button>


                <Header subtitleStyle={{ color: 'black' }} subtitle="Managing the Components" />

            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={componentStyles}            >
                <DataGrid   rows={getComponentSuccessResponse ? getComponentSuccessResponse.data : []} columns={columns} />
            </Box>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete Component"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete the component - {selectedComponent?.name}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Component;
