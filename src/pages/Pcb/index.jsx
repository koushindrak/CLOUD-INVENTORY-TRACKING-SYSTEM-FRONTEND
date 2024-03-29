import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Box, Button, useTheme} from "@mui/material";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {tokens} from "../../theme";
import {useDispatch, useSelector} from 'react-redux';
import Header from "../../containers/Header";
import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddIcon from '@mui/icons-material/Add';
import 'react-toastify/dist/ReactToastify.css';
import {getPcb, getPcbSuccess} from "./GetAllPcb";
import {getTableStyle} from "../../common-files/CustomTableStyle";
import {getProductById} from "../Products/actions";
import {getProductByIdSuccess} from "../Products/selectors";
import DeleteDialog from "../../containers/DeleteDialog";
import {deletePcbById, deletePcbByIdFailure, deletePcbByIdSuccess, resetDeletePcbByIdSates} from "./DeletePcb";
import {errorToast, successToast} from "../../containers/react-toast-alert";
import {resetGetPcbByIdSates} from "./GetPCBById";
import {getComponentById, getComponentByIdSuccess} from "../Components/GetComponentById";
import * as COMMON_UTILS from '../../common-files/commonUtils';


const Pcb = () => {
    //hooks & selectors
    const getPcbSuccessResponse = useSelector(getPcbSuccess);
    const getProductByIdSuccessResponse = useSelector(getProductByIdSuccess)
    const getComponentByIdSuccessResponse = useSelector(getComponentByIdSuccess)

    const deleteSuccess = useSelector(deletePcbByIdSuccess);
    const deleteFailure = useSelector(deletePcbByIdFailure);

    const navigate = useNavigate();
    const dispatch = useDispatch();


    //styles
    const theme = useTheme();
    const pcbStyles = getTableStyle(theme);
    const colors = tokens(theme.palette.mode);

    //states
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedPcb, setSelectedPcb] = useState(null);
    const [pcbs, setPcbs] = useState([]);


    // params from other page
    let {productId} = useParams();
    let {componentId} = useParams();

    /* Effects Start */

    useEffect(() => {
        if (deleteSuccess) {
            successToast(deleteSuccess.displayMessage)
            dispatch(getPcb());
        }
        dispatch(resetDeletePcbByIdSates())
    }, [deleteSuccess])

    useEffect(() => {
        if (deleteFailure) {
            errorToast(deleteFailure.error)
        }
    }, [deleteFailure])

    useEffect(() => {
        console.log("productId Params--", productId)
        if (productId) {
            console.log("productId--", productId)
            dispatch(getProductById(productId));
        } else if (componentId) {
            console.log("fetch pcbs for componentId--", componentId);
            dispatch(getComponentById(componentId))
        } else {
            console.log("productId2222--", productId)
            dispatch(getPcb());
        }
    }, [deleteSuccess, dispatch]);

    useEffect(() => {
        if (productId && getProductByIdSuccessResponse) {
            setPcbs(getProductByIdSuccessResponse.data.pcbs)
        } else if (componentId && getComponentByIdSuccessResponse) {
            setPcbs(getComponentByIdSuccessResponse.data.pcbs)
        } else if (getPcbSuccessResponse) {
            setPcbs(getPcbSuccessResponse.data)
        }
        dispatch(resetGetPcbByIdSates())
    }, [getProductByIdSuccessResponse, getComponentByIdSuccessResponse, getPcbSuccessResponse, productId, componentId])

    /*Effects Section Ends here */


    /* Button click actions start here */
    const handleEdit = (row) => {
        // Dispatch the edit action with the row data as payload
        console.log("pcb row--", row)
        if (productId) {
            {/*edit an existing pcb for a product */
            }
            // <Route path="/products/:productId/pcbs/edit/:pcbId" element={<UpdateComponentPage />} />
            navigate(`/products/${productId}/pcbs/edit/${row.id}`)
        } else {
            {/*update pcb  */
            }
            //<Route path="/pcbs/edit/:id" element={<UpdateComponentPage />} />
            navigate(`/pcbs/edit/${row.id}`);
        }
    };


    const handleDelete = (row) => {
        handleClickOpen(row);
    };

    const handleClickOpen = (pcb) => {
        setSelectedPcb(pcb);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmDelete = () => {
        dispatch(deletePcbById(selectedPcb.id));
        setOpen(false);
    };

    const handleAdd = () => {
        if (productId) {
            navigate('/products/' + productId + '/pcbs/add')
        } else if (componentId) {
            navigate('/components/' + componentId + '/pcbs/add')
        } else {
            navigate('/pcbs/add'); // Change this to the correct route
        }
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
            field: "pcbCategoryName",
            headerName: "Category",
            flex: 1,
            headerAlign: "center",
            align: "center",
        }
    ];

    if (['ADMIN', 'EDITOR'].includes(COMMON_UTILS.getRole())) {
        columns.push({
            headerName: "Actions",
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: (params) => {
                return (
                    <div>
                        <IconButton color="secondary" onClick={() => handleEdit(params.row)}>
                            <EditOutlinedIcon/>
                        </IconButton>
                        <IconButton color="secondary" onClick={() => handleDelete(params.row)}>
                            <DeleteOutlinedIcon/>
                        </IconButton>
                    </div>
                );
            },
        });
    }
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
                        backgroundColor: '#4b2eae'

                    }}
                    startIcon={<AddIcon/>}>
                    Add Pcb
                </Button>
                )}

                <Header
                    subtitleStyle={{color: colors.grey[100]}}
                    subtitle={productId ? `Managing the Pcbs for Product - ${getProductByIdSuccessResponse ? getProductByIdSuccessResponse.data.name : getProductByIdSuccessResponse}` : "Managing the Pcbs"}
                />

                <Box
                    m="40px 0 0 0"
                    height="75vh"
                    sx={pcbStyles}>
                    <DataGrid
                        pageSize={10}
                        pagination
                        components={{
                            Toolbar: GridToolbar
                        }}
                        rows={pcbs}
                        columns={columns}/>
                </Box>
            </Box>
            <DeleteDialog
                open={open}
                handleClose={handleClose}
                handleConfirmDelete={handleConfirmDelete}
                entityName={selectedPcb?.name}
            />
        </Box>
    );
};

export default Pcb;
