import React, { ReactElement, useContext, useReducer } from 'react';
import { applicationContextHandler } from './action-handler';
import { ApplicationAction } from './actions';
import { ApplicationState } from './models';

export const applicationContextDefault: ApplicationState = {
  viewer: null,
  queuedStagingItem: null,
  selectedStagingItem: null,
  selectedItemPreviousColor: null
};

// Create context add placeholder dispatch
export const ApplicationContext = React.createContext<[ApplicationState, React.Dispatch<ApplicationAction | ApplicationAction[]>]>([applicationContextDefault, (state) => state]);

interface ApplicationProviderArgs {
  children: ReactElement,
  reducer?: (state: ApplicationState, action: ApplicationAction | ApplicationAction[]) => ApplicationState,
  initialState?: ApplicationState
}

export const ApplicationProvider: React.FC<ApplicationProviderArgs> = ({
  reducer = applicationContextHandler,
  children = null,
  initialState = applicationContextDefault
}) => {
  const context = useReducer(reducer, initialState);

  return (
    <ApplicationContext.Provider value={context}>
      {children}
    </ApplicationContext.Provider>
  )
}

export const useApplicationContext = () => useContext(ApplicationContext);