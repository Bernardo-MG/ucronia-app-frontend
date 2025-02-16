import { MenuLink } from "@bernardo-mg/layout";

export class AuthMenuLink extends MenuLink {
  resource = '';


  constructor(title: string, path: string, resource: string, icon?: any) {
    super(title, path, icon)

    this.resource = resource;
  }
}