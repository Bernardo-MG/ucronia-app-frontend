import { MenuLink } from "./menu-link";

export class AuthMenuLink extends MenuLink {
  constructor(
    title: string,
    path: string,
    public resource: string,
    icon?: any
  ) {
    super(title, path, icon);
  }
}