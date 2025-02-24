import { AuthContainer } from "@bernardo-mg/authentication";
import { Menu } from "../models/menu";
import { MenuLink } from "../models/menu-link";
import { AuthMenuLink } from "../models/auth-menu-link";
import { MenuOptions } from "../models/menu-options";
import { MenuLoader } from "./menu-loader";

export class ViewMenuLoader {
  private menuLoader: MenuLoader;

  constructor(authContainer: AuthContainer) {
    const nodeFilter = (links: MenuLink[]) => {
      return links.filter((link: any) => {
        let accepted = true;
        if (link instanceof AuthMenuLink) {
          accepted = authContainer.hasPermission(link.resource, "view");
        }
        return accepted;
      });
    };

    this.menuLoader = new MenuLoader(nodeFilter);
  }

  public load(menuOptions: MenuOptions): Menu[] {
    return this.menuLoader.load(menuOptions);
  }
}
