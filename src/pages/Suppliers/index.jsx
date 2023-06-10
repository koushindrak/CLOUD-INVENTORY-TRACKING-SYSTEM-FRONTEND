import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    useTheme
} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {tokens} from "../../theme";
import {useDispatch, useSelector} from 'react-redux';
import Header from "../../containers/Header";
import 'react-toastify/dist/ReactToastify.css';
import {getSupplier, getSupplierSuccess} from "./GetAllSupplier";
import {getSupplierStyles} from "./css/SupplierStyles";


const Supplier = () => {
    const dispatch = useDispatch();
    const getSupplierSuccessResponse = useSelector(getSupplierSuccess);

    //style constants
    const theme = useTheme();
    const supplierStyles = getSupplierStyles(theme);
    const colors = tokens(theme.palette.mode);

    //state constants
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedSupplier, setSelectedSupplier] = useState(null);

    //routing constants
    const navigate = useNavigate();  // new

    /* Effects Start */


    useEffect(() => {
        dispatch(getSupplier());
    }, [dispatch]);





    /*Effects Section Ends here */

    /* Button click actions start here */
    const handleEdit = (row) => {
        // Dispatch the edit action with the row data as payload
        navigate(`/suppliers/edit/${row.id}`);
    };


    const handleDelete = (row) => {
        handleClickOpen(row);
    };

    const handleClickOpen = (supplier) => {
        setSelectedSupplier(supplier);
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmDelete = () => {
         // dispatch(deleteSupplier(selectedSupplier.id));
        setOpen(false);
    };

    const handleAdd = () => {
        navigate('/suppliers/add'); // Change this to the correct route
    };
    /* Button click actions ends here */

    const columns = [
        {
            field: "id",
            headerName: "ID",
            headerAlign: "center",
            align: "center",
        },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
            headerAlign: "center",
            align: "center",
        },
        {
            field: "email",
            headerName: "Email",
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "contacts",
            headerName: "Contacts",
            flex: 1,
            headerAlign: "center",
            align: "center",
        },
        // {
        //     headerName: "Actions",
        //     headerAlign: "center",
        //     align: "center",
        //     flex: 1,
        //     renderCell: (params) => {
        //         return (
        //             <div>
        //                 <IconButton color="secondary" onClick={() => handleEdit(params.row)}>
        //                     <EditOutlinedIcon />
        //                 </IconButton>
        //                 <IconButton color="secondary" onClick={() => handleDelete(params.row)}>
        //                     <DeleteOutlinedIcon />
        //                 </IconButton>
        //             </div>
        //         );
        //     },
        // },
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


                <Header
                    subtitleStyle={{ color: colors.grey[100] }}
                    subtitle="Managing the Suppliers" />

            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={supplierStyles}            >
                <DataGrid   rows={getSupplierSuccessResponse ? getSupplierSuccessResponse.data : []} columns={columns} />
            </Box>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete Supplier"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete the supplier - {selectedSupplier?.name}?
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

export default Supplier;
