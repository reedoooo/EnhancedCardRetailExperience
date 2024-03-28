import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useMode } from '../../context';
import DashboardLayout from '../REUSABLE_COMPONENTS/DashBoardLayout';
import MDBox from '../REUSABLE_COMPONENTS/MDBOX';
import { PortfolioBoxA } from '../../pages/pageStyles/StyledComponents';
import { Box, Card, Grid } from '@mui/material';
import CollectionDialog from '../../components/dialogs/CollectionDialog';
import collectionPortfolioData from './data/collectionPortfolioData';
import ChartGridLayout from './collectionGrids/ChartGridLayout';
import CollectionPortfolioHeader from './sub-components/CollectionPortfolioHeader';
import SelectCollectionList from './collectionGrids/collections-list/SelectCollectionList';
import useSelectedCollection from '../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import useDialogState from '../../context/hooks/useDialogState';
import SelectCollectionHeader from './collectionGrids/collections-list/SelectCollectionHeader';
import DashboardBox from '../REUSABLE_COMPONENTS/DashboardBox';
import StatBoard from './collectionGrids/collections-list/StatBoard';
import { Tab, Tabs } from '@mui/material';
import RCHeader from '../REUSABLE_COMPONENTS/RCHeader';
import preparePortfolioTableData from './data/portfolioData';

const CollectionsView = ({ openDialog, handleTabAndSelect }) => {
  const { theme } = useMode();
  return (
    <DashboardLayout>
      <MDBox theme={theme}>
        <DashboardBox sx={{ p: theme.spacing(2) }}>
          <SelectCollectionHeader
            openNewDialog={() => openDialog('isAddCollectionDialogOpen')}
          />
        </DashboardBox>
        <DashboardBox sx={{ px: theme.spacing(2) }}>
          <StatBoard />
        </DashboardBox>
        <DashboardBox sx={{ px: theme.spacing(2), py: theme.spacing(2) }}>
          <SelectCollectionList
            handleSelectAndShowCollection={handleTabAndSelect}
            openDialog={() => openDialog('isEditCollectionDialogOpen')}
          />
        </DashboardBox>
      </MDBox>
    </DashboardLayout>
  );
};

