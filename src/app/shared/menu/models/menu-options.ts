import { AuthMenuLink } from "@app/core/layout/model/auth-menu-link";

export class MenuOptions {
    [key: string]: { title: string, links: AuthMenuLink[] }
}