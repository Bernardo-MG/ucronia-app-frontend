import { HttpClient } from "@angular/common/http";
import { AssociationConfiguration } from "@app/association/configuration/models/association-configuration";
import { AngularRequest } from "@app/core/api/repository/angular-request";
import { CrudApi } from "@app/core/api/repository/crud-api";
import { environment } from "environments/environment";

export class ConfigurationApi extends CrudApi<AssociationConfiguration> {

  constructor(
    private http: HttpClient
  ) {
    super(() => new AngularRequest(this.http, environment.apiUrl + '/configuration/association'))
  }

}