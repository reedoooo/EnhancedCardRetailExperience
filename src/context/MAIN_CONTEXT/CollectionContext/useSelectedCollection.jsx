import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import useInitializeCollections from './hooks/useInitializeCollections';
import useCollectionSelection from './hooks/useCollectionSelection';
import {
  updateCollectionField,
  removeCollection,
  refreshCollections,
} from './utils/collectionUpdateUtils';

const useSelectedCollection = () => {
  const [collections, setCollections] = useInitializeCollections();
  const { selectedCollectionId, customError, handleSelectCollection } =
    useCollectionSelection(collections, setCollections);

  // Refs for previous data to compare on update
  const prevSelectedCollectionIdRef = useRef(null);
  const prevCollectionsRef = useRef();

  useEffect(() => {
    prevSelectedCollectionIdRef.current = selectedCollectionId;
  }, [selectedCollectionId]);

  useEffect(() => {
    if (prevCollectionsRef.current) {
      console.log('Collections data updated:', collections);
    }
    prevCollectionsRef.current = collections;
  }, [collections]);

  const getSelectedCollection = useMemo(() => {
    const selectedCollection = collections.byId[collections.selectedId];
    if (!selectedCollection) {
      // Set an error if collection is not found
      return collections.byId[collections.allIds[0]];
    }
    return selectedCollection;
  }, [collections.byId, collections.selectedId]);

  const handleResetCollection = useCallback(() => {
    setCollections((prev) => ({
      ...prev,
      selectedId: null,
      showCollections: true,
    }));
  }, [setCollections]);

  const handleUpdateCollectionField = useCallback(
    (collectionId, fieldPath, value) => {
      updateCollectionField(setCollections, collectionId, fieldPath, value);
    },
    [setCollections]
  );

  const handleRemoveCollection = useCallback(
    (collectionId) => {
      removeCollection(setCollections, collectionId);
    },
    [setCollections]
  );

  const handleRefreshCollections = useCallback(
    (updatedCollections) => {
      refreshCollections(setCollections, updatedCollections);
    },
    [setCollections]
  );
  const handleAddCardToCollection = useCallback(
    (collectionId, newCard) => {
      const updatedCards = [...collections.byId[collectionId].cards, newCard];
      handleUpdateCollectionField(collectionId, 'cards', updatedCards);
    },
    [collections.byId, handleUpdateCollectionField]
  );

  const handleRemoveCardFromCollection = useCallback(
    (collectionId, cardId) => {
      const filteredCards = collections.byId[collectionId].cards.filter(
        (card) => card.id !== cardId
      );
      handleUpdateCollectionField(collectionId, 'cards', filteredCards);
    },
    [collections.byId, handleUpdateCollectionField]
  );

  // Return values matching the initial code
  return {
    selectedCollectionId:
      collections.selectedId || prevSelectedCollectionIdRef.current,
    selectedCollection: getSelectedCollection || {},
    allIds: collections.allIds || [],
    allCollections: Object.values(collections.byId) || [],
    showCollections: !!collections.showCollections,
    byId: collections.byId || {},
    handleSelectCollection,
    customError,
    refreshCollections: handleRefreshCollections,
    removeCollection: handleRemoveCollection,
    resetCollection: handleResetCollection,
    updateCollectionField: handleUpdateCollectionField,
    addCardToCollection: handleAddCardToCollection,
    removeCardFromCollection: handleRemoveCardFromCollection,
  };
};

export default useSelectedCollection;

// import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import useLocalStorage from '../../hooks/useLocalStorage';
// import { defaultValues, constants } from '../../simplified_constants';
// const { SELECTED_COLLECTION_ID } = constants;

