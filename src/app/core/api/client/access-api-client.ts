import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Privilege } from "@app/core/authentication/models/privilege";
import { Role } from "@app/core/authentication/models/role";
import { User } from "@app/core/authentication/models/user";
import { environment } from "environments/environment";
import { AngularHttpOperations } from "../repository/angular-http-operations";
import { CrudRepository } from "../repository/crud-repository";

@Injectable({
  providedIn: 'root'
})
export class AccessApiClient {

  private rootUrl = environment.apiUrl + '/security';

  constructor(
    private http: HttpClient
  ) { }

  public role(): CrudRepository<Role> {
    return new CrudRepository<Role>(new AngularHttpOperations(this.http, this.rootUrl + '/role'));
  }

  public privilege(): CrudRepository<Privilege> {
    return new CrudRepository<Privilege>(new AngularHttpOperations(this.http, this.rootUrl + '/privilege'));
  }

  public user(): CrudRepository<User> {
    return new CrudRepository<User>(new AngularHttpOperations(this.http, this.rootUrl + '/user'));
  }

}