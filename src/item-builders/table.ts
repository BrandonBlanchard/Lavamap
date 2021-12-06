import { BoxBufferGeometry, ColorRepresentation, Group, Mesh, MeshPhysicalMaterial, Vector3 } from "three";

export const tableBuilder = (position: Vector3, color: ColorRepresentation): Group => {
  const mat = new MeshPhysicalMaterial({ color, roughness: 0.6 });

  const legGeo = new BoxBufferGeometry(0.1, 2.5, 0.1);
  const topGeo = new BoxBufferGeometry(6, 0.1, 4);

  const blLegMesh = new Mesh(legGeo, mat);
  const brLegMesh = new Mesh(legGeo, mat);
  const flLegMesh = new Mesh(legGeo, mat);
  const frLegMesh = new Mesh(legGeo, mat);
  const topMesh = new Mesh(topGeo, mat);

  blLegMesh.position.set(-2.8, 1.25, 1.8);
  brLegMesh.position.set(-2.8, 1.25, -1.8);
  flLegMesh.position.set(2.8, 1.25, 1.8);
  frLegMesh.position.set(2.8, 1.25, -1.8);
  topMesh.position.set(0, 2.5, 0);

  const table = new Group();
  table.add(topMesh, blLegMesh, brLegMesh, flLegMesh, frLegMesh);

  table.position.set(position.x, position.y, position.z);
  table.name = `StagingItem:Table (${table.id})`;

  return table;
};