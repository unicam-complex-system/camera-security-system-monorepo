import { Camera } from "./camera";
import { AuthorizedEntity } from "./authorized-entity";

/** This is a data type that denotes an activity (event) that took place at a certain time.
 * Activity is composed of properties such as id, timestamp, camera,entity etc.
 * */
export type Activity = {
  id: string;
  timestamp: string;
  entity?: AuthorizedEntity;
  camera: Camera;
};
