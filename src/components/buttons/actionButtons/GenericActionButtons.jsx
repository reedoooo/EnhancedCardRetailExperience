import React, { useState, useContext } from 'react';
import { makeStyles } from '@mui/styles';
import CardActionButtons from './CardActionButtons';
import DeckCardDialog from '../../dialogs/DeckCardDialog';
import ChooseCollectionDialog from './ChooseCollectionDialog';
import { DeckContext } from '../../../context/DeckContext/DeckContext';
import { CartContext } from '../../../context/CartContext/CartContext';
import { CollectionContext } from '../../../context/CollectionContext/CollectionContext';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    height: '100%',
  },
});

const GenericActionButtons = ({ card, context }) => {
  const classes = useStyles();
  const contexts = {
    Deck: useContext(DeckContext),
    Cart: useContext(CartContext),
    Store: useContext(CartContext), // Assuming the Store context is similar to Cart
    Collection: useContext(CollectionContext),
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [openCollectionDialog, setOpenCollectionDialog] = useState(false);

  const contextProps = contexts[context] || {};

  const toggleDialog = (setState) => () => setState((prevState) => !prevState);
  // console.log('context', context);
  // console.log('contextProps', contextProps);
  // console.log('contexts', contexts);
  // console.log('card', card);
  // console.log('openDialog', openDialog);
  // console.log('openCollectionDialog', openCollectionDialog);
  return (
    <div className={classes.root}>
      <CardActionButtons
        card={card}
        context={context}
        contextProps={contextProps}
        handleOpenDialog={toggleDialog(setOpenDialog)}
      />
      {context in contexts && (
        <DeckCardDialog
          isOpen={openDialog}
          onClose={toggleDialog(setOpenDialog)}
          context={context}
          card={card}
        />
      )}
      {openDialog && (
        <ChooseCollectionDialog
          deckDialogIsOpen={openDialog}
          isOpen={openCollectionDialog} // Corrected the prop value
          onClose={toggleDialog(setOpenCollectionDialog)}
          context={context}
          card={card}
        />
      )}
    </div>
  );
};

export default GenericActionButtons;