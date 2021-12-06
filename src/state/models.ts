import { ColorRepresentation, Group, Light, Object3D, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { ItemType } from '../item-builders';

export interface ViewerState {
  scene: Scene;
  renderer: WebGLRenderer;
  camera: PerspectiveCamera;
  isPlaying: boolean;
  lights: Light[];
  grid: Group;
  rayCollider: Object3D;
  stagingItems: Group[];
}

export interface ApplicationState {
  viewer: ViewerState | null;
  // User has selected an item to the scene but has not yet clicked to drop the item.
  queuedStagingItem: ItemType | null;
  selectedStagingItem: Group | null;
  selectedItemPreviousColor: ColorRepresentation | null;
};