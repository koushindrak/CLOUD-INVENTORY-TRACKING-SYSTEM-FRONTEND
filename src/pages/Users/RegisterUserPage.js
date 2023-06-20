import {Box, Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import {Formik} from "formik";
import * as yup from "yup";
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Header from "../../containers/Header";
import {useEffect, useState} from "react";
import {errorToast, successToast} from "../../containers/react-toast-alert";
import {getUserById, getUserByIdSuccess, resetGetUserByIdSates} from "./GetUserById";
import {
    resetUpdateUserSates,
    updateUser,
    updateUserFailure,
    updateUserSuccess
} from "./UpdateUser";
import useMediaQuery from "@mui/material/useMediaQuery";
import {getUserByCode, getUserByCodeSuccess} from "./GetUserByCode";
import { Container, Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        textAlign: 'center',
    },
    form: {
        maxWidth: '500px',
        margin: 'auto',
    },
}));

const RegisterUserPage = () => {
    const classes = useStyles();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const {productId, userId} = useParams();
    const dispatch = useDispatch();
    const userSuccess = useSelector(getUserByCodeSuccess);
    const [user, setUser] = useState(null);
    const updateSuccess = useSelector(updateUserSuccess)
    const updateFailure = useSelector(updateUserFailure)
    const {code} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("userSuccess--", userSuccess)
            dispatch(getUserByCode(code));
    }, []);

    useEffect(() => {
        console.log("userSuccess--", userSuccess)
        if (!userSuccess) {
            dispatch(getUserByCode(code));
        } else {
            setUser(userSuccess.data);
        }
    }, [dispatch, userSuccess]);

    useEffect(() => {
        if (updateSuccess) {
            successToast(updateSuccess.displayMessage)
            if (productId) {
                /*get all users for a product
                 <Route path="/products/:productId/users" element={<User />} />
                */
                navigate(`/products/${productId}/users/`)
            } else {
                navigate('/');
            }
            dispatch(resetGetUserByIdSates());
            dispatch(resetUpdateUserSates());
        }
    }, [updateSuccess])

    useEffect(() => {
        if (updateFailure) {
            errorToast(updateFailure.error)
            dispatch(resetUpdateUserSates());

        }
    }, [updateFailure])

    const handleFormSubmit = (values) => {
        console.log("values---",values)
        dispatch(updateUser(values));
    };


    const userSchema = yup.object().shape({
        // id: yup.string().required("Required"),
        // name: yup.string().required("Required"),
        // userCategoryName: yup.string().required("Required"),
        newPassword: yup.string().required("Required"),
        password: yup.string().oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
    });

    return (
        <Container className={classes.root}>
            <Header title="Complete Your Registration"/>
            {user && (
                <Paper className={classes.paper}>
                    <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={{
                            id: user.id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            username: user.username,
                            email: user.email,
                            newPassword: '',
                            password: ''
                        }}
                        validationSchema={userSchema}
                        className={classes.form}
                    >
                        {({
                              values,
                              errors,
                              touched,
                              handleBlur,
                              handleChange,
                              handleSubmit,
                          }) => (
                            <form onSubmit={handleSubmit}>
                                <Grid
                                    container
                                    spacing={3}
                                    // direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <TextField
                                        fullWidth
                                        // variant="filled"
                                        type="text"
                                        label="First Name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.firstName}
                                        name="firstName"
                                        error={!!touched.firstName && !!errors.firstName}
                                        helperText={touched.firstName && errors.firstName}
                                    />
                                    <TextField
                                        fullWidth
                                        // variant="filled"
                                        type="text"
                                        label="Last Name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.lastName}
                                        name="lastName"
                                        error={!!touched.lastName && !!errors.lastName}
                                        helperText={touched.lastName && errors.lastName}
                                    />
                                    <TextField
                                        fullWidth
                                        // variant="filled"
                                        type="text"
                                        label="Username"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.username}
                                        name="username"
                                        error={!!touched.username && !!errors.username}
                                        helperText={touched.username && errors.username}
                                    />
                                    <TextField
                                        fullWidth
                                        // variant="filled"
                                        type="password"
                                        label="New Password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.newPassword}
                                        name="newPassword"
                                        error={!!touched.newPassword && !!errors.newPassword}
                                        helperText={touched.newPassword && errors.newPassword}
                                    />
                                    <TextField
                                        fullWidth
                                        // variant="filled"
                                        type="password"
                                        label="Confirm Password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.password}
                                        name="password"
                                        error={!!touched.password && !!errors.password}
                                        helperText={touched.password && errors.password}
                                    />
                                </Grid>
                                <Box display="flex" justifyContent="center" mt="20px">
                                    <Button type="submit" color="secondary" variant="contained">
                                        Sign up
                                    </Button>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Paper>
            )}
        </Container>
    );

};

export default RegisterUserPage;

