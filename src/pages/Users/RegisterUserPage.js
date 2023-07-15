import {Box, Button, TextField, Container, Grid, Paper, ImageList, ImageListItem} from "@mui/material";
import {Formik} from "formik";
import * as yup from "yup";
import {useEffect, useState} from "react";
import Header from "../../containers/Header";
import {useDispatch, useSelector} from 'react-redux';
import {useMediaQuery} from "@mui/material";
import {useNavigate, useParams} from 'react-router-dom';
import {getUserByCode, getUserByCodeFailure, getUserByCodeSuccess} from "./GetUserByCode";
import {getUserById, getUserByIdSuccess, resetGetUserByIdSates} from "./GetUserById";
import {resetUpdateUserSates, updateUser, updateUserFailure, updateUserSuccess} from "./UpdateUser";
import {errorToast, successToast} from "../../containers/react-toast-alert";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(4), // increased padding
        color: theme.palette.text.secondary,
        textAlign: 'center',
        marginTop: '10px',
        backgroundColor: '#f5f5f5' // background color
    },
    form: {
        maxWidth: '500px',
        margin: 'auto',
    },
    image: {
        display: 'block',
        width: '10%',
        height: '10%',
        margin: '20px auto',
    },
}));
const RegisterUserPage = () => {
    const classes = useStyles();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const {productId, userId} = useParams();
    const dispatch = useDispatch();
    const userSuccess = useSelector(getUserByCodeSuccess);
    const userFailure = useSelector(getUserByCodeFailure);

    const [user, setUser] = useState(null);
    const updateSuccess = useSelector(updateUserSuccess);
    const updateFailure = useSelector(updateUserFailure);
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
            // setUser(userSuccess.data);
            //temp changes
            // console.log(userSuccess.data)


        }

    }, [dispatch, userSuccess]);

    useEffect(()=>{
        if(userFailure){
            setUser({
                "id": 6,
                "firstName": "koushindra",
                "lastName": "kumar",
                "email": "mail.koushindra@gmail.com",
                "password": "$2a$10$VEf.wBbfOOrKDbSu5zhlWOtZ9hJ0dTWgHjaEAHnu7CyzB1TU.V7p.",
                "phoneNumber": null,
                "role": "EDITOR",
                "username": "koushindra1"
            })
        }
    },[userFailure])

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
        <Container className={classes.paper}>
            <Box display="flex" justifyContent="center" mt={2}>
                <Header title="Complete Your Registration"/>
            </Box>
            <img src={'../../assets/ecossystem.jpeg'} className={classes.image} alt='header-img'/>
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
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    height="100%"
                                >
                                    <Grid
                                        container
                                        spacing={3}
                                        direction="column"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <TextField
                                            variant="outlined"
                                            type="text"
                                            label="First Name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.firstName}
                                            name="firstName"
                                            error={!!touched.firstName && !!errors.firstName}
                                            helperText={touched.firstName && errors.firstName}
                                            style={{margin: '40px 8px 8px', width: '40%'}} // increased margin-top
                                        />
                                        <TextField
                                            variant="outlined"
                                            type="text"
                                            label="Last Name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.lastName}
                                            name="lastName"
                                            error={!!touched.lastName && !!errors.lastName}
                                            helperText={touched.lastName && errors.lastName}
                                            style={{margin: 8, width: '40%'}}
                                        />
                                        <TextField
                                            variant="outlined"
                                            type="text"
                                            label="Username"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.username}
                                            name="username"
                                            error={!!touched.username && !!errors.username}
                                            helperText={touched.username && errors.username}
                                            style={{margin: 8, width: '40%'}}
                                        />
                                        <TextField
                                            variant="outlined"
                                            type="password"
                                            label="New Password"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.newPassword}
                                            name="newPassword"
                                            error={!!touched.newPassword && !!errors.newPassword}
                                            helperText={touched.newPassword && errors.newPassword}
                                            style={{margin: 8, width: '40%'}}
                                        />
                                        <TextField
                                            variant="outlined"
                                            type="password"
                                            label="Confirm Password"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.password}
                                            name="password"
                                            error={!!touched.password && !!errors.password}
                                            helperText={touched.password && errors.password}
                                            style={{margin: 8, width: '40%'}}
                                        />
                                    </Grid>
                                    <Box display="flex" justifyContent="center" mt="20px">
                                        <Button type="submit" color="secondary" variant="contained">
                                            Sign up
                                        </Button>
                                    </Box>
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

