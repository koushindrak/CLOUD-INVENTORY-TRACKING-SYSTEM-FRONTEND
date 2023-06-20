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
import {getUser, getUserSuccess} from "./GetAllUser";
import {getTableStyle} from "../../common-files/CustomTableStyle";
import {getProductById} from "../Products/actions";
import {getProductByIdSuccess} from "../Products/selectors";
import DeleteDialog from "../../containers/DeleteDialog";
import {deleteUserById, deleteUserByIdFailure, deleteUserByIdSuccess} from "./DeleteUser";
import {errorToast, successToast} from "../../containers/react-toast-alert";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import {userColumns} from "./UserColumns";
import { Dialog, DialogTitle, DialogContent, TextField, Select, MenuItem, DialogActions, Paper, Typography } from "@mui/material";
import {inviteUser, inviteUserFailure, inviteUserSuccess, resetInviteUserSates} from "./InviteUser";


const User = () => {
    //hooks & selectors
    const getUserSuccessResponse = useSelector(getUserSuccess);
    const getProductByIdSuccessResponse = useSelector(getProductByIdSuccess)
    const deleteSuccess = useSelector(deleteUserByIdSuccess);
    const deleteFailure = useSelector(deleteUserByIdFailure);

    const [openInviteDialog, setOpenInviteDialog] = useState(false);
    // Form state
    const [inviteFormData, setInviteFormData] = useState({
        email: '',
        role: '',
    });

    const inviteUserSuccessRes = useSelector(inviteUserSuccess);
    const inviteUserFailureRes = useSelector(inviteUserFailure);

    const navigate = useNavigate();
    const dispatch = useDispatch();


    //styles
    const theme = useTheme();
    const userStyles = getTableStyle(theme);
    const colors = tokens(theme.palette.mode);

    //states
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);


    // params from other page
    let {productId} = useParams();

    /* Effects Start */
    useEffect(() => {
        if (inviteUserSuccessRes) {
            // navigate("/users")
            successToast("Email Sent successFully!!!")
            dispatch(resetInviteUserSates());
        }
    }, [inviteUserSuccessRes])

    useEffect(() => {
        if (inviteUserFailureRes) {
            errorToast(inviteUserFailureRes.error)
        }
    }, [inviteUserFailureRes])

    useEffect(() => {
        if (deleteSuccess) {
            successToast(deleteSuccess.displayMessage)
            dispatch(getUser());
        }
    }, [deleteSuccess])

    useEffect(() => {
        if (deleteFailure) {
            errorToast(deleteFailure.error)
        }
    }, [deleteFailure])

    useEffect(() => {
        dispatch(getUser());
    }, [])

    useEffect(() => {
        if (productId && getProductByIdSuccessResponse) {
            setUsers(getProductByIdSuccessResponse.data.users)
        } else if (getUserSuccessResponse) {
            if (location.pathname === '/users/alerts') {
                const filteredData = getUserSuccessResponse.data.filter(obj => obj.stock < obj.threshold);
                setUsers(filteredData)
            } else {
                setUsers(getUserSuccessResponse.data)
            }
        }
    }, [getProductByIdSuccessResponse, getUserSuccessResponse, productId])

    /*Effects Section Ends here */


    /* Button click actions start here */
    const handleEdit = (row) => {
        // Dispatch the edit action with the row data as payload
        console.log("user row--", row)
        if (productId) {
            {/*edit an existing user for a product */
            }
            // <Route path="/products/:productId/users/edit/:userId" element={<UpdateUserPage />} />
            navigate(`/products/${productId}/users/edit/${row.id}`)
        } else {
            {/*update user  */
            }
            //<Route path="/users/edit/:id" element={<UpdateUserPage />} />
            navigate(`/users/edit/${row.id}`);
        }
    };


    const handleDelete = (row) => {
        handleClickOpen(row);
    };

    const handleClickOpen = (user) => {
        setSelectedUser(user);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteUserById(selectedUser.id));
        setOpen(false);
    };

    const handleAdd = () => {
        if (productId) {
            navigate('/products/' + productId + '/users/add')
        } else {
            navigate('/users/add'); // Change this to the correct route
        }
    };

    const handleManagePCB = (row) => {
        /*get all pcbs for a product
         <Route path="/users/:userId/pcbs" element={<Users />} />
        */
        navigate(`/users/${row.id}/pcbs/`)
    };
    /* Button click actions ends here */

    // Function to handle form change
    const handleFormChange = (e) => {
        setInviteFormData({ ...inviteFormData, [e.target.name]: e.target.value });
    };

    // Function to handle form submission
    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Here, you can handle the invite user action (like calling an API endpoint)
        const payload = {
                email: inviteFormData.email,
                role: inviteFormData.role
        };

        console.log(payload);
        dispatch(inviteUser(payload));
    };

    // Function to handle Invite button click
    const handleInviteClick = () => {
        setOpenInviteDialog(true);
    };

    // Function to handle Invite dialog close
    const handleInviteClose = () => {
        setOpenInviteDialog(false);
    };


    const completeColumns = [
        ...userColumns,
        {
            headerName: "Actions",
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: (params) => {
                return (
                    <div>
                        <Tooltip title="Edit User" placement="top">
                            <IconButton color="secondary" onClick={() => handleEdit(params.row)}>
                                <EditOutlinedIcon/>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete User" placement="top">
                            <IconButton color="secondary" onClick={() => handleDelete(params.row)}>
                                <DeleteOutlinedIcon/>
                            </IconButton>
                        </Tooltip>

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
        <Box m="20px">

            <Box position="relative">
                <Button
                    onClick={handleInviteClick}
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
                    Invite User
                </Button>

                <Dialog open={openInviteDialog} onClose={handleInviteClose} fullWidth maxWidth="sm" sx={{ padding: '10px' }}>
                    <DialogTitle>
                        <Typography variant="h4" align="center">Invite User</Typography>
                    </DialogTitle>
                    <form onSubmit={handleFormSubmit}>
                        <DialogContent>
                            <Paper elevation={3} sx={{ padding: '20px', borderRadius: '10px'}}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    name="email"
                                    label="Email"
                                    type="email"
                                    fullWidth
                                    value={inviteFormData.email}
                                    onChange={handleFormChange}
                                    variant="outlined"
                                    size="small"
                                />
                                <Select
                                    name="role"
                                    value={inviteFormData.role}
                                    onChange={handleFormChange}
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    sx={{ marginTop: '10px' }}
                                >
                                    <MenuItem value="EDITOR">EDITOR</MenuItem>
                                    <MenuItem value="VIEWER">VIEWER</MenuItem>
                                </Select>
                            </Paper>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleInviteClose} color="primary" variant="outlined">
                                Cancel
                            </Button>
                            <Button type="submit" color="primary" variant="contained">
                                Send Invitation
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
                <Header
                    subtitleStyle={{color: colors.grey[100]}}
                    subtitle={productId ? `Managing the Users for Product - ${getProductByIdSuccessResponse ? getProductByIdSuccessResponse.data.name : getProductByIdSuccessResponse}` : "Managing the Users"}
                />

                <Box
                    m="40px 0 0 0"
                    height="75vh"
                    sx={userStyles}>
                    <DataGrid
                        rows={users}
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
                entityName={selectedUser?.mfrptn}
            />
        </Box>
    );
};

export default User;
