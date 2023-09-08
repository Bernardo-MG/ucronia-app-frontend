import { HttpClient } from "@angular/common/http";
import { Member } from "@app/association/models/member";
import { environment } from "environments/environment";
import { AngularRequest } from "../repository/angular-request";
import { CrudApi } from "../repository/crud-api";

export class MemberApi extends CrudApi<Member> {
    
  constructor(
    private http: HttpClient
  ) { 
    super(() => new AngularRequest(this.http, environment.apiUrl + '/member'))
  }

}