
export class BreadcrumbLink {
  name: string;
  route: string | undefined;

  constructor(name: string, route?: string) {
    this.name = name;
    if (route) {
      this.route = route;
    } else {
      this.route = undefined;
    }
  }
}