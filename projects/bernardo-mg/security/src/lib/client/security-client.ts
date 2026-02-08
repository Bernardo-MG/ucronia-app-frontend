import { HttpClient } from '@angular/common/http';
import { inject, InjectionToken } from '@angular/core';
import { AccountEndpoint } from './endpoint/account-endpoint';
import { LoginEndpoint } from './endpoint/login-endpoint';
import { PasswordEndpoint } from './endpoint/password-endpoint';
import { PermissionEndpoint } from './endpoint/permission-endpoint';
import { RoleEndpoint } from './endpoint/role-endpoint';
import { UserEndpoint } from './endpoint/user-endpoint';
import { UserTokenEndpoint } from './endpoint/user-token-endpoint';

export const SECURITY_API_BASE_URL = new InjectionToken<string>('SECURITY_API_BASE_URL');

export class SecurityClient {

  private readonly http = inject(HttpClient);
  private readonly base_url = inject(SECURITY_API_BASE_URL);

  public get login() {
    return new LoginEndpoint(this.http, this.base_url);
  }

  public get password() {
    return new PasswordEndpoint(this.http, this.base_url);
  }

  public get user() {
    return new UserEndpoint(this.http, this.base_url);
  }

  public get role() {
    return new RoleEndpoint(this.http, this.base_url);
  }

  public get permission() {
    return new PermissionEndpoint(this.http, this.base_url);
  }

  public get userToken() {
    return new UserTokenEndpoint(this.http, this.base_url);
  }

  public get account() {
    return new AccountEndpoint(this.http, this.base_url);
  }

}
