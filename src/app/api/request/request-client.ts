import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GetOperations } from "./get-operations";

@Injectable({
  providedIn: 'root'
})
export class RequestClient {

  constructor(
    private http: HttpClient
  ) { }

  public get<T>(url: string): GetOperations<T> {
    return new GetOperations(this.http, url);
  }

}