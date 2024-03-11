import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useCollectionStore } from '../CollectionContext/CollectionContext';
import { defaultChartConstants, defaultContextValue } from '../../constants';
const { TIME_RANGES, SELECTED_TIME_RANGE, TIME_RANGE_PROPS, TIME_RANGES_KEYS } =
  defaultChartConstants;

const ChartContext = createContext(defaultContextValue.CHART_CONTEXT);

export const ChartProvider = ({ children }) => {
  const { selectedCollection } = useCollectionStore();

  const contextValue = useMemo(
    () => ({
      // timeRange: selectedCollection.averagedChartData[],
      // timeRanges: TIME_RANGES,
      // tickValues: tickValues,
      // xFormat: xFormat,

      nivoChartData: selectedCollection?.nivoChartData,
      newNivoChartData: selectedCollection?.newNivoChartData,
      muiChartData: selectedCollection?.muiChartData,
      nivoTestData: selectedCollection?.nivoTestData,
      // setTimeRange,
    }),
    [
      // timeRange,
      // tickValues,
      // xFormat,
      selectedCollection?.nivoChartData,
      selectedCollection?.newNivoChartData,
      selectedCollection?.muiChartData,
      selectedCollection?.nivoTestData,
      // setTimeRange,
    ]
  );
  return (
    <ChartContext.Provider value={contextValue}>
      {children}
    </ChartContext.Provider>
  );
};

export const useChartContext = () => {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error('useChartContext must be used within a ChartProvider');
  }
  return context;
};
