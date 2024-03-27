import React from 'react';
import { rgba } from 'polished';

const SimpleButton = ({
  theme,
  children,
  isPrimary,
  isAccent,
  isDefault,
  isDisabled,
  customColor,
  customTextColor,
  customSize,
  ...rest
}) => {
  const calculateStyles = (size) => {
    switch (size) {
      case 'sm':
        return {
          width: '75px',
          // p: '1rem',
          p: '0.5rem 0.75rem',
          // m: '0.5rem',
          fontSize: '0.875rem',
        };
      case 'md':
        return {
          width: '100px',
          padding: '0.75rem 1rem',
          fontSize: '1rem',
        };
      default:
        return {
          width: '140px',
          padding: '1rem 1.25rem',
          fontSize: '1.125rem',
        };
    }
  };
  const baseStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minWidth: calculateStyles(customSize).width,
    padding: calculateStyles(customSize).padding,
    // minWidth: customSize === 'md' ? 100 : customSize === 'sm' ? 75 : 140,
    // padding: `1.035rem ${theme.lenMd1}`,
    borderRadius: theme.borderRadius,
    fontSize: calculateStyles(customSize).fontSize,

    transitionProperty: 'color, background, box-shadow',
    transitionDuration: '0.35s',
    background: !customColor ? theme.colorDefaultBackground : customColor,
    color: !customTextColor ? theme.colorDefaultText : customTextColor,
    boxShadow: isDefault
      ? `0 0 0 4px ${rgba(theme.colorDefaultBackground || 'white', 0.74)}`
      : 'none',
    ...(isPrimary && {
      background: theme.colorPrimary,
      color: theme.colorPrimaryText,
      boxShadow: `0 0 0 4px ${rgba(theme.colorPrimary || 'white', 0.4)}`,
    }),
    ...(isAccent && {
      background: theme.colorAccent,
      color: theme.colorAccentText,
      boxShadow: `0 0 0 4px ${rgba(theme.colorAccent || 'white', 0.4)}`,
    }),
    ...(isDisabled && {
      background: theme.colorDisabledBackground,
      color: theme.colorDisabledText,
      cursor: 'not-allowed',
    }),
  };

  const buttonHoverStyle = {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: theme.borderRadius,
    background: customColor
      ? rgba(customColor, 0.15) // Lighter shade of customColor if provided
      : 'rgba(0, 0, 0, 0.075)',
    opacity: 0,
    pointerEvents: 'none',
    transition: 'opacity 0.35s',
  };

  const buttonTextStyle = {
    position: 'relative',
    zIndex: 2,
  };

  return (
    <button style={baseStyle} {...rest} disabled={isDisabled}>
      <span style={buttonHoverStyle} />
      <span style={buttonTextStyle}>{children}</span>
    </button>
  );
};

export default SimpleButton;