import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardLinearChart from './CardLinearChart';
import {
  ErrorBoundary,
  useCollectionStore,
  useMode,
  usePageContext,
} from '../context';
import useCardCronJob from './useCardCronJob';
import initialCardData from './initialCardData';
import { format } from 'date-fns';
import SingleCardAnimation from '../assets/animations/SingleCardAnimation';
import LoadingCardAnimation from '../assets/animations/LoadingCardAnimation';
import ImageDisplayFromHook from '../components/other/dataDisplay/ImageDisplayFromHook';
import styled from 'styled-components';

// Adjust the padding, margin, and other styles as needed
const ChartArea = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid #000',
  borderRadius: '5px',
}));
// A square, responsive container for the chart
const SquareChartContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%', // 100% of the parent width
  paddingTop: '100%', // Maintain aspect ratio (1:1)
  overflow: 'hidden',
  '& > *': {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
}));

const CardChart = ({ cardData = initialCardData }) => {
  // STYLING AND MEDIA QUERY HOOKS
  const { theme } = useMode();
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));
  const [imageUrl, setImageUrl] = useState(null);
  const { startUpdates, pauseUpdates, resetData } =
    useCardCronJob(initialCardData);
  const formatTimestamp = (timestamp) =>
    format(new Date(timestamp), "MMM do, yyyy 'at' HH:mm");
  const [chartDimensions, setChartDimensions] = useState({
    width: 0,
    height: 0,
  });
  const { setLoading, loadingStatus, returnDisplay } = usePageContext();
  const safeCardData = cardData || { dailyPriceHistory: [] };
  if (!cardData || !cardData?.dailyPriceHistory) {
    console.log('Card data not found', cardData);
    // setLoading('isLoading', true);
  }
  const dailyPriceHistory = safeCardData?.dailyPriceHistory;
  useEffect(() => {
    if (cardData?.imageUrl) {
      console.log('Setting image url', cardData?.imageUrl);
      setImageUrl(cardData?.image);
    }
  }, [cardData?.imageUrl]);

  // const chartData = useMemo(
  //   () =>
  //     dailyPriceHistory?.map((priceEntry) => ({
  //       x: priceEntry?.timestamp,
  //       y: priceEntry?.num,
  //     })),
  //   [dailyPriceHistory] // dependency array
  // );
  const nivoReadyData = useMemo(
    () => [
      {
        id: cardData.name || 'default',
        data: cardData.dailyPriceHistory.map(({ timestamp, num }) => ({
          x: timestamp,
          y: num,
        })),
      },
    ],
    [cardData]
  );
  const renderLoadingAnimation = () =>
    isLgUp && <LoadingCardAnimation selected={true} />;
  // const renderChart = () => (
  //   <ErrorBoundary>
  //     <CardLinearChart
  //       nivoReadyData={nivoReadyData}
  //       dimensions={chartDimensions}
  //     />
  //   </ErrorBoundary>
  // );
  // Ensure this effect doesn't set loading when not necessary
  useEffect(() => {
    if (nivoReadyData && nivoReadyData.length > 0 && loadingStatus.isLoading) {
      setLoading('isLoading', false);
    }
  }, [nivoReadyData, setLoading, loadingStatus.isLoading]);
  // Add responsive chart dimension handling
  useEffect(() => {
    // Example of setting dynamic chart dimensions (could be more complex based on container size)
    const updateDimensions = () => {
      const width = window.innerWidth < 500 ? window.innerWidth : 500; // or some other logic
      const height = 300; // Fixed height or based on aspect ratio
      setChartDimensions({ width, height });
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions(); // Initial call

    return () => {
      window.removeEventListener('resize', updateDimensions); // Cleanup listener
    };
  }, []); // Empty array ensures this effect runs only once after initial render
  // Simplified for demonstration
  // const renderLoadingAnimation = () => {
  //   return <LoadingCardAnimation selected={true} />;
  // };
  const renderHeaderWithAnimation = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center', // Align items vertically
        }}
      >
        <CardHeader
          // avatar={
          //   <Avatar
          //     alt="imageUrl"
          //     src={imageUrl || cardData?.imageUrl || ''}
          //     sx={{ width: 24, height: 24 }}
          //   />
          // }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Card Cron Job Simulator"
          subheader={cardData?.name || 'Card Name'}
          sx={{
            padding: theme.spacing(1),
            margin: theme.spacing(1),
          }}
        />
        {/* Conditionally render animation based on size or other conditions */}
        {isLgUp && renderLoadingAnimation()}
      </Box>
    );
  };
  return (
    <React.Fragment>
      <Card
        variant="outlined"
        sx={{
          background: theme.palette.backgroundA.lightest,
          // width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #000',
          borderRadius: '5px',
          elevation: 2,
          boxShadow: 2,
          marginTop: 2,
        }}
      >
        <CardContent
          sx={{
            // background: theme.palette.backgroundA.lightest,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: theme.spacing(1),
            margin: theme.spacing(1),
            elevation: 2,
            boxShadow: 2,
            marginTop: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              // width: '100%',
              maxWidth: '100%',
              maxHeight: '100%',
              padding: theme.spacing(2),
            }}
          >
            {renderHeaderWithAnimation()}
          </Box>

          <SquareChartContainer>
            <ChartArea theme={theme}>
              {loadingStatus?.isLoading ? (
                returnDisplay()
              ) : (
                <ErrorBoundary>
                  <CardLinearChart
                    nivoReadyData={nivoReadyData}
                    dimensions={chartDimensions}
                  />
                </ErrorBoundary>
              )}
            </ChartArea>
          </SquareChartContainer>
        </CardContent>

        <Card
          sx={{
            elevation: 2,
            boxShadow: 2,
            // marginTop: 2,
            // py: 1,
          }}
        >
          {/* Card displaying data with responsive typography */}
          {/* <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              background: theme.palette.backgroundA.lightest,
              // py: 1,
              width: '100%',
              height: '100%',
            }}
          > */}
          {/* <CardActions
              sx={{
                justifyContent: 'space-between',
                width: '100%',
                margin: 0,
                padding: 0,
              }}
            >
              {/* Responsive Button Styling */}
          {/* Iterate through buttons to reduce redundancy */}
          {/* {['Start Updates', 'Pause Updates', 'Reset Data'].map(
                (text, index) => (
                  <Button
                    key={index}
                    variant={text === 'Reset Data' ? 'outlined' : 'contained'}
                    onClick={() => {
                      if (text === 'Start Updates') {
                        startUpdates();
                      } else if (text === 'Pause Updates') {
                        pauseUpdates();
                      } else if (text === 'Reset Data') {
                        resetData();
                      }
                    }}
                    sx={{
                      // padding: theme.spacing(1), // Reduced padding
                      fontSize: '0.7rem', // Reduced font size
                      width: '30%', // Adjusted width
                      height: '75%',
                      mx: '0.5rem',
                      my: '0.5rem',
                      // margin: '0 5px', // Adjust margin for spacing
                      color: theme.palette.text.primary,
                      background: theme.palette.backgroundA.darker,
                      '&:hover': {
                        background: theme.palette.backgroundA.darkest,
                      },
                    }}
                  >
                    {text}
                  </Button>
                )
              )}
            </CardActions>  */}
          <CardActions
            sx={{
              justifyContent: 'space-between',
              width: '100%',
              m: 0,
              p: 0,
            }}
          >
            {['Start Updates', 'Pause Updates', 'Reset Card Data'].map(
              (text, index) => (
                <Button
                  key={index}
                  variant={
                    text === 'Reset Card Data' ? 'outlined' : 'contained'
                  }
                  onClick={() => {
                    if (text === 'Start Updates') startUpdates();
                    else if (text === 'Pause Updates') pauseUpdates();
                    else if (text === 'Reset Card Data') resetData();
                  }}
                  sx={{
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                    width: '30%',
                    height: '100%',
                    minHeight: '100%',
                    mx: 0.5,
                    my: 0.5,
                    flexGrow: 1,
                    color: theme.palette.backgroundA.contrastTextB,
                    background: theme.palette.backgroundA.darker,
                    '&:hover': {
                      background: theme.palette.backgroundA.darkest,
                    },
                  }}
                >
                  {text}
                </Button>
              )
            )}
          </CardActions>
          {/* </Box> */}
          <CardContent sx={{ padding: 0, '&:last-child': { pb: 0 } }}>
            <Paper
              sx={{
                background: theme.palette.backgroundA.lighter,
                border: `1px solid${theme.palette.backgroundA.darker}`,
                borderRadius: '5px',
                elevation: 2,
                boxShadow: 2,
                padding: theme.spacing(1),
                margin: theme.spacing(1),
              }}
            >
              <List
                dense
                sx={{
                  maxHeight: { xs: '120px', sm: '150px', md: '200px' }, // Responsive max height
                  overflowY: 'auto',
                }}
              >
                {cardData?.dailyPriceHistory?.map((entry, index) => (
                  <ListItem
                    key={index}
                    divider
                    sx={{ justifyContent: 'space-between' }}
                  >
                    <Typography variant="caption">
                      Quantity: {cardData?.quantity}
                    </Typography>
                    <Typography variant="caption">
                      Price: ${entry?.num}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {formatTimestamp(entry?.timestamp)}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </CardContent>
        </Card>
      </Card>
    </React.Fragment>
  );
};

export default CardChart;
