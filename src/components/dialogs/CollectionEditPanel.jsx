import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Button, TextField, Paper, Typography } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    borderRadius: '12px',
    backgroundColor: theme.palette.grey[100],
    boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
  },
  header: {
    paddingBottom: theme.spacing(2),
    borderBottom: `2px solid ${theme.palette.secondary.main}`,
  },
  textField: {
    marginTop: theme.spacing(3),
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: theme.palette.secondary.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.secondary.dark,
      },
    },
  },
  saveButton: {
    marginTop: theme.spacing(3),
    borderRadius: '24px',
    textTransform: 'none',
    fontSize: 18,
    padding: theme.spacing(1, 4),
    border: `2px solid ${theme.palette.secondary.main}`,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
      borderColor: theme.palette.secondary.dark,
    },
  },
}));

const CollectionEditPanel = ({ selectedCollection, onSave }) => {
  const classes = useStyles();
  const [name, setName] = useState(selectedCollection?.name || '');
  const [description, setDescription] = useState(
    selectedCollection?.description || ''
  );

  const handleSave = () => {
    onSave({
      ...selectedCollection,
      name,
      description,
    });
  };

  // // Inside CollectionEditPanel
  // const handleFinishEditing = () => {
  //   onSave(editedCollection);
  // };

  return (
    <Paper elevation={6} className={classes.root}>
      <Typography variant="h5" className={classes.header}>
        Edit Collection
      </Typography>
      <TextField
        className={classes.textField}
        label="Collection Name"
        value={name}
        variant="outlined"
        fullWidth
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        className={classes.textField}
        label="Collection Description"
        value={description}
        variant="outlined"
        fullWidth
        multiline
        rows={5}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button
        variant="contained"
        className={classes.saveButton}
        onClick={handleSave}
      >
        Save Changes
      </Button>
    </Paper>
  );
};

export default CollectionEditPanel;
