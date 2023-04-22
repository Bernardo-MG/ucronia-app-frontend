import { PaginationRequest } from "../../../../core/api/models/pagination-request"
import { Sort } from "../../../../core/api/models/sort"

export interface ApiRequest<T> {
  pagination?: PaginationRequest,
  sort?: Sort<T>,
  search?: any
}