import { AuthContainer } from "@bernardo-mg/authentication";
import { AuthMenuLink } from "../models/auth-menu-link";
import { Menu } from "../models/menu";
import { MenuLink } from "../models/menu-link";
import { MenuOptions } from "../models/menu-options";
import { MenuLoader } from "./menu-loader";

export class ViewMenuLoader {

  private menuLoader: MenuLoader;

  constructor(authContainer: AuthContainer) {
    const nodeFilter = (links: MenuLink[]) => links.filter(link => authContainer.hasPermission((link as AuthMenuLink).resource, 'view'));
    this.menuLoader = new MenuLoader(nodeFilter);
  }

  public load(menuOptions: MenuOptions): Menu[] {
    return this.menuLoader.load(menuOptions);
  }

}