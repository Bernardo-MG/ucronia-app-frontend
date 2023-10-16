import { HttpClient } from "@angular/common/http";
import { CrudApi } from "@app/core/api/crud-api";
import { AngularRequest } from "@app/core/api/request/angular-request";
import { UserToken } from "@app/core/authentication/models/user-token";
import { environment } from "environments/environment";

export class UserTokenApi extends CrudApi<UserToken> {

  constructor(
    private http: HttpClient
  ) {
    super(() => new AngularRequest(this.http, environment.apiUrl + '/security/token'))
  }

}