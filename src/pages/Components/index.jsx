import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Box, Button, Tooltip, useTheme} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {tokens} from "../../theme";
import {useDispatch, useSelector} from 'react-redux';
import Header from "../../containers/Header";
import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddIcon from '@mui/icons-material/Add';
import 'react-toastify/dist/ReactToastify.css';
import {getComponent, getComponentSuccess} from "./GetAllComponent";
import {getTableStyle} from "../../common-files/CustomTableStyle";
import {getProductById} from "../Products/actions";
import {getProductByIdSuccess} from "../Products/selectors";
import DeleteDialog from "../../containers/DeleteDialog";
import {deleteComponentById, deleteComponentByIdFailure, deleteComponentByIdSuccess} from "./DeleteComponent";
import {errorToast, successToast} from "../../containers/react-toast-alert";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import {componentColumns} from "./ComponentColumns";
import * as COMMON_UTILS from '../../common-files/commonUtils';
import {createComponentFailure, createComponentSuccess} from "./CreateComponent";


const Component = () => {
    //hooks & selectors
    const getComponentSuccessResponse = useSelector(getComponentSuccess);
    const getProductByIdSuccessResponse = useSelector(getProductByIdSuccess)
    const deleteSuccess = useSelector(deleteComponentByIdSuccess);
    const deleteFailure = useSelector(deleteComponentByIdFailure);
    const addComponentSuccess = useSelector(createComponentSuccess)
    const addComponentFailure = useSelector(createComponentFailure)

    const navigate = useNavigate();
    const dispatch = useDispatch();


    //styles
    const theme = useTheme();
    const componentStyles = getTableStyle(theme);
    const colors = tokens(theme.palette.mode);

    //states
    const [open, setOpen] = useState(false);
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [components, setComponents] = useState([]);


    // params from other page
    let {productId} = useParams();

    /* Effects Start */

    useEffect(() => {
        if (deleteSuccess) {
            successToast(deleteSuccess.displayMessage)
            dispatch(getComponent());
        }
    }, [deleteSuccess])

    useEffect(() => {
        if (deleteFailure) {
            errorToast(deleteFailure.error)
        }
    }, [deleteFailure])

    useEffect(()=>{
        if(addComponentSuccess){
            successToast("Component added Successfully")
            dispatch(getComponent());
        }
    },[addComponentSuccess])

    useEffect(()=>{
        if(addComponentFailure){
            errorToast(addComponentFailure.error)
        }
    },[addComponentFailure])

    useEffect(() => {
        console.log("productId Params--", productId)
        if (productId) {
            console.log("productId--", productId)
            dispatch(getProductById(productId));
        } else {
            console.log("productId2222--", productId)
            dispatch(getComponent());
        }
    }, [dispatch]);

    useEffect(() => {
        if (productId && getProductByIdSuccessResponse) {
            setComponents(getProductByIdSuccessResponse.data.components)
        } else if (getComponentSuccessResponse) {
            if (location.pathname === '/components/alerts') {
                const filteredData = getComponentSuccessResponse.data.filter(obj => obj.stock < obj.threshold);
                setComponents(filteredData)
            } else {
                setComponents(getComponentSuccessResponse.data)
            }
        }
    }, [getProductByIdSuccessResponse, getComponentSuccessResponse, productId])

    /*Effects Section Ends here */


    /* Button click actions start here */
    const handleEdit = (row) => {
        // Dispatch the edit action with the row data as payload
        console.log("component row--", row)
        if (productId) {
            {/*edit an existing component for a product */
            }
            // <Route path="/products/:productId/components/edit/:componentId" element={<UpdateComponentPage />} />
            navigate(`/products/${productId}/components/edit/${row.id}`)
        } else {
            {/*update component  */
            }
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
        if (productId) {
            navigate('/products/' + productId + '/components/add')
        } else {
            navigate('/components/add'); // Change this to the correct route
        }
    };

    const handleManagePCB = (row) => {
        /*get all pcbs for a product
         <Route path="/components/:componentId/pcbs" element={<Components />} />
        */
        navigate(`/components/${row.id}/pcbs/`)
    };
    /* Button click actions ends here */


    const completeColumns = [
        ...componentColumns(dispatch, navigate),
        {
            headerName: "Actions",
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: (params) => {
                return (
                    <div>
                        {(['ADMIN', 'EDITOR'].includes(COMMON_UTILS.getRole())) && (
                            <>
                        <Tooltip title="Edit Component" placement="top">
                            <IconButton color="secondary" onClick={() => handleEdit(params.row)}>
                                <EditOutlinedIcon/>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete Component" placement="top">
                            <IconButton color="secondary" onClick={() => handleDelete(params.row)}>
                                <DeleteOutlinedIcon/>
                            </IconButton>
                        </Tooltip>
                            </>
                        )}
                        <Tooltip title="Manage PCB's" placement="top">
                            <IconButton color="secondary" onClick={() => handleManagePCB(params.row)}>
                                <DeveloperBoardIcon/>
                            </IconButton>
                        </Tooltip>
                    </div>
                );
            },
        },
    ];

    function Header({title, subtitle, subtitleStyle}) {
        return (
            <header>
                <h1>{title}</h1>
                <h2 style={subtitleStyle}>{subtitle}</h2>
            </header>
        );
    }


    return (
        <Box marginLeft="275px" marginRight="10px" marginBottom="10px">

            <Box position="relative">
                {(['ADMIN', 'EDITOR'].includes(COMMON_UTILS.getRole())) && (
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
                    startIcon={<AddIcon/>}>
                    Add Component
                </Button>
                )}

                <Header
                    subtitleStyle={{color: colors.grey[100]}}
                    subtitle={productId ? `Managing the Components for Product - ${getProductByIdSuccessResponse ? getProductByIdSuccessResponse.data.name : getProductByIdSuccessResponse}` : "Managing the Components"}
                />

                <Box
                    m="40px 0 0 0"
                    height="75vh"
                    sx={componentStyles}>
                    <DataGrid
                        rows={components}
                        columns={completeColumns}
                        getRowClassName={(params) =>
                            params.getValue(params.id, "threshold") > params.getValue(params.id, "stock")
                                ? "red-row"
                                : ""
                        }
                    />
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
