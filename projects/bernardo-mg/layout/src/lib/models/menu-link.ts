
export class MenuLink {
  public disabled = false;

  constructor(
    public title: string,
    public path: string,
    public icon?: string
  ) { }
}