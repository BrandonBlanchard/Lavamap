import React, { useEffect, useRef, useState } from 'react';
import { MOUSE, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { getItemBuilder, ItemType } from '../../item-builders';
import { tableSettingCompositeBuilder } from '../../item-builders/table-setting-composite-builder';
import { addGridActionCreator, addItemActionCreator, addRayColliderActionCreator, initializeActionCreator } from '../../state/actions';
import { addLightRigActionCreator } from '../../state/actions/add-light-rig';
import { setSelectedItemActionCreator } from '../../state/actions/select-item';
import { useApplicationContext } from '../../state/application-context';
import { getMouseLocation, getObjectUnderMouse } from '../../utils';

import './viewer.css';

export const Viewer: React.FC = () => {
  const [state, dispatch] = useApplicationContext();
  const containerRef = useRef(null);
  const [loopExists, setLoopExists] = useState<boolean>(false);

  useEffect(() => {
    if (containerRef.current) {
      const rect = (containerRef.current as HTMLElement).getBoundingClientRect();
      const camera = new PerspectiveCamera(45, rect.width / rect.height, 1, 1000);
      const scene = new Scene();
      const renderer = new WebGLRenderer();
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.mouseButtons.LEFT = MOUSE.PAN;
      controls.mouseButtons.RIGHT = MOUSE.ROTATE;

      camera.position.set(0, 20, -20);
      camera.lookAt(new Vector3(0, 0, 0));

      
      const tableSetting = tableSettingCompositeBuilder(new Vector3(), 0x967451);
      scene.add(...tableSetting)

      dispatch([
        initializeActionCreator({ scene, renderer, camera, isPlaying: true, camControls: controls }),
        addLightRigActionCreator({}),
        addGridActionCreator({}),
        addRayColliderActionCreator({}),
        ...tableSetting.map((tableSettingItem) => addItemActionCreator({ item: tableSettingItem, location: new Vector3(0,0,0), itemType: ItemType.tableSetting }) )
      ]);

      renderer.setSize(rect.width, rect.height);
      (containerRef.current as HTMLElement).appendChild(renderer.domElement)
    }
  }, [containerRef, dispatch]);

  useEffect(() => {
    const renderLoop = () => {
      if (state.viewer && state.viewer.isPlaying) {
        state.viewer.renderer.render(state.viewer.scene, state.viewer.camera);
      }

      requestAnimationFrame(renderLoop);
    }

    // A little extra care here to prevent duplicate render loops
    if (loopExists === false && state.viewer) {
      renderLoop();
      setLoopExists(true);
    }
  }, [state.viewer, loopExists]);

  const mouseDownHandler = (e: any) => {
    if (state.viewer === null) { return; }

    // Place item
    if (state.queuedStagingItem !== null) {
      const mouseLocation = getMouseLocation(state.viewer.rayCollider, e.clientX, e.clientY, state.viewer.camera);
      if (mouseLocation !== null) {

        // Stop Gap - scene.add 
        const builder = getItemBuilder(state.queuedStagingItem);
        if (builder === null) { return; }
        const item = builder(mouseLocation, 0x967451);

        if(Array.isArray(item)) {
          state.viewer.scene.add(...item);
          dispatch([...item.map((itemPart) => addItemActionCreator({ itemType: state.queuedStagingItem, location: mouseLocation, item: itemPart }))]);
        } else {
          state.viewer.scene.add(item) 
          dispatch(addItemActionCreator({ itemType: state.queuedStagingItem, location: mouseLocation, item }));
        }
      }

      // Try to select item under the mouse
    } else {
      const objectUnderMouse = getObjectUnderMouse(state.viewer.scene.children, e.clientX, e.clientY, state.viewer.camera);

      if (objectUnderMouse) {
        dispatch(setSelectedItemActionCreator({ item: objectUnderMouse }));
      }
    }
  };

  return (<div ref={containerRef} className="viewer-container" onMouseDown={mouseDownHandler} />)

};