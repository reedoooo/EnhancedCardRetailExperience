/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, CssBaseline, DialogTitle, Divider } from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  DialogPaper,
  StyledDialog,
  StyledDialogContent,
} from 'layout/REUSABLE_STYLED_COMPONENTS';

import { useInitialFormData, useMode } from 'context';
import { formFields } from 'data';
import { MDBox, RCDynamicForm, RCTypography } from 'layout/REUSABLE_COMPONENTS';

const CollectionDialog = ({
  open = false,
  onClose = () => {},
  isNew = true,
  collectionData = {},
}) => {
  const { theme } = useMode();
  const formKey = isNew ? 'addCollectionForm' : 'updateCollectionForm';
  const initialFormData = useInitialFormData(
    isNew,
    formFields[formKey],
    collectionData
  );

  return (
    <StyledDialog
      className="dialog-login"
      open={open}
      onClose={onClose}
      theme={theme}
      aria-labelledby="responsive-dialog-title"
      maxWidth="xl"
    >
      <CssBaseline />
      <DialogPaper theme={theme}>
        <DialogTitle
          id="responsive-dialog-title"
          sx={{
            margin: '0 2rem',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'center',
            width: 'auto',
            boxSizing: 'border-box',
            color: theme.palette.text.primary,
          }}
        >
          <MDBox
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: theme.palette.grey.lighter }}>
              <LockOutlinedIcon />
            </Avatar>
            <RCTypography component="h1" variant="h4">
              {isNew ? 'Add a Collection' : 'Update a Collection'}
            </RCTypography>
          </MDBox>
        </DialogTitle>
      </DialogPaper>
      <Divider />

      <StyledDialogContent theme={theme} elevation={20}>
        <RCDynamicForm
          formKey={formKey}
          inputs={formFields[formKey]}
          initialData={initialFormData}
          userInterfaceOptions={{
            submitButton: true,
            submitButtonLabel: 'Add Collection',
            deleteButton: false,
            startIcon: <LockOutlinedIcon />,
          }}
        />
      </StyledDialogContent>
    </StyledDialog>
  );
};

CollectionDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isNew: PropTypes.bool,
  collectionData: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default CollectionDialog;
