import { ColorRepresentation, Group, Vector3 } from 'three';
import { getItemBuilder, ItemType } from '../../item-builders';

import { ApplicationState, ViewerState } from '../models';
import { setSelectedItemReducer } from './select-item';

export interface AddItemActionArgs {
  itemType: ItemType | null,
  item: Group, // Stop gap
  location: Vector3;
  color?: ColorRepresentation;
};

export interface AddItemAction {
  type: 'addItemAction';
  data: AddItemActionArgs;
};

export const addItemActionCreator = (data: AddItemActionArgs): AddItemAction => ({
  type: 'addItemAction',
  data
});

export const addItemReducer = (state: ApplicationState, { itemType, location, color = 0x343434, item }: AddItemActionArgs): ApplicationState => {
  const builder = getItemBuilder(itemType);

  // If we somehow get an invalid itemType, bail out and retain the existing state
  if (builder === null || state.viewer === null) { return state; }

  // Stop Gap - scene.add
  // const item = builder(location, 0X343434);
  // state.viewer.scene.add(item);

  const stateWithUpdatedSelection = setSelectedItemReducer(state, { item });

  const viewerState = (stateWithUpdatedSelection.viewer as ViewerState);
  const nextState: ApplicationState = {
    ...stateWithUpdatedSelection,
    viewer: {
      ...viewerState,
      stagingItems: [...state.viewer.stagingItems, item],
    },
    queuedStagingItem: null,
  };

  return nextState;
};