import { HttpClient } from "@angular/common/http";
import { CrudApi } from "@app/core/api/crud-api";
import { AngularRequest } from "@app/core/api/request/angular-request";
import { Permission } from "@app/core/authentication/models/permission";
import { environment } from "environments/environment";

export class PermissionApi extends CrudApi<Permission> {

  constructor(
    private http: HttpClient
  ) {
    super(() => new AngularRequest(this.http, environment.apiUrl + '/security/permission'))
  }

}