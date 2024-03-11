import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Button,
  TextField,
  Chip,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useDeckStore, useFormContext, useMode } from '../../context';
import useSnackBar from '../../context/hooks/useSnackBar';
import { withDynamicSnackbar } from '../../layout/REUSABLE_COMPONENTS/HOC/DynamicSnackbar';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormBox } from '../../layout/REUSABLE_STYLED_COMPONENTS/ReusableStyledComponents';
import FormField from '../forms/reusable/FormField';
const DeckEditPanel = ({ selectedDeck, showSnackbar }) => {
  const { theme } = useMode();
  // const { showSnackbar } = useSnackBar(); // Assuming snackbar hook for user notifications
  const {
    formMethods,
    // formStates: { errors, isSubmitting, ...formStates },
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
    setFormSchema,
    onSubmit,
    // Removal of onSubmit from destructuring as we will define a local handler
  } = useFormContext();
  // Local state for dynamic fields like tags
  const [newTag, setNewTag] = useState('');
  const tags = watch('tags', selectedDeck?.tags || []);
  const color = watch('color');

  useEffect(() => {
    setFormSchema('updateDeckForm');
  }, [setFormSchema]);

  useEffect(() => {
    if (selectedDeck) {
      reset({
        name: selectedDeck.name,
        description: selectedDeck.description,
        tags: selectedDeck.tags || [],
        color: selectedDeck.color || 'red',
      });
    }
  }, [selectedDeck, reset]);

  const handleAddNewTag = (newTag) => {
    if (newTag && !tags.includes(newTag)) {
      setValue('tags', [...tags, newTag.trim()]);
    }
  };
  const handleTagDelete = (tagToDelete) => {
    setValue(
      'tags',
      tags.filter((tag) => tag !== tagToDelete)
    );
  };
  const handleFormSubmit = async (data) => {
    try {
      // Assuming `onSubmit` is a function passed via context or props that handles the actual submission
      await onSubmit(data); // Adjust based on actual implementation
      showSnackbar({
        message: 'Deck updated successfully',
        variant: 'success',
      });
    } catch (error) {
      showSnackbar({
        message: error.message || 'An error occurred while updating the deck.',
        variant: 'error',
      });
    }
  };
  // const handleDeleteClick = async () => {
  //   try {
  //     // await deleteDeck(selectedDeck._id);
  //     showSnackbar({
  //       message: 'Deck deleted successfully',
  //       variant: 'warning',
  //     });
  //     reset(); // Optionally reset form state
  //   } catch (error) {
  //     showSnackbar({
  //       message: error.message || 'Failed to delete deck',
  //       variant: 'error',
  //     });
  //   }
  // };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: theme.spacing(3),
        margin: theme.spacing(2),
        backgroundColor: theme.palette.background.light,
      }}
    >
      <Typography variant="h6">Deck Editor</Typography>
      <FormBox
        component={'form'}
        theme={theme}
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <FormField
          label="Name"
          name="name"
          register={register}
          errors={errors}
          required
        />
        <FormField
          label="Description"
          name="description"
          register={register}
          errors={errors}
          multiline
          required
        />

        <Box sx={{ my: 2 }}>
          {tags &&
            tags?.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                onDelete={() => handleTagDelete(tag)}
              />
            ))}
          <FormField
            label="New Tag"
            name="tags"
            register={register}
            errors={errors}
            size="small"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onBlur={handleAddNewTag}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddNewTag();
              }
            }}
          />
        </Box>
        <FormControl fullWidth margin="normal">
          <InputLabel>Color</InputLabel>
          <Select
            {...register('color')}
            value={color || ''} // Ensure color is not undefined
            label="Color"
            defaultValue="" // Providing a default value
          >
            <MenuItem value="red">Red</MenuItem>
            <MenuItem value="blue">Blue</MenuItem>
            <MenuItem value="green">Green</MenuItem>
            <MenuItem value="yellow">Yellow</MenuItem>
          </Select>
        </FormControl>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 1,
            mt: 2,
          }}
        >
          <Button
            startIcon={<SaveIcon />}
            type="submit"
            variant="contained"
            sx={{ flexGrow: 1 }}
          >
            Save Changes
          </Button>
          <Button
            startIcon={<DeleteIcon />}
            variant="contained"
            color="error"
            onClick={
              selectedDeck
                ? () =>
                    onSubmit({
                      ...watch(),
                      _id: selectedDeck._id,
                      delete: true,
                    })
                : undefined
            }
            sx={{ flexGrow: 1 }}
          >
            Delete Deck
          </Button>
        </Box>
      </FormBox>
    </Paper>
  );
};

