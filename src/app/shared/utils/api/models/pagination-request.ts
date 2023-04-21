import { Sort } from "./sort";

export class PaginationRequest {
  page?: number;
  size?: number;
  sort?: Sort<any>[];
}