// import _set from 'lodash/set';
// function useSelectedCollection() {
//   const [collections, setCollections] = useLocalStorage(
//     'collections',
//     defaultValues.defaultCollections
//   );
//   useEffect(() => {
//     if (!collections || collections?.allIds?.length === 0) {
//       const updatedById = { ...defaultValues.defaultCollections.byId };
//       Object.keys(updatedById).forEach((id) => {
//         const collection = updatedById[id];
//         if (
//           collection.averagedChartData &&
//           collection.averagedChartData['24hr']
//         ) {
//           updatedById[id].selectedChartData =
//             collection.averagedChartData['24hr'];
//           console.log(
//             'UPDATED SELECTED CHART DATA',
//             collection.averagedChartData['24hr']
//           );
//         }
//       });
//       setCollections({
//         ...defaultValues.defaultCollections,
//         byId: updatedById,
//       });
//     }
//   }, []);
//   useEffect(() => {
//     if (
//       collections.allIds.includes(SELECTED_COLLECTION_ID) &&
//       collections.allIds.length > 1
//     ) {
//       setCollections((prev) => {
//         const updatedAllIds = prev.allIds.filter(
//           (id) => id !== SELECTED_COLLECTION_ID
//         );
//         const updatedById = { ...prev.byId };
//         delete updatedById[SELECTED_COLLECTION_ID];

//         return {
//           ...prev,
//           allIds: updatedAllIds,
//           byId: updatedById,
//           // Update selectedId to the first collection if the selected collection is removed
//           selectedId:
//             prev.selectedId === SELECTED_COLLECTION_ID
//               ? updatedAllIds[0]
//               : prev.selectedId,
//         };
//       });
//     }
//   }, [collections.allIds, collections.byId, setCollections]);
//   // useEffect(() => {
//   //   // Check if the collections need initialization or if the default collection should be filtered out
//   //   if (
//   //     !collections ||
//   //     collections.allIds.length === 0 ||
//   //     collections.allIds.includes(SELECTED_COLLECTION_ID)
//   //   ) {
//   //     const updatedById = { ...defaultValues.defaultCollections.byId };
//   //     Object.keys(updatedById).forEach((id) => {
//   //       const collection = updatedById[id];
//   //       // Check and assign chart data if available
//   //       if (
//   //         collection.averagedChartData &&
//   //         collection.averagedChartData['24hr']
//   //       ) {
//   //         updatedById[id].selectedChartData =
//   //           collection.averagedChartData['24hr'];
//   //       }
//   //     });

//   //     // Remove the default selected ID if it's not supposed to be part of the initial setup
//   //     if (updatedById[SELECTED_COLLECTION_ID]) {
//   //       delete updatedById[SELECTED_COLLECTION_ID];
//   //     }

//   //     // Filter out the SELECTED_COLLECTION_ID from allIds if it's currently included
//   //     const updatedAllIds = collections.allIds.filter(
//   //       (id) => id !== SELECTED_COLLECTION_ID
//   //     );

