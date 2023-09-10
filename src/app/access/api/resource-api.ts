import { HttpClient } from "@angular/common/http";
import { ReadApi } from "@app/core/api/read-api";
import { AngularRequest } from "@app/core/api/request/angular-request";
import { Role } from "@app/core/authentication/models/role";
import { environment } from "environments/environment";

export class ResourceApi extends ReadApi<Role> {

  constructor(
    private http: HttpClient
  ) {
    super(() => new AngularRequest(this.http, environment.apiUrl + '/security/resource'))
  }

}