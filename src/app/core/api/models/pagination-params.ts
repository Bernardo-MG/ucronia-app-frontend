import { Params } from "../client/params";

export class PaginationParams implements Params {

  constructor(private page?: number, private size?: number) { }

  public load(loader: (name: string, value: any) => void): void {
    if (this.page) {
      loader('page', this.page);
    }
    if (this.size) {
      loader('size', this.size);
    }
  }

}