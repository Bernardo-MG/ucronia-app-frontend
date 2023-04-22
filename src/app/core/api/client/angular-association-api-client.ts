import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ReadOperations } from "@app/core/api/client/read-operations";
import { environment } from "environments/environment";
import { AngularReadOperations } from "./angular-read-operations";
import { AssociationApiClient } from "./association-api-client";
import { MemberQuery } from "./query/member-query";

@Injectable({
  providedIn: 'root'
})
export class AngularAssociationApiClient implements AssociationApiClient {

  private rootUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  public member(): MemberQuery {
    return new MemberQuery(this.getOperations());
  }

  private getOperations(): ReadOperations {
    return new AngularReadOperations(this.http, this.rootUrl);
  }

}