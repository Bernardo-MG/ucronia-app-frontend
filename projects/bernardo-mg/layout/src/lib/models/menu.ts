import { MenuLink } from "./menu-link";

export class Menu {
  constructor(
    public links: MenuLink[],
    public title: string
  ) {}
}