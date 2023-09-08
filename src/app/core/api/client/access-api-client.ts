import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Action } from "@app/core/authentication/models/action";
import { Permission } from "@app/core/authentication/models/permission";
import { Resource } from "@app/core/authentication/models/resource";
import { Role } from "@app/core/authentication/models/role";
import { User } from "@app/core/authentication/models/user";
import { environment } from "environments/environment";
import { AngularRequest } from "../request/angular-request";
import { CrudApi } from "../crud-api";
import { RelationshipRepository } from "../repository/relationship-repository";

@Injectable({
  providedIn: 'root'
})
export class AccessApiClient {

  private rootUrl = environment.apiUrl + '/security';

  constructor(
    private http: HttpClient
  ) { }

  public role(): CrudApi<Role> {
    return new CrudApi<Role>(() => new AngularRequest(this.http, this.rootUrl + '/role'));
  }

  public rolePermissions(id: number): CrudApi<Permission> {
    return new CrudApi<Permission>(() => new AngularRequest(this.http, this.rootUrl + `/role/${id}/permission`));
  }

  public rolePermission(role: number, resource: number, action: number): CrudApi<Permission> {
    return new CrudApi<Permission>(() => new AngularRequest(this.http, this.rootUrl + `/role/${role}/permission/${resource}/${action}`));
  }

  public action(): CrudApi<Action> {
    return new CrudApi<Action>(() => new AngularRequest(this.http, this.rootUrl + '/action'));
  }

  public resource(): CrudApi<Resource> {
    return new CrudApi<Resource>(() => new AngularRequest(this.http, this.rootUrl + '/resource'));
  }

  public user(): CrudApi<User> {
    return new CrudApi<User>(() => new AngularRequest(this.http, this.rootUrl + '/user'));
  }

  public userRoles(id: number): RelationshipRepository<Role> {
    return new RelationshipRepository<Role>(() => new AngularRequest(this.http, this.rootUrl + `/user/${id}/role`));
  }

}