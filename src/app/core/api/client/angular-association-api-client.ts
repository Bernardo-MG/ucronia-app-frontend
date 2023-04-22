import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ReadOperations } from "@app/core/api/client/read-operations";
import { environment } from "environments/environment";
import { AngularCreateOperations } from "./angular-create-operations";
import { AngularReadOperations } from "./angular-read-operations";
import { AssociationApiClient } from "./association-api-client";
import { CreateOperations } from "./create-operations";
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
    return new MemberQuery(this.getReadOperations(), this.getCreateOperations());
  }

  private getReadOperations(): ReadOperations {
    return new AngularReadOperations(this.http, this.rootUrl);
  }

  private getCreateOperations(): CreateOperations {
    return new AngularCreateOperations(this.http, this.rootUrl);
  }

}