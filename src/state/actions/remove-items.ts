import { Group } from 'three';
import { ApplicationState, ViewerState } from '../models';
import { setSelectedItemReducer } from './select-item';

export interface RemoveItemsActionArgs {
  items: Group[]
};

export interface RemoveItemsAction {
  type: 'removeItemActon';
  data: RemoveItemsActionArgs;
};

export const removeItemsActionCreator = (data: RemoveItemsActionArgs): RemoveItemsAction => ({
  type: 'removeItemActon',
  data
});

export const removeItemsReducer = (state: ApplicationState, { items }: RemoveItemsActionArgs): ApplicationState => {
  if (state.viewer === null) { return state; }

  items.forEach((item) => state.viewer?.scene.remove(item));
  const nextStagingItems = state.viewer.stagingItems.filter((item) => items.indexOf(item) === -1);

  const lastItemIndex = nextStagingItems.length - 1;
  const lastItem = lastItemIndex > -1 ? nextStagingItems[lastItemIndex] : null;
  const stateWithSelectionUpdate = setSelectedItemReducer(state, { item: lastItem });


  const viewerState = (stateWithSelectionUpdate.viewer as ViewerState);
  const nextState: ApplicationState = {
    ...stateWithSelectionUpdate,
    viewer: {
      ...viewerState,
      stagingItems: nextStagingItems
    }
  };

  return nextState;
};