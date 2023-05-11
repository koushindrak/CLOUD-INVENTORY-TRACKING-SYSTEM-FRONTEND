import { useEffect } from 'react';
import { Box, Typography, useTheme } from "@mui/material";
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

const Products = () => {
    const dispatch = useDispatch();
    const productResponse = useSelector(getProductSuccess);
    const theme = useTheme();
    const productStyles = getProductStyles(theme);
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    useEffect(() => {
        console.log("productResponse---",productResponse)
    }, [productResponse]);

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
            field: "accessLevel",
            headerName: "Access Level",
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: ({ row: { access } }) => {
                return (
                    <Box
                        width="60%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={
                            access === "admin"
                                ? colors.greenAccent[600]
                                : access === "manager"
                                    ? colors.greenAccent[700]
                                    : colors.greenAccent[700]
                        }
                        borderRadius="4px"
                    >
                        {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
                        {access === "manager" && <SecurityOutlinedIcon />}
                        {access === "user" && <LockOpenOutlinedIcon />}
                        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                            {access}
                        </Typography>
                    </Box>
                );
            },
        },
    ];


    return (
        <Box m="20px">
            <Header title="TEAM" subtitle="Managing the Team Members" />
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={productStyles}            >
                <DataGrid  rows={productResponse.data || []} columns={columns} />
            </Box>
        </Box>
    );
};

export default Products;