export default withDynamicSnackbar(DeckEditPanel); // Wrap DeckEditPanel with withDynamicSnackbar HOC

// import React, { useState, useEffect } from 'react';
// import {
//   Paper,
//   Typography,
//   Button,
//   TextField,
//   Chip,
//   Stack,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Box,
//   Switch,
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import {
//   useDeckStore,
//   useMode,
//   usePageContext,
//   useFormContext,
// } from '../../context';
// import {
//   StyledFormControl,
//   SwitchControl,
//   StyledButton,
//   StyledTextField,
//   StyledSelect,
// } from '../../pages/pageStyles/StyledComponents';
// import FormField from '../reusable/FormField';

// const DeckEditPanel = ({ selectedDeck, handleToggleEdit, isEditing }) => {
//   const { returnDisplay, loadingStatus, setIsFormDataLoading } =
//     usePageContext();
//   const {
//     setFormType,
//     register,
//     handleSubmit,
//     errors,
//     currentFormType,
//     isSubmitting,
//     // formState: { errors, isSubmitting },
//     onSubmit,
//   } = useFormContext();

//   useEffect(() => {
//     // Assuming setFormType is a function that can set the form context
//     setFormType('addDeckForm');
//   }, [isNew, setFormType]);
//   const isAddDeckForm = currentFormType === 'addDeckForm';

//   const { theme } = useMode();
//   const tags = selectedDeck?.tags || [];

//   return (
//     <Paper
//       elevation={3}
//       sx={{
//         padding: 3,
//         margin: 2,
//         backgroundColor: theme.palette.backgroundA.lightest,
//       }}
//     >
//       <form
//         onSubmit={handleSubmit((data) => {
//           onSubmit(data);
//           // Show snackbar after form submission
//           const message = {
//             title: 'Form Submitted',
//             description: isAddDeckForm
//               ? 'Deck added successfully'
//               : 'Deck updated successfully',
//           };
//           const variant = 'success';
//           showSnackbar(message, variant);
//         })}
//       >
//         <FormField
//           label="Name"
//           name="name"
//           register={register}
//           errors={errors}
//         />
//         <FormField
//           label="Description"
//           name="description"
//           register={register}
//           errors={errors}
//         />
//         {/* <form onSubmit={handleTagSubmit}> */}
//         <StyledFormControl
//           onSubmit={handleTagSubmit}
//           fullWidth
//           variant="filled"
//           theme={theme}
//         >
//           <Stack direction="row" spacing={1} sx={{ marginBottom: 2 }}>
//             {tags.map((tag, index) => (
//               <Chip
//                 key={index}
//                 label={tag}
//                 onDelete={() => handleTagDelete(tag)}
//               />
//             ))}
//             <TextField
//               label="New Tag"
//               value={newTag}
//               onChange={(e) => setNewTag(e.target.value)}
//               size="small"
//               sx={{ flex: 1 }}
//             />
//           </Stack>
//         </StyledFormControl>
//         <FormControl fullWidth sx={{ marginBottom: 2 }}>
//           <InputLabel id="deck-color-selector-label">Color</InputLabel>
//           <Select
//             labelId="deck-color-selector-label"
//             value={color}
//             label="Color"
//             onChange={(e) => setColor(e.target.value)}
//           >
//             <MenuItem value="red">Red</MenuItem>
//             <MenuItem value="blue">Blue</MenuItem>
//             <MenuItem value="green">Green</MenuItem>
//             <MenuItem value="yellow">Yellow</MenuItem>
//           </Select>
//         </FormControl>
//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             gap: 1,
//             flexWrap: 'wrap',
//           }}
//         >
//           <Button
//             variant="contained"
//             // color="primary"
//             // onClick={handleSave}
//             startIcon={<SaveIcon />}
//             sx={{
//               flexGrow: 1,
//               margin: '4px',
//               backgroundColor: theme.palette.backgroundA.dark,
//             }}
//           >
//             Save Changes
//           </Button>
//           <Button
//             variant="contained"
//             color="error"
//             startIcon={<DeleteIcon />}
//             // onClick={handleDelete}
//             sx={{ flexGrow: 1, margin: '4px' }}
//           >
//             Delete Deck
//           </Button>
//         </Box>
//       </form>
//     </Paper>
//   );
// };
// export default DeckEditPanel;
