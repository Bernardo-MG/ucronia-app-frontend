import { Observable } from "rxjs";
import { ApiResponse } from '@app/api/models/api-response';
import { ApiRequest } from "./api-request";

export type Endpoint<T> = (request: ApiRequest<T>) => Observable<ApiResponse<T[]>>;