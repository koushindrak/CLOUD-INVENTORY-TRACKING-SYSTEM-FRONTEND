import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useDispatch, useSelector } from 'react-redux';
import { login, loginFailure, loginSuccess } from './Login';
import { errorToast } from '../../containers/react-toast-alert';
import { useNavigate } from 'react-router-dom';
import ecosystemImage from './ecossystem.jpeg';
import { createGlobalStyle } from 'styled-components';
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    remember: {
        '& .MuiSvgIcon-root': {
            width: '1.2em', // Adjust the size of the checkbox icon
            height: '1.2em',
        },
        '& .MuiFormControlLabel-label': {
            fontSize: '14px', // Adjust the label font size
            color: '#000', // Use black color for the label
        },
    },
}));
function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [signInSuccess, setSignInSuccess] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [signInError, setSignInError] = useState(false);
  const loginSuccessRes = useSelector(loginSuccess);
  const loginFailureRes = useSelector(loginFailure);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    if (loginFailureRes) {
      errorToast(loginFailureRes.error);
    } else if (loginSuccessRes) {
      console.log(loginSuccessRes);
      localStorage.token = loginSuccessRes.token;
      navigate('/products');
    }
  }, [loginFailureRes, loginSuccessRes]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('email');
    const password = data.get('password');

    if (username && password) {
      const payload = { username, password };
      //disptaching login action
      dispatch(login(payload));
    } else {
      setEmailError(!username);
      setPasswordError(!password);
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

    const GlobalStyle = createGlobalStyle`
      body {
        margin: 0;
        padding: 0;
        background: rgba(245, 241, 241, 0.98);
        font-family: Arial, sans-serif;
        color: #f5f5f5;
      }
    `

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

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
        <Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh' }}>
            <CssBaseline />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "30px",
                    border: "2px solid #111",
                    borderRadius: "30px",
                    backgroundColor: "#ffffff",
                }}
            >
          <Box
            sx={{
              marginBottom: "10px",
              width: "100px",
              height: "100px",
              overflow: "hidden",
              border: "2px solid black",
              padding: "8px",
            }}
          >
            <a href="/">
              <img
                alt="ecosystem"
                width="100%"
                height="100%"
                src={ecosystemImage}
                style={{ cursor: "pointer" }}
              />
            </a>
          </Box>

          <Typography
            component="h2"
            variant="h7"
            align="center"
            sx={{
              backgroundColor: "#111",
              color: "#fff",
              padding: "4px 10px",
              borderRadius: "10px",
              fontSize: "16px",
              marginBottom: "5px",
              marginTop: "9px",
            }}
          >
            Welcome, Please Login!
          </Typography>
          {signInError && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Invalid username or password
            </Alert>
          )}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1.5 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={emailError}
              onChange={() => setEmailError(false)}
              helperText={emailError ? "Please enter your email address" : ""}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              error={passwordError}
              onChange={() => setPasswordError(false)}
              helperText={passwordError ? "Please enter your password" : ""}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
              <FormControlLabel
                  className={classes.remember}
                  control={<Checkbox color="primary" />} // Use color="primary" for the default MUI primary color
                  label="Remember me"
              />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 1 }}>
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Grid container justifyContent="center" sx={{ mt: 1 }}>
                  <Grid item xs={12} align="center">
                    {" "}
                    {/* Container for the link */}
                    <Link href="/forgot-pass" variant="body1">
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
