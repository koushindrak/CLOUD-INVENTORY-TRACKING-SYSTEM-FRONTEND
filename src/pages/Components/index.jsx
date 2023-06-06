import { useState,useEffect } from 'react';
import {Route, useNavigate, useParams} from 'react-router-dom';
import { Box, Typography, useTheme, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useDispatch, useSelector } from 'react-redux';
import Header from "../../containers/Header";
import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddIcon from '@mui/icons-material/Add';
import 'react-toastify/dist/ReactToastify.css';
import {getComponent, getComponentSuccess} from "./GetAllComponent";
import {getComponentStyles} from "./css/ComponentStyles";
import {getProductById} from "../Products/actions";
import {getProductByIdSuccess} from "../Products/selectors";
import DeleteDialog from "../../containers/DeleteDialog";
import {deleteComponentById, deleteComponentByIdFailure, deleteComponentByIdSuccess} from "./DeleteComponent";
import {errorToast, successToast} from "../../containers/react-toast-alert";
import {getComponentById} from "./GetComponentById";
import UpdateComponentPage from "./UpdateComponentPage";


const Component = () => {
    //hooks & selectors
    const getComponentSuccessResponse = useSelector(getComponentSuccess);
    const getProductByIdSuccessResponse = useSelector(getProductByIdSuccess)
    const deleteSuccess = useSelector(deleteComponentByIdSuccess);
    const deleteFailure = useSelector(deleteComponentByIdFailure);

    const navigate = useNavigate();
    const dispatch = useDispatch();


    //styles
    const theme = useTheme();
    const componentStyles = getComponentStyles(theme);
    const colors = tokens(theme.palette.mode);

    //states
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [components, setComponents] = useState([]);


    // params from other page
    let { productId } = useParams();


    /* Effects Start */

    useEffect( () => {
        if(deleteSuccess){
            successToast(deleteSuccess.displayMessage)
            dispatch(getComponent());
        }
    },[deleteSuccess])

    useEffect( () => {
        if(deleteFailure){
            errorToast(deleteFailure.error)
        }
    },[deleteFailure])

    useEffect(() => {
        console.log("productId Params--",productId)
        if(productId){
            console.log("productId--",productId)
            dispatch(getProductById(productId));
        }else{
            console.log("productId2222--",productId)
            dispatch(getComponent());
        }
    }, [dispatch]);

    useEffect( () => {
        if(productId && getProductByIdSuccessResponse){
            setComponents(getProductByIdSuccessResponse.data.components)
        }else if(getComponentSuccessResponse){
            setComponents(getComponentSuccessResponse.data)
        }
    },[getProductByIdSuccessResponse,getComponentSuccessResponse,productId])

    /*Effects Section Ends here */


    /* Button click actions start here */
    const handleEdit = (row) => {
        // Dispatch the edit action with the row data as payload
        console.log("component row--",row)
        if(productId){
            {/*edit an existing component for a product */}
           // <Route path="/products/:productId/components/edit/:componentId" element={<UpdateComponentPage />} />
            navigate(`/products/${productId}/components/edit/${row.id}`)
        }else{
            {/*update component  */}
            //<Route path="/components/edit/:id" element={<UpdateComponentPage />} />
            navigate(`/components/edit/${row.id}`);
        }
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
         dispatch(deleteComponentById(selectedComponent.id));
        setOpen(false);
    };

    const handleAdd = () => {
        if(productId){
            navigate('/products/'+productId+'/components/add')
        }else {
            navigate('/components/add'); // Change this to the correct route
        }
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


                <Header
                    subtitleStyle={{ color: colors.grey[100] }}
                    subtitle={productId ? `Managing the Components for Product - ${getProductByIdSuccessResponse ? getProductByIdSuccessResponse.data.name : getProductByIdSuccessResponse }` : "Managing the Components"}
                    />

            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={componentStyles}>
                <DataGrid   rows={components} columns={columns} />
            </Box>
            </Box>
            <DeleteDialog
                open={open}
                handleClose={handleClose}
                handleConfirmDelete={handleConfirmDelete}
                entityName={selectedComponent?.mfrptn}
            />
        </Box>
    );
};

export default Component;
