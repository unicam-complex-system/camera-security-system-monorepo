import { NavBarItem } from "@/types";

export const getCurrentNav = (
  navBarItems: NavBarItem[],
  currentRoute: string
) => {
  const currentItem: NavBarItem | undefined = navBarItems.find(
    (item) => item.route === currentRoute
  );
  return currentItem ? [currentItem.key] : undefined;
};
