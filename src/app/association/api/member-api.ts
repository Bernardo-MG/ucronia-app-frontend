import { HttpClient } from "@angular/common/http";
import { Member } from "@app/association/models/member";
import { AngularRequest } from "@app/core/api/request/angular-request";
import { CrudApi } from "@app/core/api/crud-api";
import { environment } from "environments/environment";

export class MemberApi extends CrudApi<Member> {
    
  constructor(
    private http: HttpClient
  ) { 
    super(() => new AngularRequest(this.http, environment.apiUrl + '/member'))
  }

}