import { MenuLink } from "./menu-link";

export class AuthMenuLink extends MenuLink {
  resource = '';

  constructor(title: string, path: string, resource: string, icon?: any) {
    super(title, path, icon)

    this.resource = resource;
  }
}