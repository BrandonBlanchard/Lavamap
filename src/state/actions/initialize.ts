import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { ApplicationState, ViewerState } from '../models';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export interface InitializeActionArgs {
  scene: Scene;
  renderer: WebGLRenderer;
  camera: PerspectiveCamera;
  isPlaying: boolean;
  camControls: OrbitControls;
};

export interface InitializeAction {
  type: 'setInitialAction';
  data: InitializeActionArgs;
};

export const initializeActionCreator = (data: InitializeActionArgs): InitializeAction => ({
  type: 'setInitialAction',
  data
});

export const InitializeReducer = (state: ApplicationState, { scene, renderer, camera, camControls }: InitializeActionArgs): ApplicationState => {
  const nextState = {
    ...state,
    viewer: {
      ...(state.viewer as ViewerState),
      lights: [],
      isPlaying: true,
      scene,
      renderer,
      camera,
      camControls,
      stagingItems: []
    }
  };

  return nextState;
};