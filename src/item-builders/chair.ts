import { BoxBufferGeometry, ColorRepresentation, Group, Mesh, MeshPhysicalMaterial, Vector3 } from "three";

export const chairBuilder = (position: Vector3, color: ColorRepresentation): Group => {
  const mat = new MeshPhysicalMaterial({ color, roughness: 0.6 });

  const fLegGeo = new BoxBufferGeometry(0.1, 1.5, 1.5);
  const bLegGeo = new BoxBufferGeometry(0.1, 1.5, 1.5);
  const seatGeo = new BoxBufferGeometry(1.5, 0.1, 1.5);
  const backRestGeo = new BoxBufferGeometry(0.1, 1.5, 1.5);

  const seatMesh = new Mesh(seatGeo, mat);
  const backMesh = new Mesh(backRestGeo, mat);
  const bLegMesh = new Mesh(bLegGeo, mat);
  const fLegMesh = new Mesh(fLegGeo, mat);

  seatMesh.position.set(0, 1.5, 0);
  backMesh.position.set(0.75, 2, 0);
  fLegMesh.position.set(0.75, 0.75, 0);
  bLegMesh.position.set(-0.75, 0.75, 0);

  const chair = new Group();
  chair.add(seatMesh, backMesh, fLegMesh, bLegMesh);

  chair.position.set(position.x, position.y, position.z);
  chair.name = `StagingItem:Chair (${chair.id})`;

  return chair;
}