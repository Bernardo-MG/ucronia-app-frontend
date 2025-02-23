import { Menu } from "../models/menu";
import { MenuLink } from "../models/menu-link";
import { MenuOptions } from "../models/menu-options";

export class MenuLoader {

  public load(menuOptions: MenuOptions, filter: (links: MenuLink[]) => MenuLink[] = (links) => links): Menu[] {
    const menus: Menu[] = [];

    for (const sectionKey of Object.keys(menuOptions)) {
      const section = menuOptions[sectionKey];
      const filteredLinks = filter(section.links);
      // Only add the section if it has filtered links
      if (filteredLinks.length > 0) {
        menus.push(new Menu(filteredLinks, section.title));
      }
    }

    return menus;
  }

}