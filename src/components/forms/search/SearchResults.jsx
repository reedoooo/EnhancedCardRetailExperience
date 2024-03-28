import React, { useMemo } from 'react';
import { Box, Grid } from '@mui/material';
import useGridItems from '../../../context/hooks/useGridItems';
import usePagination from '../../../context/hooks/usePagination';
import LoadingIndicator from '../../../layout/LoadingIndicator';
import MDBox from '../../../layout/REUSABLE_COMPONENTS/MDBOX';
import PaginationComponent from './PaginationComponent';

const SearchResults = ({
  uniqueCards,
  isLoading,
  pageContext,
  itemsPerPage,
  searchData,
}) => {
  const { pageCount, data, paginatedData, currentPage, setCurrentPage } =
    usePagination(uniqueCards, itemsPerPage);
  const renderItems = useGridItems({
    cards: uniqueCards,
    isLoading,
    pageContext,
    itemsPerPage,
    type: 'search',
  });

  if (isLoading) return <LoadingIndicator />;
  return (
    <React.Fragment>
      <MDBox>
        <Grid
          container
          justifyContent="center"
          spacing={1}
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          {renderItems}
        </Grid>
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <PaginationComponent
              pageOptions={searchData}
              pageCount={pageCount}
              pageIndex={currentPage}
              currentPage={currentPage}
              gotoPage={setCurrentPage}
              canPreviousPage={currentPage > 0}
              canNextPage={currentPage < pageCount - 1}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
              pageContext={pageContext}
              isLoading={isLoading}
              searchData={searchData}
            />
          </Grid>
        </Grid>
      </MDBox>
    </React.Fragment>
  );
};

export default SearchResults;
