import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Privilege } from "@app/core/authentication/models/privilege";
import { Role } from "@app/core/authentication/models/role";
import { User } from "@app/core/authentication/models/user";
import { environment } from "environments/environment";
import { CrudQuery } from "./query/crud-query";

@Injectable({
  providedIn: 'root'
})
export class AccessApiClient {

  private rootUrl = environment.apiUrl + '/security';

  constructor(
    private http: HttpClient
  ) { }

  public role(): CrudQuery<Role> {
    return new CrudQuery<Role>(this.http, this.rootUrl + '/role');
  }

  public privilege(): CrudQuery<Privilege> {
    return new CrudQuery<Privilege>(this.http, this.rootUrl + '/privilege');
  }

  public user(): CrudQuery<User> {
    return new CrudQuery<User>(this.http, this.rootUrl + '/user');
  }

}