import { BufferGeometry, ColorRepresentation, Group, Line, LineBasicMaterial, Vector3 } from 'three';
import { ApplicationState, ViewerState } from '../models';

export interface AddGridActionArgs {
  color?: ColorRepresentation;
  width?: number;
  depth?: number;
};

export interface AddGridAction {
  type: 'addGridAction';
  data: AddGridActionArgs;
};

export const addGridActionCreator = (data: AddGridActionArgs): AddGridAction => ({
  type: 'addGridAction',
  data
});

export const addGridReducer = (state: ApplicationState, { color = 0x344434, width = 100, depth = 100 }: AddGridActionArgs): ApplicationState => {

  const lineMat = new LineBasicMaterial({ color });

  const widthOffset = (width / 2);
  const depthOffset = (depth / 2);

  const grid = new Group();

  for (let x = 0; x <= width; x++) {
    const points = [new Vector3(x - widthOffset, 0, -depthOffset), new Vector3(x - widthOffset, 0, depthOffset)];
    const lineGeo = new BufferGeometry().setFromPoints(points);
    const line = new Line(lineGeo, lineMat);

    grid.add(line);
  }

  for (let z = 0; z <= depth; z++) {
    const points = [new Vector3(-widthOffset, 0, z - depthOffset), new Vector3(widthOffset, 0, z - depthOffset)];
    const lineGeo = new BufferGeometry().setFromPoints(points);
    const line = new Line(lineGeo, lineMat);

    grid.add(line);
  }

  state.viewer?.scene.add(grid);

  const nextState: ApplicationState = {
    ...state,
    viewer: {
      ...(state.viewer as ViewerState),
      grid
    }
  };

  return nextState;
};