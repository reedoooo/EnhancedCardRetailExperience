import { tokens } from './tokens';
import themeTypography from './typography/typography';
import themeColors from '../scss/_theme-vars.modules.scss';
import DeckOfCardsIcon from '../../components/reusable/icons/DeckOfCardsIcon';
import MoneyIcon from '../../components/reusable/icons/MoneyIcon';
import ChartsIcon from '../../components/reusable/icons/ChartsIcon';
import chroma from 'chroma-js';

// const createColorGradient = (color1, color2, steps) => {
//   const gradient = [];
//   const stepFactor = 1 / (steps - 1);
//   for (let i = 0; i < steps; i++) {
//     gradient.push(shadeBlendConvert(i * stepFactor, color1, color2));
//   }
//   return gradient;
// };

// TODO: TEST BOTH HEAX CONVERSION FUNCTIONS
// Utility function to convert Hex to RGBA
const hexToRgba = (hex, alpha = 1) => {
  let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16
      )}, ${alpha})`
    : null;
};
function convertHexToRGBA(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  const color = themeColors;
  // Utility functions
  const pxToRem = (number, baseNumber = 16) => {
    return `${number / baseNumber}rem`;
  };

  const hexToRgba = (hex, alpha = 1) => {
    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${alpha})`
      : null;
  };

  const rgba = (color, opacity) => {
    return hexToRgba(color, opacity);
  };

  const linearGradient = (color, colorState, angle = 195) => {
    return `linear-gradient(${angle}deg, ${color}, ${colorState})`;
  };
  const backgroundA = {
    darkest: '#2e7c67', // '#70d8bd',
    darker: '#3da58a',
    dark: '#4cceac',
    default: '#70d8bd', // '#4cceac',
    light: '#94e2cd',
    lighter: '#b7ebde',
    lightest: '#dbf5ee',
  };
  const backgroundB = {
    darkest: '#111',
    darker: '#222',
    dark: '#333',
    default: '#444',
    light: '#555',
    lighter: '#666',
    lightest: '#777',
  };
  const backgroundC = {
    darkest: hexToRgba(backgroundB.darkest, 0.9),
    darker: hexToRgba(backgroundB.darker, 0.8),
    dark: hexToRgba(backgroundB.dark, 0.7),
    default: hexToRgba(backgroundB.default, 0.6),
    light: hexToRgba(backgroundB.light, 0.5),
    lighter: hexToRgba(backgroundB.lighter, 0.4),
    lightest: hexToRgba(backgroundB.lightest, 0.3),
  };
  const backgroundD = {
    darkest: hexToRgba(backgroundA.darkest, 0.9),
    darker: hexToRgba(backgroundA.darker, 0.7),
    dark: hexToRgba(backgroundA.dark, 0.6),
    default: hexToRgba(backgroundA.default, 0.5),
    light: hexToRgba(backgroundA.light, 0.4),
    lighter: hexToRgba(backgroundA.lighter, 0.3),
    lightest: hexToRgba(backgroundA.lightest, 0.2),
  };
  const backgroundE = {
    darkest: '#0d5d96',
    darker: '#206d9b',
    dark: '#4e93a6',
    default: '#7cb8b1',
    light: '#8ec7b6',
    lighter: '#b7ebde',
    lightest: '#dbf5ee',
  };

  const rarity = {
    common: '#C0C0C0', // Silver
    uncommon: '#B8860B', // DarkGoldenRod
    rare: '#FFD700', // Gold
    super: '#00BFFF', // DeepSkyBlue
    ultra: '#FF6347', // Tomato
    secret: '#800080', // Purple
    ghost: '#F8F8FF', // GhostWhite
    starlight: '#F0E68C', // Khaki
    prismatic: '#E6E6FA', // Lavender
    collector: '#DAA520', // GoldenRod
    shortPrint: '#778899', // LightSlateGrey
    parallel: '#BA55D3', // MediumOrchid
    qcr: '#FF4500', // OrangeRed
    // Add more rarities as needed
  };
  /**
   * This object contains all of the responsive styles for the theme
   * @param {*} breakpoints
   * @returns {object} - An object containing all of the responsive styles
   * @example - theme.responsiveStyles.isXSmall(theme.breakpoints)\
   */
  const specialBreakpoints = {
    isSmUp: (breakpoints) => breakpoints.up('sm'),
    isMdUp: (breakpoints) => breakpoints.up('md'),
    isLgUp: (breakpoints) => breakpoints.up('lg'),
    isXlUp: (breakpoints) => breakpoints.up('xl'),
    isSmDown: (breakpoints) => breakpoints.down('sm'),
    isMdDown: (breakpoints) => breakpoints.down('md'),
    isLgDown: (breakpoints) => breakpoints.down('lg'),
    isXlDown: (breakpoints) => breakpoints.down('xl'),

    isXSmall: (breakpoints) => breakpoints.down('xs'),
    isSmall: (breakpoints) => breakpoints.down('sm'),
    isSmallMedium: (breakpoints) => breakpoints.up('sm'),
    isMedium: (breakpoints) => breakpoints.down('md'),
    isMediumLarge: (breakpoints) => breakpoints.up('md'),
    isLarge: (breakpoints) => breakpoints.up('lg'),
    isXLarge: (breakpoints) => breakpoints.up('xl'),
  };

  const functions = {
    pxToRem,
    linearGradient,
    hexToRgb: hexToRgba, // Using hexToRgba function for hexToRgb
    rgba,
  };

  return {
    // width: '100vw',
    functions,
    palette: {
      mode: mode,
      transparent: 'transparent',
      // PRIMARY COLORS
      backgroundA: {
        darkest: '#2e7c67', // '#70d8bd',
        darker: '#3da58a',
        dark: '#4cceac',
        default: '#70d8bd', // '#4cceac',
        light: '#94e2cd',
        lighter: '#b7ebde',
        lightest: '#dbf5ee',
        contrastTextA: '#FBFAF2',
        contrastTextB: '#333',
        contrastTextC: '#555',
        contrastTextD: '#000',
        hover: '#4cceac',
      },
      backgroundD: {
        darkest: hexToRgba(backgroundA.darkest, 0.9),
        darker: hexToRgba(backgroundA.darker, 0.7),
        dark: hexToRgba(backgroundA.dark, 0.6),
        default: hexToRgba(backgroundA.default, 0.5),
        light: hexToRgba(backgroundA.light, 0.4),
        lighter: hexToRgba(backgroundA.lighter, 0.3),
        lightest: hexToRgba(backgroundA.lightest, 0.2),
        contrastText: '#FBFAF2',
      },
      // SECONDARY COLORS
      backgroundB: {
        darkest: '#111',
        darker: '#222',
        dark: '#333',
        default: '#444',
        light: '#555',
        lighter: '#666',
        lightest: '#777',
        contrastText: '#FBFAF2',
      },
      backgroundC: {
        darkest: hexToRgba(backgroundB.darkest, 0.9),
        darker: hexToRgba(backgroundB.darker, 0.8),
        dark: hexToRgba(backgroundB.dark, 0.7),
        default: hexToRgba(backgroundB.default, 0.6),
        light: hexToRgba(backgroundB.light, 0.5),
        lighter: hexToRgba(backgroundB.lighter, 0.4),
        lightest: hexToRgba(backgroundB.lightest, 0.3),
        contrastText: '#FBFAF2',
      },
      // TERTIARY COLORS
      backgroundE: {
        darkest: '#0d5d96',
        darker: '#206d9b',
        dark: '#4e93a6',
        default: '#7cb8b1',
        light: '#8ec7b6',
        lighter: '#b7ebde',
        lightest: '#dbf5ee',
        contrastText: '#FBFAF2',
      },
      // COLORS FOR CARD RARITY OVERLAY
      rarity: {
        common: '#C0C0C0', // Silver
        uncommon: '#B8860B', // DarkGoldenRod
        rare: '#FFD700', // Gold
        super: '#00BFFF', // DeepSkyBlue
        ultra: '#FF6347', // Tomato
        secret: '#800080', // Purple
        ghost: '#F8F8FF', // GhostWhite
        starlight: '#F0E68C', // Khaki
        prismatic: '#E6E6FA', // Lavender
        collector: '#DAA520', // GoldenRod
        shortPrint: '#778899', // LightSlateGrey
        parallel: '#BA55D3', // MediumOrchid
        qcr: '#FF4500', // OrangeRed
        // Add more rarities as needed
      },
      // CARD RARITY OVERLAYS
      rarityOverlay: {
        common: hexToRgba(rarity.common, 0.5),
        uncommon: hexToRgba(rarity.uncommon, 0.5),
        rare: hexToRgba(rarity.rare, 0.5),
        super: hexToRgba(rarity.super, 0.5),
        ultra: hexToRgba(rarity.ultra, 0.5),
        secret: hexToRgba(rarity.secret, 0.5),
        ghost: hexToRgba(rarity.ghost, 0.5),
        starlight: hexToRgba(rarity.starlight, 0.5),
        prismatic: hexToRgba(rarity.prismatic, 0.5),
        collector: hexToRgba(rarity.collector, 0.5),
        shortPrint: hexToRgba(rarity.shortPrint, 0.5),
        parallel: hexToRgba(rarity.parallel, 0.5),
        qcr: hexToRgba(rarity.qcr, 0.5),
        // Add more rarities as needed
      },
      error: {
        main: colors.redAccent[500],
        dark: colors.redAccent[700],
        contrastText: '#fff',
      },
      warning: {
        main: colors.redAccent[500],
        dark: colors.redAccent[700],
        light: colors.redAccent[200],
      },
      success: {
        light: colors.greenAccent[100],
        lighter: colors.greenAccent[200],
        evenLighter: colors.greenAccent[300],
        lightish: colors.greenAccent[400],
        main: colors.greenAccent[500],
        dark: colors.greenAccent[200],
        darker: colors.greenAccent[600],
        contrastText: '#fff',
        hoverContrastText: '#111',
      },
      info: {
        main: colors.blueAccent[500],
        dark: colors.blueAccent[700],
        light: colors.blueAccent[200],
        contrastText: '#fff',
      },
      text: {
        primary: colors.grey[900],
        secondary: colors.grey[300],
      },
      divider: mode === 'dark' ? colors.grey[800] : colors.grey[200],
      action: {
        hover: mode === 'dark' ? colors.grey[800] : colors.grey[200],
        disabled: colors.grey[200],
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          display: 'flex',
          // body: {
          //   backgroundColor: mode === 'dark' ? '#333' : '#ffffff',
          // },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 4,
            padding: '0.5rem 1rem',
            textTransform: 'none', // Disable uppercase text
            backgroundColor: colors.greenAccent[500],
            '&:hover': {
              backgroundColor: colors.greenAccent[600],
            },
            '@media (max-width:600px)': {
              // Responsive styles
              fontSize: '0.875rem',
            },
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            margin: 0,
            padding: 0,
            // maxWidth: 'lg',
            // maxHeight: '100%',
            // display: 'flex',
            // flexDirection: 'column',
            // marginTop: 4, // theme.spacing(4)
            // width: '100%',
            // height: '100%',
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: colors.greenAccent[500],
          paddingTop: '10px',
          paddingBottom: '10px',
          '&.Mui-selected': {
            color: colors.greenAccent[200],
            backgroundColor: colors.greenAccent[300],
            '&:hover': {
              backgroundColor: colors.greenAccent[700],
            },
            '& .MuiListItemIcon-root': {
              color: colors.greenAccent[400],
            },
          },
          '&:hover': {
            backgroundColor: colors.greenAccent[400],
            color: colors.greenAccent[200],
            '& .MuiListItemIcon-root': {
              color: colors.greenAccent[400],
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: backgroundA.default,
          borderRadius: `${themeColors?.borderRadius}px`,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: themeColors.colors?.grey400,
          },
          '&:hover $notchedOutline': {
            borderColor: themeColors?.primaryLight,
          },
          '&.MuiInputBase-multiline': {
            padding: 1,
          },
        },
        input: {
          fontWeight: 500,
          background: backgroundA.default,
          padding: '15.5px 14px',
          borderRadius: `${themeColors?.borderRadius}px`,
          '&.MuiInputBase-inputSizeSmall': {
            padding: '10px 14px',
            '&.MuiInputBase-inputAdornedStart': {
              paddingLeft: 0,
            },
          },
        },
        inputAdornedStart: {
          paddingLeft: 4,
        },
        notchedOutline: {
          borderRadius: `${themeColors?.customization?.borderRadius}px`,
        },
      },
    },
    spacing: (factor) => `${0.25 * factor}rem`,
    shape: {
      borderRadius: 4,
      borderRadiusLarge: 8,
    },
    zIndex: {
      appBar: 1200,
      drawer: 1100,
    },
    shadows: [
      'none',
      '0px 2px 1px -1px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.06),0px 1px 3px 0px rgba(0,0,0,0.04)', // example for theme.shadows[1]
      '0px 3px 1px -2px rgba(0,0,0,0.1),0px 2px 2px 0px rgba(0,0,0,0.06),0px 1px 5px 0px rgba(0,0,0,0.04)', // example for theme.shadows[2]
      '0px 3px 3px -2px rgba(0,0,0,0.1),0px 3px 4px 0px rgba(0,0,0,0.06),0px 1px 8px 0px rgba(0,0,0,0.04)', // example for theme.shadows[3]
      '0px 2px 4px -1px rgba(0,0,0,0.1),0px 4px 5px 0px rgba(0,0,0,0.06),0px 1px 10px 0px rgba(0,0,0,0.04)', // example for theme.shadows[4]
      '0px 3px 5px -1px rgba(0,0,0,0.1),0px 5px 8px 0px rgba(0,0,0,0.06),0px 1px 14px 0px rgba(0,0,0,0.04)', // example for theme.shadows[5]
      '0px 3px 5px -1px rgba(0,0,0,0.1),0px 6px 10px 0px rgba(0,0,0,0.06),0px 1px 18px 0px rgba(0,0,0,0.04)', // example for theme.shadows[6]
      '0px 4px 5px -2px rgba(0,0,0,0.1),0px 7px 10px 1px rgba(0,0,0,0.06),0px 2px 16px 1px rgba(0,0,0,0.04)', // example for theme.shadows[7]
      '0px 5px 5px -3px rgba(0,0,0,0.1),0px 8px 10px 1px rgba(0,0,0,0.06),0px 3px 14px 2px rgba(0,0,0,0.04)', // example for theme.shadows[8]
      '0px 5px 6px -3px rgba(0,0,0,0.1),0px 9px 12px 1px rgba(0,0,0,0.06),0px 3px 16px 2px rgba(0,0,0,0.04)', // example for theme.shadows[9]
      '0px 5px 15px rgba(0,0,0,0.1)', // example for theme.shadows[10]
    ],
    // typography: themeTypography(color),
    typography: {
      fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
      fontSize: 14,
      h1: { fontSize: '2.5rem' },
      h2: { fontSize: '2rem' },
      h3: { fontSize: '1.75rem' },
      h4: { fontSize: '1.5rem' },
      h5: { fontSize: '1.25rem' },
      h6: { fontSize: '1rem' },
      body1: { fontSize: '1rem' },
      body2: { fontSize: '0.875rem' },
      button: { fontSize: '0.875rem' },
      caption: { fontSize: '0.75rem' },
      body3: { fontSize: '0.625rem' },
      body4: { fontSize: '0.5rem' },
    },
    borders: {
      borderWidth: [0, 1, 2, 4, 8, 16, 32],
      tableCell: {
        border: '1px solid',
        borderColor: color.grey300,
      },
    },
    // STYLING FOR REUSABLE COMPONENTS
    responsiveStyles: {
      // BREAKPOINT GENERAL VALUES: UP/DOWN
      isXSmall: (breakpoints) => breakpoints.down('xs'),
      isSmall: (breakpoints) => breakpoints.down('sm'),
      isSmallMedium: (breakpoints) => breakpoints.up('sm'),
      isMedium: (breakpoints) => breakpoints.down('md'),
      isMediumLarge: (breakpoints) => breakpoints.up('md'),
      isLarge: (breakpoints) => breakpoints.up('lg'),

      // BREAKPOINT SPECIFIC VALUES: UP
      isSmUp: (breakpoints) => breakpoints.up('sm'),
      isMdUp: (breakpoints) => breakpoints.up('md'),
      isLgUp: (breakpoints) => breakpoints.up('lg'),
      isXlUp: (breakpoints) => breakpoints.up('xl'),

      // BREAKPOINT SPECIFIC VALUES: DOWN
      isSmDown: (breakpoints) => breakpoints.down('sm'),
      isMdDown: (breakpoints) => breakpoints.down('md'),
      isLgDown: (breakpoints) => breakpoints.down('lg'),
      isXlDown: (breakpoints) => breakpoints.down('xl'),

      getTypographyVariant: (breakpoints) => {
        if (breakpoints.down('xs')) return 'h4';
        if (breakpoints.down('sm')) return 'h3';
        if (breakpoints.down('md')) return 'h2';
        return 'h2';
      },

      getButtonTypographyVariant: (breakpoints) => {
        if (breakpoints.down('xs')) return 'body1';
        if (breakpoints.down('sm')) return 'body2';
        if (breakpoints.down('md')) return 'body3';
        if (breakpoints.up('lg')) return 'body3';
        return 'body1';
      },

      getButtonTypographyVariant2: (breakpoints) => {
        if (breakpoints.down('xs')) return 'h6';
        if (breakpoints.down('sm')) return 'h6';
        if (breakpoints.down('md')) return 'h6';
        if (breakpoints.up('lg')) return 'body1';
        return 'body1';
      },

      getProductGridContainerStyle: {
        // maxWidth: 'lg',
        // maxHeight: '100%',
        // display: 'flex',
        // flexDirection: 'column',
        marginTop: 4, // theme.spacing(4)
      },

      getHeaderStyle: (breakpoints) => {
        if (breakpoints.down('xs')) {
          return {
            fontWeight: 'bold',
            color: 'text.primary',
            marginBottom: 2, // theme.spacing(2)
            fontSize: '1.25rem',
          };
        }
        if (breakpoints.down('sm')) {
          return {
            fontWeight: 'bold',
            color: 'text.primary',
            marginBottom: 2, // theme.spacing(2)
            fontSize: '1.5rem',
          };
        }
        if (breakpoints.down('md')) {
          return {
            fontWeight: 'bold',
            color: 'text.primary',
            marginBottom: 2, // theme.spacing(2)
            fontSize: '1.75rem',
          };
        }
        return {
          fontWeight: 'bold',
          color: 'text.primary',
          marginBottom: 2, // theme.spacing(2)
          fontSize: '1.75rem',
        };
      },

      // getHeaderStyle: {
      //   fontWeight: 'bold',
      //   color: 'text.primary',
      //   marginBottom: 2, // theme.spacing(2)
      //   '@media (maxWidth:599.95px)': {
      //     fontSize: '1.25rem',
      //   },
      //   '@media (minWidth:600px) and (maxWidth:899.95px)': {
      //     fontSize: '1.5rem',
      //   },
      //   '@media (minWidth:900px)': {
      //     fontSize: '1.75rem',
      //   },
      // },

      // getStyledGridStyle: {
      //   '@media (maxWidth:599.95px)': {
      //     margin: 0.5, // theme.spacing(0.5)
      //   },
      //   '@media (minWidth:600px) and (maxWidth:1199.95px)': {
      //     margin: 1, // theme.spacing(1)
      //   },
      //   '@media (minWidth:1200px)': {
      //     margin: 2, // theme.spacing(2)
      //   },
      //   '@media (minWidth:1800px)': {
      //     margin: 2, // theme.spacing(2)
      //   },
      // },

      // getStyledGridItemStyle: {
      //   display: 'flex',
      //   flexDirection: 'column',
      //   alignItems: 'stretch',
      //   '@media (maxWidth:599.95px)': {
      //     padding: 1, // theme.spacing(1)
      //   },
      //   '@media (minWidth:600px)': {
      //     padding: 0.25, // theme.spacing(0.25)
      //   },
      //   '@media (minWidth:1200px)': {
      //     padding: 1, // theme.spacing(1)
      //   },
      //   '@media (minWidth:1800px)': {
      //     padding: 2, // theme.spacing(2)
      //   },
      // },

      getIconForTitle: (title) => {
        switch (title) {
          case 'Deck Builder':
            return <DeckOfCardsIcon />;
          case 'Collection Tracker':
            return <MoneyIcon />;
          case 'Store':
            return <ChartsIcon />;
          default:
            return null;
        }
      },
    },
    genericButtonStyles: {
      contextText: {
        color: 'text.primary', // Use color from theme
        fontWeight: 'bold',
        fontSize: '0.8rem',
        '@media (min-width:600px)': {
          fontSize: '1rem',
        },
      },
      addButton: {
        color: 'success.contrastText', // Use color from theme
        backgroundColor: 'success.main', // Use color from theme
        '&:hover': {
          backgroundColor: 'success.darker', // Use color from theme
        },
        marginRight: 0.5, // Use spacing from theme
      },
      removeButton: {
        color: 'error.contrastText', // Use color from theme
        backgroundColor: 'error.main', // Use color from theme
        '&:hover': {
          backgroundColor: 'error.dark', // Use color from theme
        },
        marginRight: 0.5, // Use spacing from theme
      },
      actionRow: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        flexWrap: 'nowrap',
      },
      featureCardButton: {
        color: 'success.contrastText', // Use color from theme
      },
      circleButtonContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        padding: 1, // Use spacing from theme
        gap: 1, // Use spacing from theme
      },
    },
    pageStyles: {
      // styles.js
      homeCardStyles: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      },
      homeTypographyStyles: {
        fontWeight: 'bold',
        marginBottom: '1rem',
        fontSize: '2.5rem',
        lineHeight: '1.2',
        letterSpacing: 'normal',
      },
      homePaperStyles: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        mx: 'auto',
        padding: '1rem',
        background: backgroundC.dark,
        maxWidth: specialBreakpoints.isLgUp ? '100%' : '100%', // Adjust width based on screen size
      },
      homeCardAnimationBoxStyles: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '100%',
        maxHeight: '100%',
        padding: '1rem',
      },
      homeCardChartBoxStyles: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: specialBreakpoints.isMdUp ? '50%' : '100%', // Adjust width based on screen size
        maxHeight: '100%',
      },
    },
    // LAYOUTS
    skeletonLayouts: {
      tertiaryContent: {
        xs: 12,
        sm: 12,
        md: 12,
        gap: 3,
        baseSkeletons: [
          { variant: 'rectangular', height: 60 },
          { variant: 'text', width: '80%' },
          { variant: 'text', width: '70%' },
          { variant: 'text', width: '60%' },
        ],
      },
      secondaryContent: {
        xs: 12,
        sm: 6,
        md: 6,
        gap: 2,
        baseSkeleton: { variant: 'rectangular', height: 200 },
      },
      mainContentFeatureCard: {
        xs: 12,
        sm: 12,
        md: 4,
        gap: 2,
        baseSkeletons: [
          { variant: 'rectangular', height: 180 },
          { variant: 'text' },
          { variant: 'text' },
          { variant: 'text' },
        ],
      },
    },
  };
};
// chart: {
//   axis: {
//     domain: {
//       line: {
//         stroke: colors.greenAccent[800],
//         strokeWidth: 1,
//       },
//     },
//     ticks: {
//       line: {
//         stroke: colors.greenAccent[700],
//         strokeWidth: 1,
//       },
//       text: {
//         fill: colors.greenAccent[900],
//         fontSize: 12,
//       },
//     },
//   },
//   grid: {
//     line: {
//       stroke: colors.greenAccent[200],
//       strokeWidth: 1,
//     },
//   },
//   legends: {
//     text: {
//       fill: colors.greenAccent[800],
//       fontSize: 12,
//     },
//   },
//   tooltip: {
//     container: {
//       background: colors.greenAccent[100],
//       color: colors.greenAccent[800],
//       fontSize: 12,
//       borderRadius: 4,
//       boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
//     },
//   },
//   points: {
//     borderColor: colors.greenAccent[800],
//   },
// },
