import React, { useState } from 'react';
import { useMode } from '../../context';
import MDBox from '../REUSABLE_COMPONENTS/MDBOX';
import PageLayout from '../Containers/PageLayout';
import { PortfolioBoxA } from '../../pages/pageStyles/StyledComponents';
import SearchComponent from '../../components/forms/search/SearchComponent';
import { Card } from '@mui/material';

const StoreSearch = () => {
  const { theme } = useMode();
  return (
    <PageLayout>
      <MDBox
        py={3}
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <PortfolioBoxA
          theme={theme}
          sx={{
            flexGrow: 1,
          }}
        >
          <SearchComponent pageContext="Cart" />
        </PortfolioBoxA>
      </MDBox>
    </PageLayout>
  );
};

export default StoreSearch;
