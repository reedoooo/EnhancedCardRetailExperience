import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Collapse,
  useMediaQuery,
} from '@mui/material';
import MDBox from '../REUSABLE_COMPONENTS/MDBOX';
import DeckBuilderIcon from '../REUSABLE_COMPONENTS/icons/DeckBuilderIcon';
import RCInfoItem from '../REUSABLE_COMPONENTS/RCInfoItem';
import RCWrappedIcon from '../REUSABLE_COMPONENTS/RCWRAPPEDICON/RCWrappedIcon';
import { roundToNearestTenth } from '../../context/Helpers';
import { useMode } from '../../context';
import GenericCard from '../../components/cards/GenericCard';
import DeckForm from '../../components/forms/DeckForm';
import DeckOfCardsIcon from '../REUSABLE_COMPONENTS/icons/DeckOfCardsIcon';
import MoneyIcon from '../REUSABLE_COMPONENTS/icons/MoneyIcon';
const AnimatedInfoItem = ({ label, value, theme, delay }) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setChecked(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <Collapse
      in={checked}
      timeout={1000} // Adjust timeout as needed for the animation duration
    >
      <RCInfoItem
        label={label}
        value={value}
        theme={theme}
        gridSizes={{ xs: 4, sm: 3, md: 3 }}
      />
    </Collapse>
  );
};
const DeckListItem = ({
  deck,
  cards,
  handleSelectAndShowDeck,
  isEditPanelOpen,
}) => {
  const { theme } = useMode();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const colors = theme.palette.chartTheme;
  const greenAccent = colors.greenAccent.light;

  const infoItems = [
    { label: 'Name', value: deck?.name },
    { label: 'Value', value: `$${roundToNearestTenth(deck?.totalPrice)}` },
    { label: 'Cards', value: deck?.totalQuantity },
  ];

  return (
    <Card>
      <MDBox
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <CardActionArea
          onClick={() => handleSelectAndShowDeck(deck)}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            flexGrow: 1,
          }}
        >
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              height: '100%',
              minHeight: '4rem',
              flexGrow: 1,
            }}
          >
            <Grid
              container
              alignItems="flex-start"
              justifyContent="flex-start"
              flexGrow={1}
              spacing={2}
            >
              <Grid item xs={12} sm={12} md={2}>
                <MDBox>
                  <RCWrappedIcon
                    color="white"
                    sx={{
                      background: greenAccent,
                    }}
                  >
                    <DeckOfCardsIcon color={'white'} />
                    {/* <MoneyIcon
                      // color={greenAccent}
                      background={'white'}
                      sx={{
                        // fontSize: 20,
                        // color: 'white',
                        background: 'white',
                        // color: greenAccent,
                        fontSize: '26px',
                      }}
                    /> */}
                  </RCWrappedIcon>
                </MDBox>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <Grid
                  container
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  flexDirection={'row'}
                  flexGrow={1}
                  spacing={2}
                >
                  {infoItems.map((item, index) => (
                    <AnimatedInfoItem
                      key={item.label}
                      label={item.label}
                      value={item.value}
                      theme={theme}
                      delay={index * 200} // Adjust delay as needed
                    />
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </MDBox>

      <Collapse in={isEditPanelOpen}>
        {/* <DeckEditor deck={deck} onClose={() => handleSelectAndShowDeck(deck)} /> */}
        <MDBox sx={{ margin: isMobile ? theme.spacing(1) : theme.spacing(3) }}>
          <DeckForm actionType="update" deckData={deck} /> {/* </Paper> */}
        </MDBox>
      </Collapse>
      <Collapse in={isEditPanelOpen}>
        <MDBox sx={{ margin: isMobile ? theme.spacing(1) : theme.spacing(3) }}>
          {/* Adjust the spacing as needed */}
          <Card>
            <Grid container spacing={1}>
              {cards &&
                cards.length > 0 &&
                cards.map((card) => (
                  <Grid item xs={6} sm={4} md={2} key={card._id}>
                    {/* Adjust breakpoints as needed for responsive design */}
                    <GenericCard key={card._id} card={card} />
                  </Grid>
                ))}
            </Grid>
          </Card>
        </MDBox>
      </Collapse>
    </Card>
  );
};

AnimatedInfoItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  delay: PropTypes.number.isRequired,
};

DeckListItem.propTypes = {
  deck: PropTypes.object.isRequired,
  isEditPanelOpen: PropTypes.bool.isRequired,
  handleSelectAndShowDeck: PropTypes.func.isRequired,
};

export default DeckListItem;
