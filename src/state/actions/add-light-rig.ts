import { ColorRepresentation, DirectionalLight, HemisphereLight } from 'three';
import { ApplicationState, ViewerState } from '../models';

export interface AddLightRigActionArgs {
  keyColor?: ColorRepresentation;
  fillColor?: ColorRepresentation;
};

export interface AddLightRigAction {
  type: 'addLightRigAction';
  data: AddLightRigActionArgs;
};

export const addLightRigActionCreator = (data: AddLightRigActionArgs): AddLightRigAction => ({
  type: 'addLightRigAction',
  data
});

export const addLightRigReducer = (state: ApplicationState, { keyColor = 0x3434cc, fillColor = 0xcc3434 }: AddLightRigActionArgs): ApplicationState => {

  const key = new DirectionalLight(0x3434cc, 1);
  const fill = new HemisphereLight(0xffffbb, 0x080820, 0.5);

  key.castShadow = true;
  key.position.set(10, 100, -10);

  state.viewer?.scene.add(key, fill);

  const nextState: ApplicationState = {
    ...state,
    viewer: {
      ...(state.viewer as ViewerState),
      lights: [key, fill]
    }
  };

  return nextState;
};