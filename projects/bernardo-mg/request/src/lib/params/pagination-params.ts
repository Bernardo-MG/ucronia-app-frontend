import { ParamLoader } from "./param-loader";

/**
 * Loads pagination parameters (page and size).
 */
export class PaginationParams implements ParamLoader {

  constructor(private readonly page?: number, private readonly size?: number) { }

  public load(setParameter: (name: string, value: any) => void): void {
    if (this.page) {
      setParameter('page', this.page);
    }
    if (this.size) {
      setParameter('size', this.size);
    }
  }

}