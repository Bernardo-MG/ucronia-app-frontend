import { Sort } from "../../../../core/api/models/sort";

export class PaginationRequest {
  page?: number;
  size?: number;
  sort?: Sort<any>[];
}