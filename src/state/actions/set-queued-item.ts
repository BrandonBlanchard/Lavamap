import { ApplicationState } from '../models';
import { ItemType } from '../../item-builders';

export interface SetQueuedItemActionArgs {
  itemType: ItemType | null;
};

export interface SetQueuedItemAction {
  type: 'setQueuedItemAction';
  data: SetQueuedItemActionArgs;
};

export const setQueuedItemActionCreator = (data: SetQueuedItemActionArgs): SetQueuedItemAction => ({
  type: 'setQueuedItemAction',
  data
});

export const setQueuedItemReducer = (state: ApplicationState, { itemType }: SetQueuedItemActionArgs): ApplicationState => {
  // When an item is queued for addition to the scene, clear the current user selection
  const nextState = {
    ...state,
    queuedStagingItem: itemType,
  };

  return nextState;
};