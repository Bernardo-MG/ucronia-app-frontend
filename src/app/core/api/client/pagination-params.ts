import { ParamLoader } from "./param-loader";

export class PaginationParams implements ParamLoader {

  constructor(private page?: number, private size?: number) { }

  public load(setParameter: (name: string, value: any) => void): void {
    if (this.page) {
      setParameter('page', this.page);
    }
    if (this.size) {
      setParameter('size', this.size);
    }
  }

}