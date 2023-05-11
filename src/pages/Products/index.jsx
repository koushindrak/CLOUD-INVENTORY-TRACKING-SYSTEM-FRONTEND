import { useState,useEffect } from 'react';
import { Box, Typography, useTheme, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, createProduct, updateProduct, deleteProduct } from './actions';
import { getProductSuccess, createProductSuccess, updateProductSuccess, deleteProductSuccess } from './selectors';
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../containers/Header";
import {getProductStyles} from "./ProductStyles";
import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';


const Products = () => {
    const dispatch = useDispatch();
    const productResponse = useSelector(getProductSuccess);
    const deleteSuccess = useSelector(deleteProductSuccess);

    const theme = useTheme();
    const productStyles = getProductStyles(theme);
    const colors = tokens(theme.palette.mode);

    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    useEffect(() => {
        if (deleteSuccess) {
            // Refetch products when a product is successfully deleted
            dispatch(getProducts());
        }
    }, [deleteSuccess, dispatch]);
    useEffect(() => {
        console.log("productResponse---",productResponse)
    }, [productResponse]);




    const handleEdit = (row) => {
        // Dispatch the edit action with the row data as payload
        // dispatch(editProduct(row));
    };


    const handleDelete = (row) => {
        handleClickOpen(row);
    };

    const handleClickOpen = (product) => {
        setSelectedProduct(product);
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmDelete = () => {
         dispatch(deleteProduct(selectedProduct.id));
        setOpen(false);
    };

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
            field: "description",
            headerName: "Description",
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "serialNumber",
            headerName: "Serial Number",
            flex: 1,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "category",
            headerName: "Category",
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

    return (
        <Box m="20px">
            <Header  subtitle="Managing the Products" />
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={productStyles}            >
                <DataGrid   rows={productResponse ? productResponse.data : []} columns={columns} />
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete Product"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete the product - {selectedProduct?.name}?
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

export default Products;
