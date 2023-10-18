import React from 'react';
import { Grid, Paper } from '@mui/material';
import PortfolioChart from '../components/other/PortfolioChart'; // Assuming the import path based on your previous code

const PortfolioChartContainer = ({ selectedCards, removeCard }) => {
  return (
    <Grid item xs={12} sx={{ height: '100%', width: '100%' }}>
      <Paper
        elevation={3}
        sx={{
          background:
            'linear-gradient(45deg, rgba(255,255,255,1) 30%, rgba(204,204,204,1) 100%)',
          borderRadius: '12px',
          p: 2,
          height: '100%',
          width: '100%',
          boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
        }}
      >
        <PortfolioChart selectedCards={selectedCards} removeCard={removeCard} />
      </Paper>
    </Grid>
  );
};

export default PortfolioChartContainer;
