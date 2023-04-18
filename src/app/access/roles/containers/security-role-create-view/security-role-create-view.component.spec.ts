import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IconsModule } from '@app/shared/icons/icons.module';
import { FormFrameComponent } from '@app/shared/layout/components/form-frame/form-frame.component';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SecurityRoleFormComponent } from '../../components/security-role-form/security-role-form.component';
import { SecurityRoleService } from '../../services/security-role.service';
import { SecurityRoleCreateViewComponent } from './security-role-create-view.component';

describe('SecurityRoleCreateViewComponent', () => {
  let component: SecurityRoleCreateViewComponent;
  let fixture: ComponentFixture<SecurityRoleCreateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        IconsModule,
        LayoutModule
      ],
      declarations: [
        SecurityRoleCreateViewComponent,
        FormFrameComponent,
        SecurityRoleFormComponent
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
