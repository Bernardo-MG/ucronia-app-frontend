import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DataFormComponent } from '@app/core/components/data-form/data-form.component';
import { CoreModule } from '@app/core/core.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SecurityRoleFormComponent } from '../../components/security-role-form/security-role-form.component';
import { SecurityRolePrivilegeFormComponent } from '../../components/security-role-privilege-form/security-role-privilege-form.component';
import { SecurityRoleService } from '../../services/security-role.service';
import { SecurityRoleEditViewComponent } from './security-role-edit-view.component';

describe('SecurityRoleEditViewComponent', () => {
  let component: SecurityRoleEditViewComponent;
  let fixture: ComponentFixture<SecurityRoleEditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FontAwesomeModule,
        CoreModule,
        ReactiveFormsModule,
        PaginationModule
      ],
      declarations: [
        SecurityRoleEditViewComponent,
        DataFormComponent,
        SecurityRoleFormComponent,
        SecurityRolePrivilegeFormComponent
      ],
      providers: [
        SecurityRoleService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SecurityRoleEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
