import { MenuLink } from "./menu-link";

export class Menu {
  title = '';
  links: MenuLink[] = [];

  constructor(links: MenuLink[], title?: string) {
    if (title !== undefined) {
      this.title = title;
    }
    this.links = links;
  }

}