import { HttpClient } from "@angular/common/http";
import { CrudApi } from "@app/core/api/crud-api";
import { AngularRequest } from "@app/core/api/request/angular-request";
import { environment } from "environments/environment";
import { Member } from "../membership/models/member";

export class MemberApi extends CrudApi<Member> {
    
  constructor(
    private http: HttpClient
  ) { 
    super(() => new AngularRequest(this.http, environment.apiUrl + '/member'))
  }

}