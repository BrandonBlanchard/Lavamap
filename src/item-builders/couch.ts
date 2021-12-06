import { BoxBufferGeometry, ColorRepresentation, Group, Mesh, MeshPhysicalMaterial, Vector3 } from "three";

export const couchBuilder = (position: Vector3, color: ColorRepresentation): Group => {
    const mat = new MeshPhysicalMaterial({ color, roughness: 0.6 });

    const armGeo = new BoxBufferGeometry(1, 2, 3);
    const seatGeo = new BoxBufferGeometry(10, 1, 2.5);
    const backRestGeo = new BoxBufferGeometry(10, 3, 0.5);

    const lArm = new Mesh(armGeo, mat);
    const rArm = new Mesh(armGeo, mat);
    const seat = new Mesh(seatGeo, mat);
    const backRest = new Mesh(backRestGeo, mat);

    const couch = new Group();
    couch.add(lArm, rArm, backRest, seat);

    lArm.position.set(5, 1, 0);
    rArm.position.set(-5, 1, 0);
    backRest.position.set(0, 1.5, 1.25);
    seat.position.set(0, 0.5, -0.25);

    couch.position.set(position.x, position.y, position.z);
    couch.name = `StagingItem:Couch (${couch.id})`

    return couch;
}