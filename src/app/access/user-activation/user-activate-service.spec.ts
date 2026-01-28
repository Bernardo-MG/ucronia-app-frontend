import { TestBed } from '@angular/core/testing';
import { UserTokenStatus } from '@bernardo-mg/authentication';
import { AngularCrudClientProvider, CrudClient } from '@bernardo-mg/request';
import { of } from 'rxjs';
import { AccessUserActivateService } from './user-activate-service';

describe('AccessUserActivateService', () => {
  let service: AccessUserActivateService;
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
        AccessUserActivateService,
        { provide: AngularCrudClientProvider, useValue: clientProvider }
      ]
    });
    service = TestBed.inject(AccessUserActivateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('activate user', () => {

    it('should append token to route', () => {
      const token = 'token';
      const reset = 'password';
      client.create.and.returnValue(of({ content: undefined }));

      service.activateUser(token, reset).subscribe();

      expect(client.appendRoute).toHaveBeenCalledWith(`/${token}`);
    });

    it('should call create with Password', () => {
      const token = 'token';
      const reset = 'password';
      client.create.and.returnValue(of({ content: undefined }));

      service.activateUser(token, reset).subscribe();

      expect(client.create).toHaveBeenCalledWith(reset);
    });

  });

  describe('validate token', () => {

    it('should append token to route', () => {
      const token = 'token';
      const response = { content: new UserTokenStatus(true, 'username') };
      client.read.and.returnValue(of(response));

      service.validateToken(token)
        .subscribe(res => expect(res).toEqual(response));

      expect(client.appendRoute).toHaveBeenCalledWith(`/${token}`);
    });

    it('should call read and return UserTokenStatus', () => {
      const token = 'token';
      const response = { content: new UserTokenStatus(true, 'username') };
      client.read.and.returnValue(of(response));

      service.validateToken(token)
        .subscribe(res => expect(res).toEqual(response));

      expect(client.read).toHaveBeenCalled();
    });

  });

});
