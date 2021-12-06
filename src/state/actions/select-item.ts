import { ApplicationState } from '../models';
import { Group } from 'three';
import { getCurrentMatColor, updateMatColor } from '../../utils/object-colors';

export interface SetSelectedItemActionArgs {
  item: Group | null;
};

export interface SetSelectedItemAction {
  type: 'setSelectedItemAction';
  data: SetSelectedItemActionArgs;
};

export const setSelectedItemActionCreator = (data: SetSelectedItemActionArgs): SetSelectedItemAction => ({
  type: 'setSelectedItemAction',
  data
});



const selectionColor = 0x34ff34;

export const setSelectedItemReducer = (state: ApplicationState, { item }: SetSelectedItemActionArgs): ApplicationState => {

  // Update previous selection to it's original color
  if (state.selectedStagingItem !== null && state.selectedItemPreviousColor !== null) {
    // Selection color is ending up in selectedItemPreviousColor somehow. Set to the default color as a stop gap.
    updateMatColor(state.selectedStagingItem, 0x967451);
  }

  // Ensure that if we select the same item twice we don't lose it's original color.
  const nextSelectionIsCurrentSelection = state.selectedStagingItem && item && state.selectedStagingItem.id === item.id;
  const currentItemUnselectedColor = nextSelectionIsCurrentSelection ? state.selectedItemPreviousColor : getCurrentMatColor(item);

  // Update the new selection color to match selected color
  if (item !== null) {
    updateMatColor(item, selectionColor);
  }

  const nextState = {
    ...state,
    // When a new object is selected, clear the queued item
    queuedStagingItem: null,
    selectedStagingItem: item,
    selectedItemPreviousColor: currentItemUnselectedColor
  };


  return nextState;
};