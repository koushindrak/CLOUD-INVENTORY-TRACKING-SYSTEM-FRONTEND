import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserByCode, getUserByCodeFailure, getUserByCodeSuccess } from './GetUserByCode';
import { getUserById, getUserByIdSuccess, resetGetUserByIdSates } from './GetUserById';
import { resetUpdateUserSates, updateUser, updateUserFailure, updateUserSuccess } from './UpdateUser';
import { errorToast, successToast } from '../../containers/react-toast-alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createGlobalStyle } from 'styled-components';
import ecosystemImage from '../Login/ecossystem.jpeg';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    color: theme.palette.text.secondary,
    textAlign: 'center',
    marginTop: '20px',
    backgroundColor: '#ffffff',
    width: '25%',
    border: '2px solid black',
    borderRadius: '30px',
  },
  form: {
    maxWidth: '20px',
    margin: 10,
  },
  image: {
    display: 'block',
    width: '80%',
    height: '80%',
    margin: '6px auto',
    border: '4px solid seagreen',
  },
}));

const RegisterUserPage = () => {
  const classes = useStyles();
  const { productId } = useParams();
  const dispatch = useDispatch();
  const userSuccess = useSelector(getUserByCodeSuccess);
  const userFailure = useSelector(getUserByCodeFailure);
  const updateSuccess = useSelector(updateUserSuccess);
  const updateFailure = useSelector(updateUserFailure);
  const [user, setUser] = useState(null);
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserByCode(code));
  }, [dispatch, code]);

  useEffect(() => {
    if (!userSuccess) {
      dispatch(getUserByCode(code));
    } else {
      // setUser(userSuccess.data);
      //temp changes
      // console.log(userSuccess.data)
    }
  }, [dispatch, userSuccess]);

  useEffect(() => {
    if (userFailure) {
      setUser({
        id: 6,
        firstName: 'koushindra',
        lastName: 'kumar',
        email: 'mail.koushindra@gmail.com',
        password: '$2a$10$VEf.wBbfOOrKDbSu5zhlWOtZ9hJ0dTWgHjaEAHnu7CyzB1TU.V7p.',
        phoneNumber: null,
        role: 'EDITOR',
        username: 'koushindra1',
      });
    }
  }, [userFailure]);

  useEffect(() => {
    if (updateSuccess) {
      successToast(updateSuccess.displayMessage);
      if (productId) {
        navigate(`/products/${productId}/users/`);
      } else {
        navigate('/');
      }
      dispatch(resetGetUserByIdStates());
      dispatch(resetUpdateUserSates());
    }
  }, [updateSuccess, dispatch, navigate, productId]);

  useEffect(() => {
    if (updateFailure) {
      errorToast(updateFailure.error);
      dispatch(resetUpdateUserSates());
    }
  }, [updateFailure, dispatch]);

  const handleFormSubmit = (values) => {
    dispatch(updateUser(values));
  };

  const GlobalStyle = createGlobalStyle`
    body {
      margin: 0;
      padding: 0;
      background: linear-gradient(to right, #8BC839, #F8B376, #34BEB7);
    }
  `;

  const theme = createTheme({
    palette: {
      primary: {
        main: '#005EFF', // Adjust primary color as needed
      },
      secondary: {
        main: '#111111', // Adjust secondary color as needed
      },
    },
  });

  const userSchema = yup.object().shape({
    newPassword: yup
      .string()
      .required('Required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and be 8 characters long'
      ),
    password: yup
      .string()
      .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
  });

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container maxWidth="sm" className={classes.paper}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box mb={0.8}>
            <img src={ecosystemImage} className={classes.image} alt="header-img" />
          </Box>
          <Typography
            component="h2"
            variant="h7"
            align="center"
            sx={{
              backgroundColor: '#111',
              color: '#fff',
              padding: '4px 10px',
              borderRadius: '10px',
              fontSize: '29px',
              marginBottom: '4px',
              marginTop: '8px',
            }}
          >
            Complete Your Registration
          </Typography>
        </Box>
        {user && (
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={{
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              username: user.username,
              email: user.email,
              newPassword: '',
              password: '',
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
                    spacing={1}
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
                      style={{ margin: '40px 8px 8px', width: '60%' }}
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
                      style={{ margin: 8, width: '60%' }}
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
                      style={{ margin: 8, width: '60%' }}
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
                      style={{ margin: 8, width: '60%' }}
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
                      style={{ margin: 8, width: '60%' }}
                    />
                  </Grid>
                  <Box display="flex" justifyContent="center">
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 1.5, mb: 0.3 }}
                    >
                      Sign Up
                    </Button>
                  </Box>
                </Box>
              </form>
            )}
          </Formik>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default RegisterUserPage;
