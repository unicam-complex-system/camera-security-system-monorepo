/** This is a data type that denotes a single navbar item.
 * */
export type NavBarItem = {
  key: string;
  label: string;
  route: string;
  icon: React.ComponentType<{}>;
};
