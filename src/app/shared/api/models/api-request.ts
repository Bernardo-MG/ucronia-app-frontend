import { PaginationRequest } from "./pagination-request"
import { Sort } from "./sort"

export interface ApiRequest<T> {
    pagination?: PaginationRequest,
    sort?: Sort<T>,
    search?: any
}