import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@app/core/core.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccessUserFormComponent } from '../../components/access-user-form/access-user-form.component';
import { AccessUserInfoComponent } from '../../components/access-user-info/access-user-info.component';
import { AccessUserRoleFormComponent } from '../../components/access-user-roles/access-user-roles.component';
import { AccessUserService } from '../../services/access-user.service';
import { AccessUserDetailsComponent } from './access-user-details.component';

describe('AccessUserDetailsComponent', () => {
  let component: AccessUserDetailsComponent;
  let fixture: ComponentFixture<AccessUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        CoreModule,
        PaginationModule,
        LayoutModule,
        FontAwesomeModule
      ],
      declarations: [
        AccessUserDetailsComponent,
        AccessUserFormComponent,
        AccessUserRoleFormComponent,
        AccessUserInfoComponent
      ],
      providers: [
        AccessUserService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
