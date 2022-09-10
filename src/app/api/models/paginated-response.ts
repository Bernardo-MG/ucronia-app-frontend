import { ApiResponse } from "./api-response";

export class PaginatedResponse<T> extends ApiResponse<T> {
    page: number = 0;
    size: number = 0;
    elementsInPage: number = 0;
    totalElements: number = 0;
    totalPages: number = 0;
    first: boolean = false;
    last: boolean = false;
}