import { Pagination } from "./pagination"
import { Sort } from "./sort"

export interface ApiRequest<T> {
    pagination?: Pagination,
    sort?: Sort<T>,
    search?: any
}