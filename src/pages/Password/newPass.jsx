import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [resetError, setResetError] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
    setPasswordError(false);
    setResetError(false);
    setResetSuccess(false);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setPasswordError(false);
    setResetError(false);
    setResetSuccess(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setPasswordError(true);
      setResetError(true);
      return;
    }

    // Simulating reset password request
    // Replace this code with your actual reset password logic
    setTimeout(() => {
      setResetSuccess(true);
    }, 2000);
  };

  return (
    <Container component="main" maxWidth="xs">
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
        <Typography component="h1" variant="h4" align="center">
          Password Reset
        </Typography>
        {resetError && (
          <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
            <AlertTitle>Error</AlertTitle>
            The passwords entered do not match. Please try again.
          </Alert>
        )}
        {resetSuccess ? (
          <Alert severity="success" sx={{ mt: 2, mb: 2 }}>
            <AlertTitle>Success</AlertTitle>
            Your password has been successfully reset.
          </Alert>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="New Password"
              type="password"
              id="newPassword"
              autoComplete="new-password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              error={passwordError}
              helperText={passwordError ? "Passwords don't match" : ''}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              error={passwordError}
              helperText={passwordError ? "Passwords don't match" : ''}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setShowConfirmPassword((prevShow) => !prevShow)} edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: 'seagreen', color: 'white' }}
            >
              Reset Password
            </Button>
          </form>
        )}
      </Box>
    </Container>
  );
}

export default ResetPassword;
