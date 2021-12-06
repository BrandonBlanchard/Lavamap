import { ColorRepresentation, Group, Vector3 } from "three";
import { chairBuilder } from "./chair";
import { couchBuilder } from "./couch";
import { tableBuilder } from "./table";
import { tableSettingCompositeBuilder } from "./table-setting-composite-builder";

export enum ItemType {
  couch = 'couch',
  table = 'table',
  chair = 'chair',
  tableSetting = 'tableSetting'
}

export type ItemBuilder = (position: Vector3, color: ColorRepresentation) => Group;
export type CompositeItemBuilder = (position: Vector3, color: ColorRepresentation) => Group[];

export const getItemBuilder = (item: ItemType | null): ItemBuilder | CompositeItemBuilder | null => {
  switch(item) {
    case ItemType.couch:
      return couchBuilder;
    case ItemType.chair:
      return chairBuilder;
    case ItemType.table:
      return tableBuilder;
    case ItemType.tableSetting:
      return tableSettingCompositeBuilder;
    default:
      return null;
  }
};