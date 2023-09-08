import { HttpClient } from "@angular/common/http";
import { AssociationConfiguration } from "@app/association/configuration/models/association-configuration";
import { environment } from "environments/environment";
import { AngularRequest } from "../repository/angular-request";
import { CrudApi } from "../repository/crud-api";

export class ConfigurationApi extends CrudApi<AssociationConfiguration> {

  constructor(
    private http: HttpClient
  ) {
    super(() => new AngularRequest(this.http, environment.apiUrl + '/configuration/association'))
  }

}