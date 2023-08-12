import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/core/api/models/api-response';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { PasswordReset } from '../models/password-reset';
import { PasswordResetRequest } from '../models/password-reset-request';

@Injectable()
export class PasswordResetService {

  private passwordResetRequestUrl = environment.apiUrl + "/password/reset";

  constructor(
    private http: HttpClient
  ) { }

  public requestResetPassword(request: PasswordResetRequest): Observable<ApiResponse<void>> {
    return this.http
      // Reset password request
      .post<ApiResponse<void>>(this.passwordResetRequestUrl, request);
  }

  public resetPassword(token: string, reset: PasswordReset): Observable<ApiResponse<void>> {
    return this.http
      // Validate token request
      .post<ApiResponse<void>>(`${this.passwordResetRequestUrl}/${token}`, reset);
  }

  public validateResetPasswordToken(token: string): Observable<ApiResponse<boolean>> {
    return this.http
      // Validate token request
      .get<ApiResponse<boolean>>(`${this.passwordResetRequestUrl}/${token}`);
  }

}
