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
import {getPcb, getPcbSuccess} from "./GetAllPcb";
import {getPcbStyles} from "./css/PcbStyles";
import {getProductById} from "../Products/actions";
import {getProductByIdSuccess} from "../Products/selectors";
import DeleteDialog from "../../containers/DeleteDialog";
import {deletePcbById, deletePcbByIdFailure, deletePcbByIdSuccess} from "./DeletePcb";
import {errorToast, successToast} from "../../containers/react-toast-alert";
import {getPcbById, resetGetPcbByIdSates} from "./GetPCBById";
import UpdatePcbPage from "./UpdatePcbPage";


const Pcb = () => {
    //hooks & selectors
    const getPcbSuccessResponse = useSelector(getPcbSuccess);
    const getProductByIdSuccessResponse = useSelector(getProductByIdSuccess)
    const deleteSuccess = useSelector(deletePcbByIdSuccess);
    const deleteFailure = useSelector(deletePcbByIdFailure);

    const navigate = useNavigate();
    const dispatch = useDispatch();


    //styles
    const theme = useTheme();
    const pcbStyles = getPcbStyles(theme);
    const colors = tokens(theme.palette.mode);

    //states
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedPcb, setSelectedPcb] = useState(null);
    const [pcbs, setPcbs] = useState([]);


    // params from other page
    let { productId } = useParams();


    /* Effects Start */

    useEffect( () => {
        if(deleteSuccess){
            successToast(deleteSuccess.displayMessage)
            dispatch(getPcb());
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
            dispatch(getPcb());
        }
    }, [dispatch]);

    useEffect( () => {
        if(productId && getProductByIdSuccessResponse){
            setPcbs(getProductByIdSuccessResponse.data.pcbs)
        }else if(getPcbSuccessResponse){
            setPcbs(getPcbSuccessResponse.data)
        }
        dispatch(resetGetPcbByIdSates())
    },[getProductByIdSuccessResponse,getPcbSuccessResponse,productId])

    /*Effects Section Ends here */


    /* Button click actions start here */
    const handleEdit = (row) => {
        // Dispatch the edit action with the row data as payload
        console.log("pcb row--",row)
        if(productId){
            {/*edit an existing pcb for a product */}
           // <Route path="/products/:productId/pcbs/edit/:pcbId" element={<UpdateComponentPage />} />
            navigate(`/products/${productId}/pcbs/edit/${row.id}`)
        }else{
            {/*update pcb  */}
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
        if(productId){
            navigate('/products/'+productId+'/pcbs/add')
        }else {
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
                        backgroundColor: '#4b2eae'

                    }}
                    startIcon={<AddIcon />}>
                    Add Pcb
                </Button>


                <Header
                    subtitleStyle={{ color: colors.grey[100] }}
                    subtitle={productId ? `Managing the Pcbs for Product - ${getProductByIdSuccessResponse ? getProductByIdSuccessResponse.data.name : getProductByIdSuccessResponse }` : "Managing the Pcbs"}
                    />

            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={pcbStyles}            >
                <DataGrid   rows={pcbs} columns={columns} />
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
