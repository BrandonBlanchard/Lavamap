import { addGridReducer, addItemReducer, addLightRigReducer, addRayColliderReducer, ApplicationAction, InitializeReducer, removeItemsReducer, setQueuedItemReducer } from "./actions";
import { setSelectedItemReducer } from "./actions/select-item";
import { ApplicationState } from "./models";

const actionHandler = (
  state: ApplicationState,
  action: ApplicationAction
): ApplicationState => {
  try {
    switch (action.type) {
      case 'setInitialAction':
        return InitializeReducer(state, action.data);

      case 'addLightRigAction':
        return addLightRigReducer(state, action.data);

      case 'addGridAction':
        return addGridReducer(state, action.data);

      case 'addItemAction':
        return addItemReducer(state, action.data);

      case 'addRayColliderAction':
        return addRayColliderReducer(state, action.data);

      case 'removeItemActon':
        return removeItemsReducer(state, action.data);

      case 'setQueuedItemAction':
        return setQueuedItemReducer(state, action.data);

      case 'setSelectedItemAction':
        return setSelectedItemReducer(state, action.data);
    }
  } catch (e) {
    // When a reducer throws an error, announce the issue and use the last good state to keep things rolling
    console.error('ActionHandler failed at action: ', action, ' with error: ', e);
    return state;
  }
}

export const applicationContextHandler = (
  state: ApplicationState,
  action: ApplicationAction | ApplicationAction[]
): ApplicationState => {
  if (Array.isArray(action)) {
    return action.reduce(
      (aggregateState, currentAction) =>
        actionHandler(aggregateState, currentAction),
      state
    );
  } else {
    return actionHandler(state, action);
  }
};