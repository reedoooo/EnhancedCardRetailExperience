// DeckSearch.js
import React, { useEffect, useState } from 'react';
import {
  Collapse,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
} from '@mui/material';
import { useGetSearchData } from '../../../context/hooks/useGetSearchData';
import SearchResults from './SearchResults';
import MDBox from '../../../layout/REUSABLE_COMPONENTS/MDBOX';
import SearchForm from '../SearchForm';
import MDTypography from '../../../layout/REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
import SettingsIcon from '@mui/icons-material/Settings';
import { useCardStore, useMode } from '../../../context';
import useLocalStorage from '../../../context/hooks/useLocalStorage';
import { useCardStoreHook } from '../../../context/hooks/useCardStore';
import { useConfiguratorContext } from '../../../context';
const SearchComponent = (pageContext) => {
  const { theme } = useMode();
  const itemsPerPage = 12;
  const [searchBarFocused, setSearchBarFocused] = useState(false);
  const { loadingSearchResults, searchSettings, setSearchSettings } =
    useCardStoreHook();
  const { toggleConfigurator } = useConfiguratorContext();
  const [searchData, setSearchData] = useLocalStorage('searchData', []);
  const initialData = JSON.parse(localStorage.getItem('searchData') || '[]');
  useEffect(() => {
    const handleStorageChange = () => {
      const newData = JSON.parse(localStorage.getItem('searchData') || '[]');
      if (newData.length !== searchData.length) {
        setSearchData(newData);
      }
    };
    window.addEventListener('local-storage', handleStorageChange);
    handleStorageChange();

    return () =>
      window.removeEventListener('local-storage', handleStorageChange);
  }, [searchData, setSearchData]); // Add dependencies to useEffect
  return (
    <Grid container spacing={2} direction="column">
      <Grid item xs={12}>
        <Paper
          elevation={3}
          sx={{
            padding: theme.spacing(2),
            borderRadius: 2,
            background: theme.palette.backgroundE.light,
            boxShadow: 3,
            margin: 'auto',
            width: '100%',
            maxWidth: 'md',
            '&:hover': {
              boxShadow: 6,
            },
          }}
        >
          <MDBox
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: theme.spacing(2),
            }}
          >
            <MDTypography
              variant="h4"
              align="left"
              sx={{
                fontWeight: 'bold',
                color: theme.palette.backgroundB.dark,
                textTransform: 'uppercase',
              }}
            >
              Search Cards
            </MDTypography>
            <IconButton
              aria-label="settings"
              onClick={toggleConfigurator}
              size="large"
            >
              <SettingsIcon />
            </IconButton>
          </MDBox>
          <Container
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: theme.spacing(2),
            }}
          >
            {/* eslint-disable-next-line max-len */}
            <SearchForm
              onFocus={() => setSearchBarFocused(true)}
              onBlur={() => setSearchBarFocused(false)}
            />
          </Container>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <SearchResults
          isLoading={loadingSearchResults}
          searchData={searchData}
          uniqueCards={searchData}
          pageContext={pageContext}
          itemsPerPage={itemsPerPage}
        />
      </Grid>
    </Grid>
  );
};

export default SearchComponent;
