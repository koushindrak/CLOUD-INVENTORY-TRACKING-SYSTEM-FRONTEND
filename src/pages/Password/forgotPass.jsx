import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MarkunreadRoundedIcon from '@mui/icons-material/MarkunreadRounded';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

const theme = createTheme({
  palette: {
    primary: {
      main: '#32ba91', // Adjust primary color as needed
    },
    secondary: {
      main: '#000000', // Adjust secondary color as needed
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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div
          style={{
            marginTop: theme.spacing(15),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: theme.spacing(4),
            border: '6px solid #ddd',
            borderRadius: '20px',
            backgroundColor: '#f5f5f5',
          }}
        >
          {!isEmailSent ? (
            <MarkunreadRoundedIcon
              style={{
                fontSize: theme.spacing(10),
                marginBottom: theme.spacing(5),
                color: theme.palette.secondary.main,
              }}
            />
          ) : (
            <SendRoundedIcon
              style={{
                fontSize: theme.spacing(10),
                marginBottom: theme.spacing(2),
                color: theme.palette.secondary.main,
              }}
            />
          )}
          <Typography component="h1" variant="h4" align="center">
            Forgot Password
          </Typography>
          {/* <Typography component="h5" variant="h5" align="left">
            Enter you Email-ID
          </Typography> */}
          {!isEmailSent ? (
            <form onSubmit={handleFormSubmit} style={{ marginTop: theme.spacing(4) }}>
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
                sx={{ mt: 4 }}
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
