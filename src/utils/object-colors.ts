import { Group, ColorRepresentation, Mesh, MeshPhysicalMaterial } from "three";

export const updateMatColor = (rootObject: Group, nextColor: ColorRepresentation) => {
  rootObject.traverse((object) => {
    if (object.type === "Mesh") {
      ((object as Mesh).material as MeshPhysicalMaterial).color.set(nextColor);
    }
  })
}

export const getCurrentMatColor = (rootObject: Group | null): ColorRepresentation | null => {
  if (rootObject === null) { return null };

  return ((rootObject.children[0] as Mesh).material as MeshPhysicalMaterial).color.clone();
}