import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Action } from "@app/core/authentication/models/action";
import { Permission } from "@app/core/authentication/models/permission";
import { Resource } from "@app/core/authentication/models/resource";
import { Role } from "@app/core/authentication/models/role";
import { User } from "@app/core/authentication/models/user";
import { environment } from "environments/environment";
import { AngularRequest } from "../repository/angular-request";
import { CrudRepository } from "../repository/crud-repository";
import { RelationshipRepository } from "../repository/relationship-repository";

@Injectable({
  providedIn: 'root'
})
export class AccessApiClient {

  private rootUrl = environment.apiUrl + '/security';

  constructor(
    private http: HttpClient
  ) { }

  public role(): CrudRepository<Role> {
    return new CrudRepository<Role>(() => new AngularRequest(this.http, this.rootUrl + '/role'));
  }

  public rolePermissions(id: number): CrudRepository<Permission> {
    return new CrudRepository<Permission>(() => new AngularRequest(this.http, this.rootUrl + `/role/${id}/permission`));
  }

  public rolePermission(role: number, resource: number, action: number): CrudRepository<Permission> {
    return new CrudRepository<Permission>(() => new AngularRequest(this.http, this.rootUrl + `/role/${role}/permission/${resource}/${action}`));
  }

  public action(): CrudRepository<Action> {
    return new CrudRepository<Action>(() => new AngularRequest(this.http, this.rootUrl + '/action'));
  }

  public resource(): CrudRepository<Resource> {
    return new CrudRepository<Resource>(() => new AngularRequest(this.http, this.rootUrl + '/resource'));
  }

  public user(): CrudRepository<User> {
    return new CrudRepository<User>(() => new AngularRequest(this.http, this.rootUrl + '/user'));
  }

  public userRoles(id: number): RelationshipRepository<Role> {
    return new RelationshipRepository<Role>(() => new AngularRequest(this.http, this.rootUrl + `/user/${id}/role`));
  }

}