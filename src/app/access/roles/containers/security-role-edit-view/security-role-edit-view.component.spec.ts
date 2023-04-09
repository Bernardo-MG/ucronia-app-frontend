import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DataFormComponent } from '@app/shared/data/components/form-frame/form-frame.component';
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
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        FontAwesomeModule,
        PaginationModule,
        CoreModule
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
