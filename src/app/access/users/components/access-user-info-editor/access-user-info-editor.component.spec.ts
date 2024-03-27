import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@app/core/core.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { AccessUserInfoComponent } from '../access-user-info/access-user-info.component';
import { AccessUserRoleFormComponent } from '../access-user-roles/access-user-roles.component';
import { AccessUserService } from '../../services/access-user.service';
import { AccessUserFormComponent } from '../access-user-form/access-user-form.component';
import { AccessUserInfoEditorComponent } from './access-user-info-editor.component';

describe('AccessUserInfoEditorComponent', () => {
  let component: AccessUserInfoEditorComponent;
  let fixture: ComponentFixture<AccessUserInfoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        CoreModule,
        LayoutModule,
        IconsModule,
        AccessUserInfoEditorComponent,
        AccessUserFormComponent,
        AccessUserRoleFormComponent,
        AccessUserInfoComponent
      ],
      providers: [
        AccessUserService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessUserInfoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
