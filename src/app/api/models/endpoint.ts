import { Observable } from "rxjs";
import { ApiRequest } from "./api-request";
import { PaginatedResponse } from "./paginated-response";

export type Endpoint<T> = (request: ApiRequest<T>) => Observable<PaginatedResponse<T[]>>;