import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, useTheme, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useDispatch, useSelector } from 'react-redux';
import Header from "../../containers/Header";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import 'react-toastify/dist/ReactToastify.css';
import {getOrder, getOrderSuccess} from "./GetAllOrders";
import {getOrderStyles} from "./css/OrderStyle";
import {ViewList} from "@mui/icons-material";
import { columns } from './SalesOrdersColumns';
import CircularProgress from '@mui/material/CircularProgress';

const Orders = () => {
    const dispatch = useDispatch();
    const getOrderSuccessResponse = useSelector(getOrderSuccess);

    //style constants
    const theme = useTheme();
    const orderStyles = getOrderStyles(theme);
    const colors = tokens(theme.palette.mode);

    //state constants
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    //routing constants
    const navigate = useNavigate();  // new

    /* Effects Start */

    useEffect(() => {
        const fetchData = async () => {

            setLoading(true);
            await dispatch(getOrder());
            setLoading(false);
        };
        fetchData();
    }, [dispatch]);


    /*------------Effects Section Ends here----------------- */

    /* Button click actions start here */
    const handleViewDetails = (row) => {
        // Dispatch the edit action with the row data as payload
        navigate(`/orders/edit/${row.id}`);
    };


    const handleDelete = (row) => {
        handleClickOpen(row);
    };

    const handleClickOpen = (order) => {
        setSelectedOrder(order);
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmDelete = () => {
         // dispatch(deleteOrder(selectedOrder.id));
        setOpen(false);
    };

    const handleAdd = () => {
        navigate('/orders/add'); // Change this to the correct route
    };
    /* Button click actions ends here */

    const completeColumns = [
        ...columns,
        {
            headerName: "Actions",
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: (params) => {
                return (
                    <div>
                        <IconButton color="secondary" onClick={() => handleViewDetails(params.row)}>
                            <ViewList />
                        </IconButton>
                    </div>
                );
            },
        }
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
                    startIcon={<AddIcon />}
                >
                    Add Order
                </Button>
                <Header
                    subtitleStyle={{ color: colors.grey[100] }}
                    subtitle="Managing the Orders"
                />
                <Box m="40px 0 0 0" height="75vh" sx={orderStyles}>
                    {getOrderSuccessResponse && !loading ? (
                        <DataGrid
                            getRowId={(row) => row.SalesorderId}
                            rows={getOrderSuccessResponse.data}
                            columns={completeColumns}
                        />
                    ) : (
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            height="100%"
                        >
                            <CircularProgress />
                        </Box>
                    )}
                </Box>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete Order"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete the order - {selectedOrder?.name}?
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

export default Orders;
