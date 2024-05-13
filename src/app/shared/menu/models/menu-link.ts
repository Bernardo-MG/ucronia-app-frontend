export class MenuLink {
  title = '';
  path = '';
  icon = '';
  
  constructor(title: string, path: string, icon = '') {
    this.title = title;
    this.path = path;
    this.icon = icon;
  }
}