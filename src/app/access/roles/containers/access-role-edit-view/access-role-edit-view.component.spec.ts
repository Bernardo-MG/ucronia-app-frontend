import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@app/core/core.module';
import { FormFrameComponent } from '@app/shared/layout/components/form-frame/form-frame.component';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccessRoleFormComponent } from '../../components/access-role-form/access-role-form.component';
import { AccessRolePrivilegeFormComponent } from '../../components/access-role-privilege-form/access-role-privilege-form.component';
import { AccessRoleService } from '../../services/access-role.service';
import { AccessRoleEditViewComponent } from './access-role-edit-view.component';

describe('AccessRoleEditViewComponent', () => {
  let component: AccessRoleEditViewComponent;
  let fixture: ComponentFixture<AccessRoleEditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        FontAwesomeModule,
        PaginationModule,
        CoreModule,
        LayoutModule
      ],
      declarations: [
        AccessRoleEditViewComponent,
        FormFrameComponent,
        AccessRoleFormComponent,
        AccessRolePrivilegeFormComponent
      ],
      providers: [
        AccessRoleService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessRoleEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
