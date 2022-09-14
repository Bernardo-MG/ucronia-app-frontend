import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DeleteOperations } from "./delete-operations";
import { ReadOperations } from "./read-operations";
import { CreateOperations } from "./create-operations";
import { UpdateOperations } from "./update-operations";

@Injectable({
  providedIn: 'root'
})
export class RequestClient {

  constructor(
    private http: HttpClient
  ) { }

  public create<T>(url: string): CreateOperations<T> {
    return new CreateOperations(this.http, url);
  }

  public delete<T>(url: string): DeleteOperations<T> {
    return new DeleteOperations(this.http, url);
  }

  public read<T>(url: string): ReadOperations<T> {
    return new ReadOperations(this.http, url);
  }

  public update<T>(url: string): UpdateOperations<T> {
    return new UpdateOperations(this.http, url);
  }

}