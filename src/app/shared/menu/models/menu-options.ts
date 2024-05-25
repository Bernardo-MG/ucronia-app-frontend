import { MenuLink } from "./menu-link";

export class MenuOptions {
    [key: string]: { title: string, links: MenuLink[] }
}