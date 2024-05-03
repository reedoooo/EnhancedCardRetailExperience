import React from 'react';
import { Grid, CardContent, useMediaQuery, Skeleton } from '@mui/material';
import MDTypography from '../MDTYPOGRAPHY/MDTypography';
import { useMode } from '../../../context';
import useBreakpoint from 'context/hooks/useBreakPoint';

const RCInfoItem = ({
  label,
  value,
  gridSizes = { xs: 12, sm: 6, md: 3 },
  externalTheme = null,
}) => {
  const { theme } = useMode();
  const { isMobile } = useBreakpoint();
  // const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid item {...gridSizes}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: isMobile ? 'auto' : '100%', // Adjust height for mobile
          padding: isMobile ? '8px' : '16px', // Reduce padding on mobile for less tall items
          flexGrow: 1,
          '&:last-child': {
            paddingBottom: isMobile ? '8px' : '16px', // Ensure the last child padding is reduced on mobile
          },
        }}
      >
        {label !== undefined && value !== undefined ? (
          <>
            <MDTypography
              variant={isMobile ? 'body2' : 'h4'}
              fontWeight="medium"
              sx={{ color: theme.palette.chartTheme.grey.darkest }}
            >
              {`${label}:`}
            </MDTypography>
            <MDTypography
              variant={isMobile ? 'body1' : 'h6'}
              sx={{ color: theme.palette.chartTheme.grey.light }}
            >
              {value}
            </MDTypography>
          </>
        ) : (
          <>
            <Skeleton variant="text" width="80%" height={24} />
            <Skeleton variant="text" width="60%" height={30} />
          </>
        )}
      </CardContent>
    </Grid>
  );
};

export default RCInfoItem;