const PortfolioView = ({
  selectedCollection,
  columns,
  data,
  handleBackToCollections,
  allCollections,
}) => (
  <DashboardLayout>
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <CollectionPortfolioHeader
          onBack={handleBackToCollections}
          collection={selectedCollection}
          allCollections={allCollections}
        />
      </Grid>
      <Grid item xs={12}>
        <ChartGridLayout
          selectedCards={selectedCollection?.cards}
          columns={columns}
          data={data}
        />
      </Grid>
    </Grid>
  </DashboardLayout>
);
const CollectionPortfolio = () => {
  const { theme } = useMode();
  const {
    handleBackToCollections,
    selectedCollectionId,
    selectedCollection,
    allCollections,
    handleSelectCollection,
  } = useSelectedCollection();
  const { dialogState, openDialog, closeDialog } = useDialogState();
  // const { columns, data } = collectionPortfolioData(selectedCollection?.cards);
  const { columns, data } = preparePortfolioTableData(
    selectedCollection?.cards
  );

  const [activeTab, setActiveTab] = useState(0);
  const tabs = [<Tab label="Collections" value={0} key={'collections-tab'} />];
  if (selectedCollectionId) {
    tabs.push(<Tab label="Portfolio View" value={1} key={'portfolio-tab'} />);
  }
  const handleTabChange = (event, newValue) => {
    if (newValue === 0 || (newValue === 1 && selectedCollectionId)) {
      setActiveTab(newValue);
    }
  };
  const handleSelectAndShowCollection = useCallback(
    (collection) => {
      handleSelectCollection(collection); // Assume this function sets the selectedCollectionId
      setActiveTab(1); // Switch to Portfolio View tab
      console.log('DEBUG LOG, ', {
        selectedCollectionId: selectedCollectionId,
        selectedCollection: selectedCollection,
      });
    },
    [handleSelectCollection]
  );
  return (
    <MDBox theme={theme} sx={{ flexGrow: 1 }}>
      <MDBox
        sx={{
          justifyContent: 'space-between',
          display: 'flex',
          alignItems: 'center',
          p: theme.spacing(4),
        }}
      >
        <RCHeader title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <MDBox>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="collection portfolio tabs"
          >
            {tabs}
          </Tabs>
        </MDBox>
      </MDBox>
      {activeTab === 0 && (
        <CollectionsView
          openDialog={openDialog}
          handleTabAndSelect={handleSelectAndShowCollection}
        />
      )}

      {activeTab === 1 && selectedCollectionId && (
        <PortfolioView
          selectedCollection={selectedCollection}
          columns={columns}
          data={data}
          handleBackToCollections={() => {
            // handleBackToCollections();
            setActiveTab(0); // Switch back to collections tab when going back
          }}
          allCollections={allCollections}
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
// const CollectionPortfolio = () => {
//   const { theme } = useMode();
//   const { Transitions } = theme;
//   const {
//     handleBackToCollections,
//     selectedCollectionId,
//     selectedCollection,
//     allCollections,
//     showCollections,
//   } = useSelectedCollection();
//   const { dialogState, openDialog, closeDialog } = useDialogState({
//     isAddCollectionDialogOpen: false,
//     isSelectionErrorDialogOpen: false,
//   });

//   const { columns, data } = collectionPortfolioData(selectedCollection?.cards);

//   return (
//     <MDBox
//       py={2}
//       px={1}
//       theme={theme}
//       sx={{
//         flexGrow: 1,
//       }}
//     >
//       {!selectedCollectionId ? (
//         <Transitions
//           type="fade"
//           in={true}
//           mountOnEnter
//           unmountOnExit
//           sx={{
//             hidden: !showCollections,
//           }}
//         >
//           <DashboardLayout>
//             <MDBox theme={theme}>
//               <DashboardBox
//                 sx={{
//                   p: theme.spacing(2),
//                 }}
//               >
//                 <SelectCollectionHeader
//                   openNewDialog={() => openDialog('isAddCollectionDialogOpen')}
//                 />
//               </DashboardBox>
//               <DashboardBox
//                 sx={{
//                   px: theme.spacing(2),
//                 }}
//               >
//                 <StatBoard />
//               </DashboardBox>
//               <DashboardBox
//                 sx={{
//                   px: theme.spacing(2),
//                   py: theme.spacing(2),
//                 }}
//               >
//                 <SelectCollectionList
//                   openDialog={() => openDialog('isEditCollectionDialogOpen')}
//                 />
//               </DashboardBox>

//               {dialogState.isAddCollectionDialogOpen && (
//                 <CollectionDialog
//                   open={dialogState.isAddCollectionDialogOpen}
//                   onClose={() => closeDialog('isAddCollectionDialogOpen')}
//                   collectionData={null}
//                   isNew={true}
//                 />
//               )}
//             </MDBox>
//           </DashboardLayout>
//         </Transitions>
//       ) : (
//         <Transitions
//           type="fade"
//           in={selectedCollectionId}
//           mountOnEnter
//           unmountOnExit
//         >
//           <DashboardLayout>
//             <Grid container spacing={1}>
//               <Grid item xs={12}>
//                 <CollectionPortfolioHeader
//                   onBack={handleBackToCollections}
//                   collection={selectedCollection}
//                   allCollections={allCollections}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 {/* <StatisticsCardGrid selectedCollection={selectedCollection} /> */}
//               </Grid>
//               <Grid item xs={12}>
//                 <ChartGridLayout
//                   selectedCards={selectedCollection?.cards}
//                   columns={columns}
//                   data={data}
//                 />
//               </Grid>
//             </Grid>
//           </DashboardLayout>
//         </Transitions>
//       )}
//     </MDBox>
//   );
// };

// export default CollectionPortfolio;
