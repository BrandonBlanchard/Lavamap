import { Camera, Group, Object3D, Raycaster, Vector3 } from "three";

const raycaster = new Raycaster();


export const getMouseLocation = (rayCollider: Object3D, mouseClientX: number, mouseClientY: number, camera: Camera): Vector3 | null => {
  // Cast ray into scene
  const x = (mouseClientX / window.innerWidth) * 2 - 1;
  const y = -(mouseClientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera({ x, y }, camera);

  const hits = raycaster.intersectObject(rayCollider);

  if (hits.length > 0) {
    return hits[0].point;
  }

  return null;
}

export const getObjectUnderMouse = (stagingItems: Object3D[], mouseClientX: number, mouseClientY: number, camera: Camera): Group | null => {
  // Cast ray into scene
  const x = (mouseClientX / window.innerWidth) * 2 - 1;
  const y = -(mouseClientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera({ x, y }, camera);

  const hits = raycaster.intersectObjects(stagingItems);

  const objectUnderMouse = hits.length > 0 ? hits[0].object : null;

  if (objectUnderMouse !== null) {
    let parentGroup = null;
    objectUnderMouse?.traverseAncestors((object) => {
      if (object.name.indexOf('StagingItem') > -1) {
        parentGroup = object;
      }
    })

    return parentGroup;
  }

  return null;
}