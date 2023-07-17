import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MarkunreadRoundedIcon from '@mui/icons-material/MarkunreadRounded';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { createGlobalStyle } from 'styled-components';

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

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // You can add your logic here to send the reset password link to the user's email address

    // Simulating the email sending process with a timeout
    setTimeout(() => {
      setIsEmailSent(true);
    }, 2000);
  };

  return (
    <ThemeProvider theme={theme}>
     <GlobalStyle />   
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div
          style={{
            marginTop: theme.spacing(18),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: theme.spacing(4),
            border: '2px solid #111',
            borderRadius: '30px',
            backgroundColor: '#ffffff',
          }}
        >
          {!isEmailSent ? (
            <MarkunreadRoundedIcon
              style={{
                fontSize: theme.spacing(10),
                marginBottom: theme.spacing(3.5),
                color: theme.palette.secondary.main,
              }}
            />
          ) : (
            <SendRoundedIcon
              style={{
                fontSize: theme.spacing(0),
                marginBottom: theme.spacing(10),
                color: theme.palette.secondary.main,
              }}
            />
          )}<Typography
          component="h2"
          variant="h7"
          align="center"
          sx={{
            backgroundColor: '#111',
            color: '#fff',
            padding: '4px 10px',
            borderRadius: '10px',
            fontSize: '16px',
            marginBottom: '5px',
          }}
        >
          Forgot Password
        </Typography>
          <Typography component="h4" variant="h6" align="center">
            Enter your registered E-mail ID.
          </Typography>
          {!isEmailSent ? (
            <form onSubmit={handleFormSubmit} style={{ marginTop: theme.spacing(0) }}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={handleEmailChange}
                variant="outlined"
                margin="normal"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 1.5 }}
              >
                Send Reset Link
              </Button>
            </form>
          ) : (
            <Typography
              variant="body1"
              align="center"
              style={{ marginTop: theme.spacing(6) }}
            >
              A reset password link has been sent to <strong>{email}</strong>.
            </Typography>
          )}
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default ForgotPassword;
