import { useState, useMemo, createContext, useEffect } from 'react';
import { createTheme } from '@mui/material';
import { themeSettings } from 'assets/themeSettings';
import { useManageCookies } from 'context';

export const ColorModeContext = createContext({
  mode: 'dark',
  colorMode: {},
  theme: createTheme(themeSettings('dark')), // Default theme is dark mode
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleColorMode: () => {},
});

export const ColorModeProvider = ({ children }) => {
  const { addCookies, getCookie } = useManageCookies();
  const { initialMode } = getCookie(['colorMode']) || 'dark';
  const [mode, setMode] = useState(initialMode);

  useEffect(() => {
    addCookies(['colorMode'], [mode], { path: '/' });
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        const newMode = mode === 'dark' ? 'dark' : 'light';
        setMode(newMode);
        addCookies(['colorMode'], [newMode], { path: '/' });
      },
    }),
    [mode]
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const contextValue = {
    mode,
    colorMode,
    theme,
    setMode: (newMode) => {
      setMode(newMode);
      addCookies(['colorMode'], [newMode], { path: '/' });
    },
    toggleColorMode: colorMode.toggleColorMode,
  };

  return (
    <ColorModeContext.Provider value={contextValue}>
      {children}
    </ColorModeContext.Provider>
  );
};

export default ColorModeProvider;
