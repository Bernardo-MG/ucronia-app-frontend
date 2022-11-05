import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SecurityRoleService } from '../../service/security-role.service';

import { SecurityRoleCreateViewComponent } from './security-role-create-view.component';

describe('SecurityRoleCreateViewComponent', () => {
  let component: SecurityRoleCreateViewComponent;
  let fixture: ComponentFixture<SecurityRoleCreateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        SecurityRoleCreateViewComponent
      ],
      providers: [
        SecurityRoleService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SecurityRoleCreateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
