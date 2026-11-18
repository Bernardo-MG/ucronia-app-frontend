import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RoleService } from '../role-service';
import { RoleInfo } from './role-info';
import { Role } from '@bernardo-mg/authentication';

describe('RoleInfo', () => {
  let component: RoleInfo;
  let fixture: ComponentFixture<RoleInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RoleInfo
      ],
      providers: [
        RoleService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RoleInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('RoleInfo permission options', () => {
  it('shows every permission and disables search', fakeAsync(() => {
    const permissions = [
      { name: 'book:read', resource: 'book', action: 'read' },
      { name: 'fee:update', resource: 'fee', action: 'update' }
    ];
    TestBed.configureTestingModule({ imports: [RoleInfo] });
    const fixture = TestBed.createComponent(RoleInfo);
    fixture.componentRef.setInput('data', new Role('Reader', permissions));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(fixture.componentInstance.permissionGroups.flatMap(group => group.permissions)).toEqual(permissions);
    expect(fixture.nativeElement.querySelector('input[type="search"]').disabled).toBeTrue();
  }));
});
