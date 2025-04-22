import { Menu } from "../models/menu";
import { MenuLink } from "../models/menu-link";
import { MenuOptions } from "../models/menu-options";

export class MenuLoader {

  private filter: (links: MenuLink[]) => MenuLink[];

  constructor(filter = (links: MenuLink[]) => links) {
    this.filter = filter;
  }

  public load(menuOptions: MenuOptions): Menu[] {
    const menus: Menu[] = [];

    for (const sectionKey of Object.keys(menuOptions)) {
      const section = menuOptions[sectionKey];
      const filteredLinks = this.filter(section.links);
      // Only add the section if it has filtered links
      if (filteredLinks.length > 0) {
        menus.push(new Menu(filteredLinks, section.title));
      }
    }

    return menus;
  }

}