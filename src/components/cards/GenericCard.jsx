import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Button,
} from '@mui/material';
import CardToolTip from './CardToolTip';
import DeckCardDialog from '../dialogs/DeckCardDialog';
import CardMediaSection from '../media/CardMediaSection';
import GenericActionButtons from '../buttons/GenericActionButtons';
import placeholderImage from '../../assets/placeholder.jpeg';
import { CartContext } from '../../context/CartContext/CartContext';
import { DeckContext } from '../../context/DeckContext/DeckContext';
import {
  mergeStyles,
  commonStyles,
  deckCardStyles,
  productCardStyles,
} from './cardStyles';
import CardModal from '../modals/cardModal/CardModal';
import { CollectionContext } from '../../context/CollectionContext/CollectionContext';
import GenericCardModal from '../modals/GenericCardModal';

const GenericCard = ({ card, context, cardInfo }) => {
  const deckContext = useContext(DeckContext);
  const cartContext = useContext(CartContext);
  // const cardContext = useContext(CardContext);
  const collectionContext = useContext(CollectionContext);

  // New state for button variant
  const [buttonVariant, setButtonVariant] = useState('contained');
  const [isModalOpen, setModalOpen] = useState(false);
  const [isHovering, setHovering] = useState(false);
  const tooltipRef = useRef(null);
  const cardRef = useRef(null);
  const imgUrl = card?.card_images?.[0]?.image_url || placeholderImage;

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const buttonStyles = {
    maxWidth: '200px',
    minHeight: '40px',
    maxHeight: '60px',
    width: '100%',
  };

  // Function to handle window resize events
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setButtonVariant('outlined');
    } else {
      setButtonVariant('contained');
    }
  };

  // Adding window resize event listener
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isHovering && tooltipRef.current && cardRef.current) {
      const cardRect = cardRef.current.getBoundingClientRect();
      tooltipRef.current.style.top = `${cardRect.top}px`;
      tooltipRef.current.style.left = `${cardRect.right}px`;
    }
  }, [isHovering]);

  const classes = mergeStyles(
    commonStyles(),
    context === 'Deck' ? deckCardStyles() : productCardStyles()
  );

  // console.log(
  //   'classes.card type:',
  //   typeof classes.card,
  //   'value:',
  //   classes.card
  // );

  const openProductModal = () => {
    openModal();
  };

  // Function to handle context-specific actions
  const getContextSpecificProps = () => {
    switch (context) {
      case 'Deck':
        return {
          deckCardQuantity: deckContext.getCardQuantity(card.id),
          addOne: deckContext.addOneToDeck(card),
          removeOne: deckContext.removeOneFromDeck(card),
        };
      case 'Cart':
      case 'Store':
        return {
          deckCardQuantity: cartContext.getCardQuantity(card.id),
          addOne: cartContext.addOneToCart(card),
          removeOne: cartContext.removeOneFromCart(card),
          removeAll: cartContext.deleteFromCart(card),
        };
      case 'Collection':
        return {
          deckCardQuantity: collectionContext.getCardQuantity(card.id),
          addOne: collectionContext.addOneToCollection(card),
          removeOne: collectionContext.removeOneFromCollection(card),
          removeAll: collectionContext.removeAllFromCollection(card),
        };
      default:
        return {};
    }
  };

  const contextProps = getContextSpecificProps();

  const StoreCardContent = () => (
    <>
      <Typography
        variant="body2"
        color="text.secondary"
        className={classes.content}
      >
        Price: {card?.card_prices?.[0]?.tcgplayer_price}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        className={classes.content}
      >
        Quantity:{' '}
        {contextProps.deckCardQuantity?.quantityOfSameId || 'Not in cart'}
      </Typography>
    </>
  );

  const CartCardContent = () => (
    <>
      <Typography variant="body2" color="text.secondary">
        Price: {card?.card_prices?.[0]?.tcgplayer_price}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Quantity:{' '}
        {contextProps.deckCardQuantity?.quantityOfSameId || 'Not in cart'}
      </Typography>
    </>
  );

  const DeckCardContent = () => (
    <>
      <Typography variant="body2" color="text.secondary">
        Price: {card?.card_prices?.[0]?.tcgplayer_price}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Quantity:{' '}
        {contextProps.deckCardQuantity?.quantityOfSameId || 'Not in deck'}
      </Typography>
    </>
  );

  return (
    <Card ref={cardRef} className={classes.card ? classes.card.toString() : ''}>
      {context === 'Deck' ? (
        <CardMediaSection
          imgUrl={imgUrl}
          className={classes.media}
          openModal={openModal}
          setHovering={setHovering}
          cardRef={cardRef}
          card={card}
          cardInfo={cardInfo}
        />
      ) : (
        <CardMedia component="img" alt={card.name} image={imgUrl} />
      )}
      <CardContent>
        <Typography variant="h5" className={classes.text}>
          {card.name}
        </Typography>
        {context === 'Store' && (
          <StoreCardContent className={classes.content} />
        )}
        {context === 'Cart' && <CartCardContent className={classes.content} />}
        {context === 'Deck' && <DeckCardContent className={classes.content} />}
      </CardContent>
      <CardActions>
        {context === 'Store' || context === 'Cart' ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              height: '100%',
              width: '100%',
            }}
          >
            <div style={{ flex: 1 }}>
              <GenericActionButtons
                card={card}
                context={context}
                variant={buttonVariant}
                {...contextProps}
                style={buttonStyles}
              />
            </div>
            <div style={{ flex: 1 }}>
              <Button
                variant={buttonVariant}
                color="primary"
                onClick={openProductModal}
                style={buttonStyles}
              >
                View Details
              </Button>
            </div>
          </div>
        ) : (
          <GenericActionButtons
            card={card}
            context={context}
            variant={buttonVariant}
            {...contextProps}
            style={buttonStyles}
          />
        )}
      </CardActions>
      {context === 'Deck' && isHovering && (
        <CardToolTip
          cardInfo={cardInfo}
          isHovering={isHovering}
          context={context}
          classes={classes}
          isModalOpen={isModalOpen}
          tooltipRef={tooltipRef}
        />
      )}
      {context === 'Deck' && (
        <DeckCardDialog
          isOpen={isModalOpen}
          classes={classes}
          context={context}
          onClose={closeModal}
          card={card}
          cardInfo={cardInfo}
        />
      )}
      {(context === 'Store' || context === 'Cart') && (
        <GenericCardModal
          isOpen={isModalOpen}
          classes={classes}
          onClose={closeModal}
          card={card}
          cardInfo={cardInfo}
        />
      )}
    </Card>
  );
};

export default GenericCard;
