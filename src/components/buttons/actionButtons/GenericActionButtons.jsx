import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Box } from '@mui/material';
import MDTypography from '../../../layout/REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
import { getContextIcon } from '../../../layout/REUSABLE_COMPONENTS/icons/index';
import useCollectionManager from '../../../context/MAIN_CONTEXT/CollectionContext/useCollectionManager';
import ActionButton from './ActionButton';
import { useSnackbar } from 'notistack';
import GlassyIcon from '../../../layout/REUSABLE_COMPONENTS/icons/GlassyIcon';
import MDBox from '../../../layout/REUSABLE_COMPONENTS/MDBOX';
import useDeckManager from '../../../context/MAIN_CONTEXT/DeckContext/useDeckManager';
import { useCartManager } from '../../../context/MAIN_CONTEXT/CartContext/useCartManager';
import LoadingOverlay from '../../../layout/REUSABLE_COMPONENTS/system-utils/LoadingOverlay';
import useSelectedCollection from '../../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import useSelectedDeck from '../../../context/MAIN_CONTEXT/DeckContext/useSelectedDeck';

const buttonSizeMap = {
  xs: 'extraSmall',
  sm: 'small',
  md: 'medium',
  lg: 'large',
};

const GenericActionButtons = ({
  card,
  // selectedEnt,
  context = 'Collection',
  onClick,
  onSuccess,
  onFailure,
  page,
  cardSize = 'md',
  datatable = false,
}) => {
  const { enqueueSnackbar } = useSnackbar(); // Add this line to use Notistack
  const memoizedReturnValues = useCollectionManager(); // Add this line to use useCollectionManager
  const memoizedSelectionVals1 = useSelectedCollection(); // Add this line to use useCollectionManager
  const memoizedSelectionVals2 = useSelectedDeck(); // Add this line to use useCollectionManager
  const memoizedSelectionVals3 = useCartManager(); // Add this line to use useCollectionManager
  if (!memoizedReturnValues) return <LoadingOverlay />; // Add this line to use useCollectionManager
  const { addOneToCollection, removeOneFromCollection } = memoizedReturnValues; // Modify this line to use useCollectionManager
  const { addOneToDeck, removeOneFromDeck } = useDeckManager();
  const { addOneToCart, removeOneFromCart } = useCartManager();
  const [buttonSize, setButtonSize] = useState(
    buttonSizeMap[cardSize] || 'medium'
  );
  const [selectedEntity, setSelectedEntity] = useState({});
  useEffect(() => {
    if (context === 'Collection') {
      setSelectedEntity(memoizedSelectionVals1.selectedCollection);
    } else if (context === 'Deck') {
      // console.log('ENT', memoizedSelectionVals2.selectedDeck);
      setSelectedEntity(memoizedSelectionVals2.selectedDeckId);
    } else if (context === 'Cart') {
      setSelectedEntity(memoizedSelectionVals3.cart);
    }
  }, [
    memoizedSelectionVals1.selectedCollection,
    memoizedSelectionVals2.selectedDeckId,
    memoizedSelectionVals2.allDecks,
    memoizedSelectionVals3.cart,
    context,
  ]);
  useEffect(() => {
    setButtonSize(buttonSizeMap[cardSize] || 'medium');
  }, [cardSize]);
  const addActions = useMemo(
    () => ({
      Collection: addOneToCollection,
      Deck: addOneToDeck,
      Cart: addOneToCart,
    }),
    [addOneToCollection, addOneToDeck, addOneToCart]
  );
  const removeActions = useMemo(
    () => ({
      Collection: removeOneFromCollection,
      Deck: removeOneFromDeck,
      Cart: removeOneFromCart,
    }),
    [removeOneFromCollection, removeOneFromDeck, removeOneFromCart]
  );

  const handleAction = useCallback(
    async (action, cardData, currentContext) => {
      if (!cardData) {
        console.error('No card data provided.');
        enqueueSnackbar('Action failed.', { variant: 'error' });
        return;
      }
      console.log(
        `Action: ${action}, Card: ${card?.name}, Context: ${currentContext}, ENTITY: ${selectedEntity}`
      );
      const actionMap = action === 'add' ? addActions : removeActions;
      actionMap[currentContext]?.(card, selectedEntity);
    },
    [addActions, removeActions, enqueueSnackbar, selectedEntity]
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: buttonSize === 'extraSmall' ? 'column' : 'row',
        alignItems: 'center',
        gap: 1,
        width: '100%',
        height: '100%',
      }}
    >
      {datatable !== 'data-table' && (
        <MDBox
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexBasis: '20%', // Adjusting to occupy the desired space, may vary based on layout
            height: '100%', // Full height for alignment with siblings
            borderRadius: '8px', // Smoother corners for a subtle glass effect
            background: 'rgba(255, 255, 255, 0.4)', // Lighter background for a frosted glass look
            boxShadow: `
          inset 0 0 10px rgba(12, 134, 223, 0.5), 
          0 0 15px rgba(12, 134, 223, 0.5)
        `, // Softer blue glow
            backdropFilter: 'blur(5px)', // Reduced blur for a clearer effect
            overflow: 'hidden', // Ensure contents do not overflow rounded corners
            transition: 'all 0.3s ease', // Smooth transition for hover effects
            '&:hover': {
              transform: 'scale(1.05)', // Slight scale on hover for interactivity
              boxShadow: `
            inset 0 0 12px rgba(12, 134, 223, 0.6), 
            0 0 20px rgba(12, 134, 223, 0.6)
          `, // Intensify glow on hover
            },
          }}
        >
          <MDTypography variant="button" color="white" sx={{ color: 'white' }}>
            <GlassyIcon
              Icon={getContextIcon(context)}
              iconColor="#FFFFFF"
              size={160}
            />
          </MDTypography>
        </MDBox>
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: datatable ? 0 : 1,
          width: '80%',
        }}
      >
        <ActionButton
          action="add"
          buttonSize={buttonSize}
          handleCardAction={() =>
            handleAction('add', card, context, selectedEntity)
          }
          labelValue={'add'} // Assuming 'context' is intended to be used as 'labelValue'
          variant={datatable ? 'data-table' : 'card'}
          actionType="add"
          selectedEntity={selectedEntity}
        />
        <ActionButton
          action="remove"
          buttonSize={buttonSize}
          handleCardAction={() =>
            handleAction('remove', card, context, selectedEntity)
          }
          labelValue={'remove'} // Assuming 'context' is intended to be used as 'labelValue'
          variant={datatable ? 'data-table' : 'card'}
          actionType="remove"
          selectedEntity={selectedEntity}
        />
      </Box>
    </Box>
  );
};

export default GenericActionButtons;
