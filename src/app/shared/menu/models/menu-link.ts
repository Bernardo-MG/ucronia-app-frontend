
export class MenuLink {
  title;
  path;
  icon;
  
  constructor(title: string, path: string, icon?: any) {
    this.title = title;
    this.path = path;
    this.icon = icon;
  }
}