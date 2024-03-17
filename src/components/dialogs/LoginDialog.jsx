import React, { useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  CssBaseline,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginForm from '../forms/LoginForm';
import SignupForm from '../forms/SignupForm';
import { useFormContext, useMode } from '../../context';
import useAuthDialog from '../../context/hooks/useAuthDialog'; // Adjust import paths as necessary
import MDBox from '../../layout/REUSABLE_COMPONENTS/MDBOX';
import MDTypography from '../../layout/REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
import {
  DialogPaper,
  StyledDialog,
  StyledDialogContent,
} from '../../layout/REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';
import MDAvatar from '../../layout/REUSABLE_COMPONENTS/MDAVATAR';
import RCSwitch from '../forms/reusable/RCSwitch';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
function LoginDialog() {
  const { theme, toggleColorMode, mode } = useMode();
  const { toggleLoginDialog, isLoggedIn, logout } = useAuthDialog();
  // const { currentForm, setFormSchema } = useFormContext();
  const { formMethods, onSubmit, setFormSchema, currentSchemaKey } =
    useFormContext();

  // EFFECT: If the user is not logged in, open the login dialog
  useEffect(() => {
    if (!isLoggedIn) {
      toggleLoginDialog();
    }
  }, [isLoggedIn, toggleLoginDialog]);
  // EFFECT: Set the current form to 'loginForm' when the component mounts
  useEffect(() => {
    setFormSchema('loginForm');
  }, [setFormSchema]);
  // HANDLE: Logout the user and close the login dialog
  const handleLogout = () => {
    logout();
    toggleLoginDialog();
  };
  const handleToggle = () => {
    setFormSchema(
      currentSchemaKey === 'loginForm' ? 'signupForm' : 'loginForm'
    );
  };
  const formTitle = currentSchemaKey === 'loginForm' ? 'Login' : 'Sign Up';

  const signupMode = currentSchemaKey === 'signupForm';
  const formLabel = () => {
    <MDTypography variant="h6" color="primary">
      {currentSchemaKey === 'loginForm' ? 'Sign Up' : 'Login'}
    </MDTypography>;
  };
  return (
    <StyledDialog
      className="dialog-login"
      open={!isLoggedIn}
      onClose={toggleLoginDialog}
      tbeme={theme}
      aria-labelledby="responsive-dialog-title"
      maxWidth="xl"
    >
      <CssBaseline />
      <DialogPaper theme={theme}>
        <DialogTitle
          id="responsive-dialog-title"
          sx={{
            margin: '0 2rem', // Match the DialogContent's padding but use margin for the title
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 'auto', // Let it naturally fill the space, considering the margins
            boxSizing: 'border-box', // Include padding and borders in the element's total width and height
            color: theme.palette.text.primary,
          }}
        >
          <MDBox sx={{ visibility: 'hidden' }}>
            <MDAvatar sx={{ m: 1 }}>
              <LockOutlinedIcon />
            </MDAvatar>
          </MDBox>
          <MDBox
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center', // Centers the login icon and title
              border: 'none',
            }}
          >
            <MDAvatar
              sx={{
                m: 1,
                bgcolor: theme.palette.backgroundG.light,
              }}
            >
              <LockOutlinedIcon />
            </MDAvatar>
            <MDTypography component="h1" variant="h4">
              {formTitle}
            </MDTypography>
          </MDBox>
          {/* <AuthSwitch signupMode={currentSchemaKey !== 'loginForm'} /> */}
          <RCSwitch
            signupMode={signupMode}
            checked={currentSchemaKey === 'signupForm'}
            onChange={handleToggle}
            labelLeft="Login"
            labelRight="Sign Up"
            iconLeft={<LoginIcon />}
            iconRight={<PersonAddIcon />}
          />
        </DialogTitle>
      </DialogPaper>

      <Divider />
      <StyledDialogContent theme={theme} elevation={20}>
        {currentSchemaKey === 'loginForm' ? (
          <LoginForm signupMode={signupMode} formLabel={formLabel} />
        ) : (
          <SignupForm signupMode={signupMode} formLabel={formLabel} />
        )}
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        {isLoggedIn && (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogout}
          >
            Log Out
          </Button>
        )}
        <Box mt={5}>
          <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            ReedThaHuman LLC {new Date().getFullYear()}
          </Typography>
        </Box>
      </StyledDialogContent>
    </StyledDialog>
  );
}

export default LoginDialog;
