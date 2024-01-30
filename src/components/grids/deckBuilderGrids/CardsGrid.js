import React, { useMemo, useState } from 'react';
import { Grid, Grow, Typography } from '@mui/material';
import DeckItem from '../gridItems/DeckItem';
import { useDeckStore } from '../../../context/MAIN_CONTEXT/DeckContext/DeckContext';
import SkeletonDeckItem from '../gridItems/SkeletonDeckItem';
import GridLayout from '../searchResultsGrids/GridLayout';

const CardsGrid = ({ isLoading }) => {
  const { selectedCards } = useDeckStore();
  const [error, setError] = useState('');
  const flattenSelectedCards = useMemo(() => {
    if (!Array.isArray(selectedCards)) return [];

    const cardCountMap = new Map();

    return selectedCards.reduce((acc, card) => {
      if (!card) return acc;
      const currentCount = cardCountMap.get(card.id) || 0;
      if (currentCount < 3) {
        cardCountMap.set(card.id, currentCount + 1);
        return [...acc, { ...card, uniqueKey: `${card.id}-${currentCount}` }];
      }
      return acc;
    }, []);
  }, [selectedCards]);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const skeletonCount = 12;

  return (
    <GridLayout
      containerStyles={{ marginTop: '1rem', gap: '1rem' }} // Enhanced styling for spacing
      isLoading={isLoading}
      skeletonCount={skeletonCount}
      gridItemProps={{ xs: 12, sm: 6, md: 4, lg: 3 }}
    >
      {(isLoading
        ? Array.from({ length: skeletonCount })
        : flattenSelectedCards
      ).map((item, index) => (
        <Grid
          item
          xs={6}
          sm={4}
          md={4}
          lg={3}
          key={isLoading ? index : item.uniqueKey}
        >
          <Grow
            in={true}
            style={{ transformOrigin: '0 0 0' }}
            {...(isLoading ? { timeout: (index + 1) * 300 } : {})} // Staggered animation effect
          >
            <div>
              {' '}
              {isLoading ? (
                <SkeletonDeckItem context={'Deck'} />
              ) : (
                <DeckItem
                  card={item}
                  page={'Deck'}
                  index={index}
                  context={'Deck'}
                />
              )}
            </div>
          </Grow>
        </Grid>
      ))}
    </GridLayout>
  );
};

export default React.memo(CardsGrid);
