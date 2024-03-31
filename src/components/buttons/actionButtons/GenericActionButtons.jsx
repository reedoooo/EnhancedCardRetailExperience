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
import LoadingOverlay from '../../../layout/REUSABLE_COMPONENTS/LoadingOverlay';

const buttonSizeMap = {
  xs: 'extraSmall',
  sm: 'small',
  md: 'medium',
  lg: 'large',
};

const GenericActionButtons = ({
  card,
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
  if (!memoizedReturnValues) return <LoadingOverlay />; // Add this line to use useCollectionManager
  // const { addOneToCollection, removeOneFromCollection } =
  //   useCollectionManager();
  const { addOneToCollection, removeOneFromCollection } = memoizedReturnValues; // Modify this line to use useCollectionManager
  const { addOneToDeck, removeOneFromDeck } = useDeckManager();
  const { addOneToCart, removeOneFromCart } = useCartManager();
  const [buttonSize, setButtonSize] = useState(
    buttonSizeMap[cardSize] || 'medium'
  );
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
        `Action: ${action}, Card: ${cardData?.name}, Context: ${currentContext}`
      );
      // Dynamic action handling
      if (action === 'add' && addActions[currentContext]) {
        addActions[currentContext](cardData);
      } else if (action === 'remove' && removeActions[currentContext]) {
        removeActions[currentContext](cardData);
      }
    },
    [card, context, addActions, removeActions]
  );
  return (
    <ActionButtons
      buttonSize={buttonSize}
      card={card}
      context={context}
      page={page}
      handleCardAction={() => handleAction('add', card, context)}
      datatable={datatable}
      variant={datatable ? 'data-table' : 'card'}
    />
  );
};

const ActionButtons = ({
  buttonSize,
  card,
  context,
  page,
  handleCardAction,
  variant,
  datatable,
}) => {
  const labelValue =
    typeof context === 'string' ? context : context?.pageContext;
  const stackDirection = buttonSize === 'extraSmall' ? 'column' : 'row';
  const currentContextIcon = getContextIcon(labelValue);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: stackDirection,
        alignItems: 'center',
        gap: 1,
        width: '100%',
        height: '100%',
      }}
    >
      {variant !== 'data-table' && (
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
              Icon={currentContextIcon}
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
          gap: variant === 'data-table' ? 0 : 1,
          width: '80%',
        }}
      >
        <ActionButton
          action="add"
          buttonSize={buttonSize}
          handleCardAction={handleCardAction}
          labelValue={'add'} // Assuming 'context' is intended to be used as 'labelValue'
          variant={variant}
          actionType="add"
        />
        <ActionButton
          action="remove"
          buttonSize={buttonSize}
          handleCardAction={handleCardAction}
          labelValue={'remove'} // Assuming 'context' is intended to be used as 'labelValue'
          variant={variant}
          actionType="remove"
        />
      </Box>
    </Box>
  );
};

export default GenericActionButtons;
