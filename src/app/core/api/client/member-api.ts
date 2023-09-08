import { HttpClient } from "@angular/common/http";
import { Member } from "@app/association/models/member";
import { environment } from "environments/environment";
import { AngularRequest } from "../repository/angular-request";
import { CrudRepository } from "../repository/crud-repository";

export class MemberApi extends CrudRepository<Member> {
    
  constructor(
    private http: HttpClient
  ) { 
    super(() => new AngularRequest(this.http, environment.apiUrl + '/member'))
  }

}