import React, { useRef } from 'react';
import { Group, Vector3 } from 'three';
import { ItemType } from '../../item-builders';
import { removeItemsActionCreator, setQueuedItemActionCreator } from '../../state/actions';
import { setSelectedItemActionCreator } from '../../state/actions/select-item';
import { useApplicationContext } from '../../state/application-context';
import { ToolsIconWrapper } from './components';
import './tools-panel.css';

import upArrow from '../../icons/up-arrow.svg';
import downArrow from '../../icons/down-arrow.svg';
import leftArrow from '../../icons/left-arrow.svg';
import rightArrow from '../../icons/right-arrow.svg';
import rotateRight from '../../icons/rotate-left.svg';
import rotateLeft from '../../icons/rotate-right.svg';

const yAxis = new Vector3(0, 1, 0);
const oneDegree = 2 * Math.PI / 360;

export const ToolsPanel = () => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const [state, dispatch] = useApplicationContext();

  const addItemHandler = () => {
    if (selectRef.current) {
      const itemType = selectRef.current.value as ItemType;

      dispatch(setQueuedItemActionCreator({ itemType }))
    }
  };

  const selectionHandler = (item: Group) => {
    dispatch(setSelectedItemActionCreator({ item }));
  };

  const rotationHandler = (direction: 1 | -1) => {
    if (state.selectedStagingItem) {
      state.selectedStagingItem.rotateOnAxis(yAxis, 45 * direction * oneDegree);
    }
  }

  const moveHandler = (x: 1 | 0 | -1, z: 1 | 0 | -1) => {
    if (state.viewer !== null && state.selectedStagingItem !== null) {
      const cameraFacing = state.viewer.camera.getWorldDirection(new Vector3());
      // Zero out the y component and normalize in order to flatten the facing vector
      cameraFacing.y = 0;
      const forward = cameraFacing.normalize()
      const up = new Vector3(0, 1, 0);

      // Get the camera's relative left via the cross produce of up and the camera's facing.
      const left = new Vector3().crossVectors(up, forward).normalize();

      left.multiplyScalar(x);
      forward.multiplyScalar(z);

      forward.add(left);

      state.selectedStagingItem.position.add(forward);
    }
  }

  const deleteSelectionHandler = () => {
    if (state.selectedStagingItem && state.viewer) {
      dispatch(removeItemsActionCreator({ items: [state.selectedStagingItem] }));
    }
  }

  const deleteAllHandler = () => {
    if (state.viewer) {
      dispatch(removeItemsActionCreator({ items: state.viewer.stagingItems }));
    }
  }

  const items = Object.keys(ItemType);
  const hasQueuedStagingItem = state.queuedStagingItem !== null;
  const viewerReady = state.viewer !== null;
  const selectedItemId = state.selectedStagingItem ? state.selectedStagingItem.id : -1;

  return (
    <div className='tools-panel'>
      <div className="palette">
        <div className="arrows">
          <ToolsIconWrapper svg={rotateRight} onClick={() => rotationHandler(1)} />
          <ToolsIconWrapper svg={rotateLeft} onClick={() => rotationHandler(-1)} />
        </div>

        <div className="arrows">
          <ToolsIconWrapper svg={leftArrow} onClick={() => moveHandler(1, 0)} />
          <div>
            <ToolsIconWrapper svg={upArrow} onClick={() => moveHandler(0, 1)} />
            <ToolsIconWrapper svg={downArrow} onClick={() => moveHandler(0, -1)} />
          </div>
          <ToolsIconWrapper svg={rightArrow} onClick={() => moveHandler(-1, 0)} />
        </div>
      </div>
      <div className='panel-content'>
        <div>
          <h2>Add Item</h2>
          <div className="create">
            <select ref={selectRef}>
              {items.map((item) => (
                <option key={item} label={item} value={item} />
              ))}
            </select>
            <button onMouseDown={addItemHandler}>Add</button>
          </div>
        </div>
        <div className="info">
          {hasQueuedStagingItem && <p>Click anywhere in the scene to place a {state.queuedStagingItem}</p>}
        </div>

        <div>

          <h2>Staging Items</h2>
          <div className="items-list">
            {viewerReady && state.viewer?.stagingItems.map((item, i) => (
              <div key={`${item}__${i}`} className={`staging-item ${item.id === selectedItemId ? 'selected' : ''}`} onMouseDown={() => selectionHandler(item)}>{item.name.split(':')[1]}</div>
            ))}
          </div>
        </div>

        <div className="remove">
          <button onMouseDown={deleteSelectionHandler} disabled={state.selectedStagingItem === null}>Delete Selection</button>
          <button onMouseDown={deleteAllHandler} disabled={state.viewer === null || state.viewer.stagingItems.length === 0}>Delete All</button>
        </div>
      </div>
    </div>
  );
};