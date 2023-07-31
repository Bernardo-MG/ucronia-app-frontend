import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/core/api/models/api-response';
import { environment } from 'environments/environment';
import { PasswordReset } from '../models/password-reset';
import { PasswordResetRequest } from '../models/password-reset-request';

@Injectable()
export class PasswordResetService {

  private passwordResetRequestUrl = environment.apiUrl + "/password/reset";

  private passwordResetTokenValidationUrl = environment.apiUrl + "/password/reset";

  private passwordResetUrl = environment.apiUrl + "/password/reset/change";

  constructor(
    private http: HttpClient
  ) { }

  public requestResetPassword(request: PasswordResetRequest) {
    return this.http
      // Reset password request
      .post<ApiResponse<void>>(this.passwordResetRequestUrl, request);
  }

  public resetPassword(reset: PasswordReset) {
    return this.http
      // Validate token request
      .post<ApiResponse<void>>(this.passwordResetUrl, reset);
  }

  public validateResetPasswordToken(token: string) {
    return this.http
      // Validate token request
      .get<ApiResponse<void>>(`${this.passwordResetTokenValidationUrl}/${token}`);
  }

}
