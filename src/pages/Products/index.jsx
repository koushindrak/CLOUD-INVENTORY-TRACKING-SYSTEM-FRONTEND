import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, useTheme, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button,Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, createProduct, updateProduct, deleteProduct } from './actions';
import {
    getProductSuccess,
    createProductSuccess,
    updateProductSuccess,
    deleteProductSuccess,
    deleteProductFailure
} from './selectors';
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../containers/Header";
import {getProductStyles} from "./ProductStyles";
import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddIcon from '@mui/icons-material/Add';
import {getCategories, getCategoryFailure, getCategorySuccess} from "./GetProductCategories";
import { successToast, errorToast } from '../../containers/react-toast-alert';
import 'react-toastify/dist/ReactToastify.css';
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import Colors from "../../utils/colors";
import DeleteDialog from "../../containers/DeleteDialog";


const Products = () => {
    const dispatch = useDispatch();
    //selectors constants
    const productResponse = useSelector(getProductSuccess);
    const deleteSuccess = useSelector(deleteProductSuccess);
    const deleteFailure = useSelector(deleteProductFailure);
    const getCategorySuccessResponse = useSelector(getCategorySuccess);
    const getCategoryFailureResponse = useSelector(getCategoryFailure);

    //style constants
    const theme = useTheme();
    const productStyles = getProductStyles(theme);
    const colors = tokens(theme.palette.mode);

    //state constants
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productCategoryList,setProductCategoryList] = useState(null);

    //routing constants
    const navigate = useNavigate();  // new

    /* Effects Start */

    useEffect( () => {
       if (getCategoryFailureResponse){
            errorToast(getCategoryFailureResponse.error)
        }
    },[getCategoryFailureResponse,dispatch])

    useEffect( () => {
        if (getCategorySuccessResponse){
            setProductCategoryList(getCategorySuccessResponse.data)
        }
    },[getCategorySuccessResponse,dispatch])
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch]);

    useEffect(() => {
        if (deleteSuccess) {
            // Refetch products when a product is successfully deleted
            successToast(deleteSuccess.displayMessage)
            dispatch(getProducts());
        }
    }, [deleteSuccess, dispatch]);


    useEffect(() => {
        if (deleteFailure) {
            successToast(deleteFailure.error)
            // dispatch(getProducts());
        }
    }, [deleteFailure, dispatch]);

    /*Effects Section Ends here */

    /* Button click actions start here */
    const handleEdit = (row) => {
        // Dispatch the edit action with the row data as payload
        navigate(`/products/edit/${row.id}`);
    };


    const handleDelete = (row) => {
        handleClickOpen(row);
    };

    const handleClickOpen = (product) => {
        setSelectedProduct(product);
        setOpen(true);
    };

    const handleManagePCB = (row) => {
        /*get all pcbs for a product
         <Route path="/products/:productId/pcbs" element={<Pcb />} />
        */
        navigate(`/products/${row.id}/pcbs/`)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmDelete = () => {
         dispatch(deleteProduct(selectedProduct.id));
        setOpen(false);
    };

    const handleAdd = () => {
        navigate('/products/add'); // Change this to the correct route
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
            field: "productCategoryName",
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

                        <Tooltip title="Edit Product" placement="top">
                        <IconButton color="secondary" onClick={() => handleEdit(params.row)}>
                            <EditOutlinedIcon />
                        </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete Product" placement="top">
                        <IconButton color="secondary" onClick={() => handleDelete(params.row)}>
                            <DeleteOutlinedIcon />
                        </IconButton>
                        </Tooltip>

                        <Tooltip title="Manage PCB's" placement="top">
                        <IconButton color="secondary" onClick={() => handleManagePCB(params.row)}>
                            <DeveloperBoardIcon />
                        </IconButton>
                        </Tooltip>
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
                        backgroundColor: 'lightseagreen'

                    }}
                    startIcon={<AddIcon />}>
                    Add Product
                </Button>


                <Header subtitleStyle={{ color: colors.grey[100] }} subtitle="Managing the Products" />

            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={productStyles}            >
                <DataGrid   rows={productResponse ? productResponse.data : []} columns={columns} />
            </Box>
            </Box>
            <DeleteDialog
                open={open}
                handleClose={handleClose}
                handleConfirmDelete={handleConfirmDelete}
                entityName={selectedProduct?.name}
            />
        </Box>
    );
};

export default Products;
