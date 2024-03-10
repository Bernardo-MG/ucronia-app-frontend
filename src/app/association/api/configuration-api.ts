import { HttpClient } from "@angular/common/http";
import { AssociationConfiguration } from "@app/association/configuration/models/association-configuration";
import { ApiResponse } from "@app/core/api/models/api-response";
import { AngularRequest } from "@app/core/api/request/angular-request";
import { Request } from '@app/core/api/request/request';
import { environment } from "environments/environment";
import { Observable } from "rxjs";

export class ConfigurationApi {

  constructor(
    private http: HttpClient
  ) { }

  public readOne(): Observable<ApiResponse<AssociationConfiguration>> {
    const request = this.getRequest();

    return request.read();
  }

  public update(data: AssociationConfiguration): Observable<ApiResponse<AssociationConfiguration>> {
    const request = this.getRequest();

    return request.update(data);
  }

  private getRequest(): Request {
    return new AngularRequest(this.http, environment.apiUrl + '/configuration/association');
  }

}