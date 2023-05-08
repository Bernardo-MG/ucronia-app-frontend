import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@app/core/core.module';
import { EditionModule } from '@app/shared/edition/edition.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccessRoleFormComponent } from '../../components/access-role-form/access-role-form.component';
import { AccessRolePrivilegeFormComponent } from '../../components/access-role-privilege-form/access-role-privilege-form.component';
import { AccessRoleService } from '../../services/access-role.service';
import { AccessRoleDetailsComponent } from './access-role-details.component';

describe('AccessRoleEditComponent', () => {
  let component: AccessRoleDetailsComponent;
  let fixture: ComponentFixture<AccessRoleDetailsComponent>;

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
        LayoutModule,
        EditionModule
      ],
      declarations: [
        AccessRoleDetailsComponent,
        AccessRoleFormComponent,
        AccessRolePrivilegeFormComponent
      ],
      providers: [
        AccessRoleService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessRoleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
