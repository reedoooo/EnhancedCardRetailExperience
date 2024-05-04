import React, { useCallback, useEffect, useState } from 'react';
import { useMode } from 'context';
import DashBoardLayout from 'layout/REUSABLE_COMPONENTS/utils/layout-utils/DashBoardLayout';
import MDBox from 'layout/REUSABLE_COMPONENTS/MDBOX';
import { Grid } from '@mui/material';
import CollectionDialog from 'layout/dialogs/CollectionDialog';
import useDialogState from 'context/hooks/useDialogState';
import DashboardBox from 'layout/REUSABLE_COMPONENTS/utils/layout-utils/DashboardBox';
import StatBoard from './CollectionsViewLayout/StatBoard';
import { Tab, Tabs } from '@mui/material';
import CollectionPortfolioHeader from './PortfolioViewLayout/CollectionPortfolioHeader';
import PageHeader from 'layout/REUSABLE_COMPONENTS/utils/layout-utils/PageHeader';
import useUserData from 'context/state/useUserData';
import LoadingOverlay from 'layout/REUSABLE_COMPONENTS/utils/system-utils/LoadingOverlay';
import useManager from 'context/state/useManager';
import CollectionsViewLayout from './CollectionsViewLayout';
import PortfolioViewLayout from './PortfolioViewLayout';
import { useFormManagement } from 'context/hooks';

const CollectionsView = ({ openDialog, handleTabAndSelect }) => {
  const { theme } = useMode();
  const { setActiveFormSchema } = useFormManagement();
  const { user } = useUserData();
  return (
    <DashBoardLayout>
      <MDBox theme={theme}>
        <DashboardBox sx={{ p: theme.spacing(2) }}>
          <PageHeader
            title="Collection Portfolio"
            description={`Last updated: ${new Date().toLocaleDateString(
              'en-US',
              {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }
            )}`}
            buttonText="Add New Collection"
            headerName="Collection Portfolio"
            username={user.username}
            handleOpenDialog={() => {
              setActiveFormSchema('addCollectionForm');
              openDialog('isAddCollectionDialogOpen');
            }}
            action={{ route: '', tooltip: 'Add Collection' }}
          />
        </DashboardBox>
        <DashboardBox sx={{ px: theme.spacing(2) }}>
          <StatBoard />
        </DashboardBox>
        <DashboardBox sx={{ px: theme.spacing(2), py: theme.spacing(2) }}>
          <CollectionsViewLayout
            handleSelectAndShowCollection={handleTabAndSelect}
            openNewDialog={() => openDialog('isEditCollectionDialogOpen')}
          />
        </DashboardBox>
      </MDBox>
    </DashBoardLayout>
  );
};
const PortfolioView = ({ handleBackToCollections, selectedCollection }) => (
  <DashBoardLayout>
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <CollectionPortfolioHeader
          onBack={handleBackToCollections}
          collection={selectedCollection}
        />
      </Grid>
      <Grid item xs={12}>
        <PortfolioViewLayout />
      </Grid>
    </Grid>
  </DashBoardLayout>
);
const CollectionPortfolio = () => {
  const { theme } = useMode();
  const {
    collections,
    handleSelectCollection,
    hasFetchedCollections,
    fetchCollections,
  } = useManager();
  const { dialogState, openDialog, closeDialog } = useDialogState();
  const [activeTab, setActiveTab] = useState(0);
  const selectedCollectionId = localStorage.getItem('selectedCollectionId');
  useEffect(() => {
    if (!hasFetchedCollections) {
      fetchCollections();
    }
  }, [hasFetchedCollections]);
  const tabs = [
    <Tab
      label="Collections"
      value={0}
      key={selectedCollectionId === null ? 0 : 1}
    />,
    ...(selectedCollectionId
      ? [
          <Tab
            label="Portfolio View"
            value={1}
            key={`${selectedCollectionId}-collectionId`}
          />,
        ]
      : []),
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    if (newValue === 0) {
      handleSelectCollection(null);
    } else {
      handleSelectCollection(
        collections.find(
          (collection) => collection._id === selectedCollectionId
        )
      );
    }
  };

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'selectedCollectionId') {
        const updatedCollectionId = event.newValue;
        const updatedCollection = collections.find(
          (collection) => collection._id === updatedCollectionId
        );
        if (updatedCollection) {
          // setActiveTab(collections.indexOf(updatedDeck));
          handleSelectCollection(updatedCollection);
        }
      }
      // if (
      //   event.key === 'selectedCollection' &&
      //   event.newValue &&
      //   JSON.parse(event.newValue) !== event.oldValue
      // ) {
      //   const updatedCollection = JSON.parse(event.newValue);
      //   handleSelectCollection(updatedCollection);
      // }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [collections, handleSelectCollection]);

  if (!collections) {
    return <LoadingOverlay />;
  }

  return (
    <MDBox theme={theme} sx={{ flexGrow: 1 }}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        aria-label="collection portfolio tabs"
        sx={{
          justifyContent: 'space-between',
          display: 'flex',
          alignItems: 'center',
          p: theme.spacing(4),
        }}
      >
        {tabs}
      </Tabs>
      {activeTab === 0 && (
        <CollectionsView
          openDialog={openDialog}
          handleTabAndSelect={(collection) => {
            handleSelectCollection(collection);
            setActiveTab(1); // Switch to Portfolio View tab
          }}
        />
      )}
      {activeTab === 1 && selectedCollectionId && (
        <PortfolioView
          // selectedCollection={collections?.find(
          //   (c) => c._id === selectedCollectionId
          // )}
          handleBackToCollections={() => setActiveTab(0)}
        />
      )}
      {dialogState.isAddCollectionDialogOpen && (
        <CollectionDialog
          open={dialogState.isAddCollectionDialogOpen}
          onClose={() => closeDialog('isAddCollectionDialogOpen')}
          collectionData={null}
          isNew={true}
        />
      )}
    </MDBox>
  );
};

export default CollectionPortfolio;
