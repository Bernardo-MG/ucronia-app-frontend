import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/core/api/models/api-response';
import { environment } from 'environments/environment';
import { PasswordResetRequest } from '../models/password-reset-request';

@Injectable()
export class PasswordRestService {

  private passwordResetUrl = environment.apiUrl + "/password/reset";

  private passwordResetValidationUrl = environment.apiUrl + "/password/reset/token";

  constructor(
    private http: HttpClient
  ) { }

  public resetPassword(request: PasswordResetRequest) {
    return this.http
      // Reset password request
      .post<ApiResponse<void>>(this.passwordResetUrl, request);
  }

  public validateResetPasswordToken(token: string) {
    return this.http
      // Validate token request
      .get<ApiResponse<void>>(`${this.passwordResetValidationUrl}/${token}`);
  }

}
