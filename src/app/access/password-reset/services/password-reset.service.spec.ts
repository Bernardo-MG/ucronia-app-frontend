import { TestBed } from '@angular/core/testing';
import { UserTokenStatus } from '@app/access/models/user-token-status';
import { AngularCrudClientProvider, CrudClient } from '@bernardo-mg/request';
import { of } from 'rxjs';
import { PasswordReset } from '../models/password-reset';
import { PasswordResetRequest } from '../models/password-reset-request';
import { PasswordResetService } from './password-reset.service';

describe('PasswordResetService', () => {
  let service: PasswordResetService;
  let client: jasmine.SpyObj<CrudClient>;
  let clientProvider: jasmine.SpyObj<AngularCrudClientProvider>;

  beforeEach(() => {
    client = jasmine.createSpyObj('CrudClient', ['create', 'read', 'appendRoute']);
    client.appendRoute.and.returnValue(client);

    clientProvider = jasmine.createSpyObj('AngularCrudClientProvider', ['url']);
    clientProvider.url.and.returnValue(client);

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        PasswordResetService,
        { provide: AngularCrudClientProvider, useValue: clientProvider }
      ]
    });

    service = TestBed.inject(PasswordResetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('request password reset', () => {

    it('should call create with PasswordResetRequest', () => {
      const request = new PasswordResetRequest('test@example.com');
      client.create.and.returnValue(of({ content: undefined }));

      service.requestResetPassword(request).subscribe();

      expect(client.create).toHaveBeenCalledWith(request);
    });

  });

  describe('reset password', () => {

    it('should append token to route', () => {
      const token = 'token';
      const reset = new PasswordReset('newpass');
      client.create.and.returnValue(of({ content: undefined }));

      service.resetPassword(token, reset).subscribe();

      expect(client.appendRoute).toHaveBeenCalledWith(`/${token}`);
    });

    it('should call create with PasswordReset', () => {
      const token = 'token';
      const reset = new PasswordReset('newpass');
      client.create.and.returnValue(of({ content: undefined }));

      service.resetPassword(token, reset).subscribe();

      expect(client.create).toHaveBeenCalledWith(reset);
    });

  });

  describe('validate token', () => {

    it('should append token to route', () => {
      const token = 'token';
      const response = { content: new UserTokenStatus(true, 'username') };
      client.read.and.returnValue(of(response));

      service.validateToken(token).subscribe((res) => {
        expect(res).toEqual(response);
      });

      expect(client.appendRoute).toHaveBeenCalledWith(`/${token}`);
    });

    it('should call create with UserTokenStatus', () => {
      const token = 'token';
      const response = { content: new UserTokenStatus(true, 'username') };
      client.read.and.returnValue(of(response));

      service.validateToken(token).subscribe((res) => {
        expect(res).toEqual(response);
      });

      expect(client.read).toHaveBeenCalled();
    });

  });

});
