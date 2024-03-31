// /* eslint-disable @typescript-eslint/no-empty-function */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { defaultContextValue } from '../../constants';
import useManageCookies from '../../hooks/useManageCookies';
export const CollectionContext = createContext(
  defaultContextValue.COLLECTION_CONTEXT
);

export const CollectionProvider = ({ children }) => {
  const { addCookie, getCookie, deleteCookie } = useManageCookies();
  const { isLoggedIn, authUser, userId } = getCookie([
    'isLoggedIn',
    'authUser',
    'userId',
  ]);
  // const {
  //   selectedCollection,
  //   allCollections,
  //   showCollections,
  //   selectedCollectionId,
  // } = useSelectedCollection();
  // const {
  //   fetchCollections,
  //   createNewCollection,
  //   deleteCollection,
  //   updateCollection,
  //   addCardsToCollection,
  //   removeCardsFromCollection,
  //   selectedCollectionError,
  //   error,
  //   hasFetchedCollections,
  //   handleError,
  //   setSelectedCollectionError,
  // } = useCollectionManager();

  // useEffect(() => {
  //   // Check if collections need to be fetched for the logged-in user
  //   if (!hasFetchedCollections && isLoggedIn && userId) {
  //     fetchCollections();
  //   }
  // }, []);

  const contextValue = useMemo(
    () => ({
      // ...selectedCollection,
      // selectedCollection: selectedCollection,
      // selectedCollectionId,
      // allCollections,
      // showCollections,
      // error,
      // selectedCollectionError,
    }),
    []
  );

  useEffect(() => {
    console.log('COLLECTION CONTEXT:', contextValue);
  }, [contextValue]);

  return (
    <CollectionContext.Provider value={contextValue}>
      {children}
    </CollectionContext.Provider>
  );
};

export const useCollectionStore = () => {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error(
      'useCollectionStore must be used within a CollectionProvider'
    );
  }
  return context;
};
// const logContextValue = (context) => {
//   console.log('COLLECTION CONTEXT:', {
//     selectedCollection: context?.selectedCollection,
//     selectedCards: context?.selectedCollection?.cards,
//     allCollections: context?.allCollections,
//     cards: context.cards,
//     totalPrice: context.totalPrice,
//     totalQuantity: context.totalQuantity,
//     currentChartDataSets2: context.currentChartDataSets2,
//     collectionPriceHistory: context.collectionPriceHistory,
//     lastSavedPrice: context.lastSavedPrice,
//     latestPrice: context.latestPrice,
//     allXYValues: context.allXYValues,
//   });
// };
