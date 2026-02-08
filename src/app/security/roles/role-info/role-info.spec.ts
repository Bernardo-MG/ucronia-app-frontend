import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RoleService } from '../role-service';
import { RoleInfo } from './role-info';

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
