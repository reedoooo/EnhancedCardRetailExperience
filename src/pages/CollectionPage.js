import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import CollectionPortfolio from '../layout/collection';
import PageLayout from '../layout/REUSABLE_COMPONENTS/layout-utils/PageLayout';
import useManager from '../context/useManager';

const CollectionPage = () => {
  const { fetchCollections, hasFetchedCollections, compileCollectionMetaData } =
    useManager();

  useEffect(() => {
    if (!hasFetchedCollections) {
      fetchCollections();
    }
  }, []);

  useEffect(() => {
    compileCollectionMetaData();
  }, []);

  return (
    <PageLayout backCol={true}>
      <Grid item xs={12}>
        <CollectionPortfolio />
      </Grid>
    </PageLayout>
  );
};

export default CollectionPage;
