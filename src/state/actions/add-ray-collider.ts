import { Mesh, MeshBasicMaterial, PlaneBufferGeometry, Vector3 } from 'three';
import { ApplicationState, ViewerState } from '../models';

export interface AddRayColliderActionArgs {
  width?: number;
  depth?: number;
};

export interface AddRayColliderAction {
  type: 'addRayColliderAction';
  data: AddRayColliderActionArgs;
};

export const addRayColliderActionCreator = (data: AddRayColliderActionArgs): AddRayColliderAction => ({
  type: 'addRayColliderAction',
  data
});

export const addRayColliderReducer = (state: ApplicationState, { width = 100, depth = 100 }: AddRayColliderActionArgs): ApplicationState => {
  const rayColliderMat = new MeshBasicMaterial({ color: 0x00ff00, opacity: 0, transparent: true });
  const rayColliderGeo = new PlaneBufferGeometry(width, depth);
  const rayCollider = new Mesh(rayColliderGeo, rayColliderMat);
  const oneDegree = 2 * Math.PI / 360;
  rayCollider.rotateOnAxis(new Vector3(1, 0, 0), oneDegree * -90);

  state.viewer?.scene.add(rayCollider);

  const nextState: ApplicationState = {
    ...state,
    viewer: {
      ...(state.viewer as ViewerState),
      rayCollider
    }
  };

  return nextState;
};