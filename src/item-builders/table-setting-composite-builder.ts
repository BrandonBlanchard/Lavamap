import { ColorRepresentation, Group, Vector3 } from "three";
import { chairBuilder } from "../item-builders/chair";
import { tableBuilder } from "../item-builders/table"

const oneDegree = 2 * Math.PI / 360;
const upVector = new Vector3(0,1,0);

export const tableSettingCompositeBuilder = (position: Vector3, color: ColorRepresentation): Group[] => {
  const table = tableBuilder(new Vector3(0, 0, 0).add(position), color);

  const chair1 = chairBuilder(new Vector3(0.2, 0, 2).add(position), color);
  const chair2 = chairBuilder(new Vector3(-0.2, 0, -3).add(position), color);
  const chair3 = chairBuilder(new Vector3(-3.5, 0, 0.1).add(position), color);
  const chair4 = chairBuilder(new Vector3(3.5, 0, 0.2).add(position), color);

  chair1.rotateOnAxis(upVector, oneDegree * -87);
  chair2.rotateOnAxis(upVector, oneDegree * 35);
  chair3.rotateOnAxis(upVector, oneDegree * 165);


  return [table, chair1, chair2, chair3, chair4];
}