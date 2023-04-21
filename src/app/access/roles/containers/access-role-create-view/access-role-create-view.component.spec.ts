import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { EditionModule } from '@app/shared/edition/edition.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccessRoleFormComponent } from '../../components/access-role-form/access-role-form.component';
import { AccessRoleService } from '../../services/access-role.service';
import { AccessRoleCreateViewComponent } from './access-role-create-view.component';

describe('AccessRoleCreateViewComponent', () => {
  let component: AccessRoleCreateViewComponent;
  let fixture: ComponentFixture<AccessRoleCreateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        IconsModule,
        LayoutModule,
        EditionModule
      ],
      declarations: [
        AccessRoleCreateViewComponent,
        AccessRoleFormComponent
      ],
      providers: [
        AccessRoleService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessRoleCreateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
