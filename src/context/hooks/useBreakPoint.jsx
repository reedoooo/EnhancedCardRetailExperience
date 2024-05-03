import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const useBreakpoint = () => {
  const theme = useTheme();
  const isIpod = useMediaQuery(theme.breakpoints.down('xs'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isLaptop = useMediaQuery(theme.breakpoints.down('lg'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('xl'));
  const matchesXS = useMediaQuery(theme.breakpoints.only('xs'));
  const matchesSM = useMediaQuery(theme.breakpoints.only('sm'));
  const matchesMD = useMediaQuery(theme.breakpoints.only('md'));
  const matchesLG = useMediaQuery(theme.breakpoints.only('lg'));
  const matchesXL = useMediaQuery(theme.breakpoints.only('xl'));

  // Checks for ranges
  const matchesXSBetweenSM = useMediaQuery(
    theme.breakpoints.between('xs', 'sm')
  );
  const matchesSMBetweenMD = useMediaQuery(
    theme.breakpoints.between('sm', 'md')
  );
  const matchesMDBetweenLG = useMediaQuery(
    theme.breakpoints.between('md', 'lg')
  );
  const matchesLGBetweenXL = useMediaQuery(
    theme.breakpoints.between('lg', 'xl')
  );

  return {
    isXs: isIpod,
    isMobile: isMobile,
    isMd: isTablet,
    isLg: isLaptop,
    isXl: isDesktop,
  };
};

export default useBreakpoint;
// EXAMPLE USE: