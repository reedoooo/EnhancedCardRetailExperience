import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import { useCookies } from 'react-cookie';
import { useCollectionStore } from '../../context/CollectionContext/CollectionContext';

const CreateOrEditCollectionDialog = ({
  isDialogOpen,
  closeDialog,
  onSave,
  isNew,
  // userId,
  editedName,
  setEditedName,
  editedDescription,
  setEditedDescription,
}) => {
  const {
    createUserCollection,
    addOneToCollection,
    removeCollection,
    selectedCollection,
    updateCollectionDetails,
  } = useCollectionStore();
  const [cookies] = useCookies(['user']);
  const userId = cookies.user?.id;

  const handleSave = () => {
    const newCollectionInfo = {
      name: editedName,
      description: editedDescription,
      userId: userId,
      tag: 'new',
    };

    if (isNew) {
      createUserCollection(
        userId,
        newCollectionInfo,
        editedName,
        editedDescription,
        userId
      );
    } else if (editedName && editedDescription) {
      // addOneToCollection(newCollectionInfo);
      updateCollectionDetails(
        newCollectionInfo,
        userId,
        selectedCollection._id
      );
    } else {
      console.error('No card to add to the collection');
    }

    onSave(newCollectionInfo);
    closeDialog();
  };

  const handleRemove = (e) => {
    e.preventDefault();

    removeCollection(selectedCollection);
    closeDialog();
  };

  return (
    <Dialog open={isDialogOpen} onClose={closeDialog}>
      <DialogContent>
        <Typography variant="h6">
          {isNew
            ? 'Fill in the data below to create a new collection'
            : 'Edit your collection'}
        </Typography>
        <div>
          <TextField
            label="Collection Name"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </div>
        <div>
          <TextField
            label="Collection Description"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            margin="normal"
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '16px',
          }}
        >
          <Button variant="contained" onClick={handleSave} color="primary">
            {isNew ? 'Create Collection' : 'Save Changes'}
          </Button>
          {!isNew && (
            <Button
              variant="outlined"
              onClick={handleRemove}
              color="secondary"
              style={{ marginLeft: '16px' }}
            >
              Delete
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

CreateOrEditCollectionDialog.propTypes = {
  isDialogOpen: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  isNew: PropTypes.bool,
  userId: PropTypes.string,
  editedName: PropTypes.string,
  setEditedName: PropTypes.func.isRequired,
  editedDescription: PropTypes.string,
  setEditedDescription: PropTypes.func.isRequired,
};

export default CreateOrEditCollectionDialog;
