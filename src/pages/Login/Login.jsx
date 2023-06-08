import React, { useState } from 'react';
import logo from './ecossystem.jpeg'
import Avatar from '@mui/material/Avatar';
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
import { green } from '@mui/material/colors';

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [signInSuccess, setSignInSuccess] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [signInError, setSignInError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    if (email && password) {
      // if (email === 'myemail@example.com' && password === 'mypassword') {
      //   setSignInSuccess(true);
      // } else {
      //   setSignInError(true);
      // }
      setSignInSuccess(true); 
      setEmailError(false);
      setPasswordError(false);
    } else {
      setEmailError(!email);
      setPasswordError(!password);
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#00695c', // Adjust primary color as needed
      },
      secondary: {
        main: '#f44336', // Adjust secondary color as needed
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            overflow: 'hidden',
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Avatar sx={{ width: '100%', height: '100%' }}>
            <img
              src="file:///C:src/pages/Login/ecossystem.jpeg" 
              alt="Company Logo"
              style={{ width: '100%', height: '800%', objectFit: 'cover' }}
            />
          </Avatar>
        </Box>
        <Box
          sx={{
            marginTop: 14,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '30px',
            border: '6px solid #ddd',
            borderRadius: '20px',
            backgroundColor: '#f5f5f5',
          }}
        >
          <PersonIcon sx={{ m: 0.5, fontSize: '5.5rem', bgcolor: '#f5f5f5' }}>
            <LockOutlinedIcon />
          </PersonIcon>
          <Typography component="h1" variant="h4" align="center">
            Sign in
          </Typography>
          {signInError && (
            <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
              <AlertTitle>Error</AlertTitle>
              Couldn't sign in. Please check your email and password.
            </Alert>
          )}
          {signInSuccess && (
            <Alert severity="success" sx={{ mt: 2, mb: 2 }}>
              <AlertTitle>Sign In Successful</AlertTitle>
              You have successfully signed in.
            </Alert>
          )}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
              helperText={emailError ? 'Email is required' : ''}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              error={passwordError}
              helperText={passwordError ? 'Password is required' : ''}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: 'seagreen', color: 'white' }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link align="center" href="/forgot-pass" variant="body2" color="text.secondary">
                  Forgot your password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 8, mb: 4 }}>
          {'Copyright © '}
          <Link color="inherit" href="http://localhost:3000/">
            Eco System Informatics Inc
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