//   //     setCollections({
//   //       ...defaultValues.defaultCollections,
//   //       byId: updatedById,
//   //       allIds: updatedAllIds,
//   //       lastUpdated: new Date().toISOString(),
//   //       // Ensure the selectedId is updated appropriately, default to the first valid ID or null
//   //       selectedId: updatedAllIds.length > 0 ? updatedAllIds[0] : null,
//   //     });
//   //   }
//   // }, []);
//   const [selectedCollectionId, setSelectedCollectionId] = useState(null);
//   const [customError, setCustomError] = useState(null);
//   const prevSelectedCollectionIdRef = useRef(null);
//   const [selectedStat, setSelectedStat] = useState('');
//   const [collectionUpdated, setCollectionUpdated] = useState(false);
//   useEffect(() => {
//     prevSelectedCollectionIdRef.current = selectedCollectionId;
//   }, [selectedCollectionId]);
//   const getSelectedCollection = useMemo(() => {
//     const selectedCollection = collections.byId[collections.selectedId];
//     if (!selectedCollection) {
//       setCustomError('Selected collection not found.');
//       return collections.byId[collections.allIds[0]];
//     }
//     return selectedCollection;
//   }, [collections.byId, collections.selectedId]);
//   const handleSelectCollection = useCallback(
//     (collection) => {
//       console.log('SELECTED COLLECTION ID', collection?._id);
//       setCustomError(null);
//       if (!collections.byId[collection?._id]) {
//         setCustomError('Invalid collection selected');
//         return;
//       }
//       // setSelectedCollectionId(collection?._id);
//       setCollections((prev) => ({
//         ...prev,
//         selectedId: collection?._id,
//         showCollections: !prev.showCollections,
//       }));
//       setCustomError(null);
//     },
//     [collections.byId, setCollections, setSelectedCollectionId]
//   );
//   const updateCollectionField = useCallback(
//     (collectionId, fieldPath, value) => {
//       console.log('UPDATE COLLECTION FIELD', collectionId, fieldPath, value);
//       setCollections((prev) =>
//         _set({ ...prev }, `byId.${collectionId}.${fieldPath}`, value)
//       );
//     },
//     [setCollections]
//   );
//   const resetCollection = useCallback(() => {
//     setCollections((prev) => ({
//       ...prev,
//       selectedId: null,
//       showCollections: true,
//     }));
//     setCustomError(null);
//   }, [setCollections]);
//   const refreshCollections = useCallback(
//     (updatedCollections) => {
//       // Directly use the updatedCollections parameter to update the state
//       setCollections((prev) => {
//         // Assuming updatedCollections is an array of collection objects with _id properties
//         const updatedById = updatedCollections?.reduce(
//           (acc, collection) => {
//             acc[collection._id] = collection;
//             return acc;
//           },
//           { ...prev.byId }
//         );
//         console.log('UPDATED COLLECTIONS', updatedById);
//         const updatedAllIds = updatedCollections.map(
//           (collection) => collection._id
//         );
//         console.log('UPDATED ALL IDS', updatedAllIds);
//         return {
//           ...prev,
//           allIds: updatedAllIds,
//           byId: updatedById,
//           selectedId: collections.selectedId || prev.allIds[0],
//         };
//       });
//     },
//     [setCollections]
//   );
//   const updateCollectionsData = useCallback(
//     (newCollections, action, deletedCollectionId) => {
//       console.log('updateCollectionsData', newCollections, action);
//       setCollections((prev) => {
//         // Copy the current state to avoid mutations
//         let updatedAllIds = [...prev.allIds];
//         const updatedById = { ...prev.byId };

//         // Handle the deletion of a collection
//         if (action === 'deleteCollection' && deletedCollectionId) {
//           // Remove the deleted collection from the state
//           delete updatedById[deletedCollectionId];
//           updatedAllIds = updatedAllIds.filter(
//             (id) => id !== deletedCollectionId
//           );

//           // Update the selectedId if it was the deleted collection
//           const updatedSelectedId =
//             prev.selectedId === deletedCollectionId
//               ? updatedAllIds.length > 0
//                 ? updatedAllIds[0]
//                 : null // Choose another collection or null
//               : prev.selectedId;

//           // Update the state with the changes
//           const updatedState = {
//             ...prev,
//             allIds: updatedAllIds,
//             byId: updatedById,
//             selectedId: updatedSelectedId,
//           };

//           // Synchronize the updated state with local storage
//           localStorage.setItem('collections', JSON.stringify(updatedState));

//           return updatedState;
//         } else {
//           // For actions other than deletion, handle them as needed
//           newCollections.forEach((collection) => {
//             updatedById[collection._id] = collection;
//             if (!updatedAllIds.includes(collection._id)) {
//               updatedAllIds.push(collection._id);
//             }
//           });

//           const updatedState = {
//             ...prev,
//             byId: updatedById,
//             allIds: updatedAllIds,
//           };
//           localStorage.setItem('collections', JSON.stringify(updatedState));
//           return updatedState;
//         }
//       });
//     },
//     [setCollections]
//   );
//   const removeCollection = useCallback(
//     (collectionId) => {
//       setCollections((prev) => {
//         console.log('REMOVING COLLECTION', collectionId);
//         const updatedById = { ...prev.byId };
//         delete updatedById[collectionId]; // Remove the collection
//         const updatedAllIds = prev.allIds.filter((id) => id !== collectionId);
//         delete updatedAllIds[updatedAllIds.indexOf(collectionId)];
//         console.log('UPDATED COLLECTIONS', updatedById);

//         // Directly update local storage with the modified state
//         const updatedCollections = {
//           ...prev,
//           byId: updatedById,
//           allIds: updatedAllIds,
//           // Ensure selectedId is updated appropriately
//           selectedId: prev.selectedId === collectionId ? null : prev.selectedId,
//         };

