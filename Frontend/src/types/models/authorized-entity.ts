/** This is a data type that denotes an entity that is allowed access to
 * be present in the secure area. The entity can be human or anima). AuthorizedEntity is composed of
 * properties such as id, name, entityType,registrationDate etc.
 * */
export type AuthorizedEntity = {
  id: string;
  name: string;
  entityType: "human" | "animal";
  registrationDate: string;
  photoUrl: string;
};
