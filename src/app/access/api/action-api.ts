import { HttpClient } from "@angular/common/http";
import { CrudApi } from "@app/core/api/crud-api";
import { AngularRequest } from "@app/core/api/request/angular-request";
import { Role } from "@app/core/authentication/models/role";
import { environment } from "environments/environment";

export class ActionApi extends CrudApi<Role> {

  constructor(
    private http: HttpClient
  ) {
    super(() => new AngularRequest(this.http, environment.apiUrl + '/action'))
  }

}