//         // Since useLocalStorage hook might already synchronize the state with local storage,
//         // the following line ensures local storage is explicitly updated.
//         // This step may be redundant depending on the implementation of useLocalStorage.
//         localStorage.setItem('collections', JSON.stringify(updatedCollections));

//         return updatedCollections;
//       });
//       // No need to call refreshCollections if local storage is updated here
//     },
//     [setCollections]
//   );
//   const removeCardFromCollection = useCallback(
//     (collectionId, cardId, shouldDecrement = false) => {
//       setCollections((prev) => {
//         const updatedCollections = { ...prev };
//         // Assuming each collection has an array of card objects with properties '_id' and 'quantity'
//         const collection = updatedCollections.byId[collectionId];
//         if (!collection || !collection.cards) {
//           console.error(
//             `Collection ${collectionId} not found or it has no cards.`
//           );
//           return prev;
//         }

//         const cardIndex = collection?.cards?.findIndex(
//           (card) => card._id === cardId
//         );
//         if (cardIndex === -1) {
//           console.error(
//             `Card ${cardId} not found in collection ${collectionId}.`
//           );
//           return prev;
//         }

//         if (shouldDecrement && collection.cards[cardIndex].quantity > 1) {
//           // Decrement the quantity if it's more than 1
//           collection.cards[cardIndex].quantity -= 1;
//           console.log(
//             `Decremented quantity of card ${cardId} in collection ${collectionId}.`
//           );
//         } else {
//           // Remove the card if quantity is 1 or if shouldDecrement is false
//           collection.cards.splice(cardIndex, 1);
//           console.log(
//             `Removed card ${cardId} from collection ${collectionId}.`
//           );
//         }

//         return {
//           ...prev,
//           byId: {
//             ...prev.byId,
//             [collectionId]: collection,
//           },
//         };
//       });
//     },
//     [setCollections]
//   );
//   const handleRemoveCard = useCallback(
//     (cardId, collectionId, newQuantity) => {
//       const currentCollection = collections?.byId[collectionId];
//       const card = currentCollection?.cards?.find((card) => card.id === cardId);
//       console.log('handleRemoveCard', cardId, collectionId, newQuantity);
//       console.log('handleRemoveCard', card);
//       if (card) {
//         console.log('REMOVING CARD', cardId);
//         removeCardFromCollection(
//           selectedCollectionId,
//           cardId,
//           card.quantity > 1
//         );
//       }
//     },
//     [collections.byId, removeCardFromCollection]
//   );
//   const prevCollectionsRef = useRef();
//   useEffect(() => {
//     if (prevCollectionsRef.current) {
//       console.log('Collections data updated:', collections);
//     }
//     prevCollectionsRef.current = collections;
//   }, [collections.allIds, collections.byId[collections.selectedId]]);

//   return {
//     selectedCollectionId:
//       collections.selectedId || prevSelectedCollectionIdRef.current,
//     selectedCollection: getSelectedCollection || {},
//     allIds: collections?.allIds || [],
//     allCollections: Object.values(collections?.byId) || [],
//     showCollections: !!collections.showCollections,
//     byId: collections?.byId || {},
//     removeCardFromCollection,
//     collections,
//     selectedStat,
//     setSelectedStat,
//     createMarkers,
//     handleSelectCollection,
//     // selectedCollection: getSelectedCollection,
//     handleBackToCollections: resetCollection,
//     updateCollectionField,
//     resetCollection,
//     handleRemoveCard,
//     updateCollectionsData,
//     customError,
//     refreshCollections,
//     removeCollection,
//     setCustomError,
//   };
// }

// export default useSelectedCollection;
// const validCollections =
//   Array.isArray(collections.allIds) && collections.allIds.length > 0;
// const statsByCollectionId = useMemo(
//   () =>
//     validCollections
//       ? collections.byId?.reduce((acc, collection) => {
//           acc[collection?._id] = calculateStatsForCollection(
//             collection,
//             selectedTimeRange
//           );
//           return acc;
//         }, {})
//       : {},
//   [collections.byId, selectedTimeRange]
//   // [collections.allIds, selectedTimeRange]
// );
