import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { AccessRoleService } from '../../services/access-role.service';
import { AccessRoleFormComponent } from '../access-role-form/access-role-form.component';
import { AccessRoleCreateComponent } from './access-role-create.component';

describe('AccessRoleCreateComponent', () => {
  let component: AccessRoleCreateComponent;
  let fixture: ComponentFixture<AccessRoleCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        LayoutModule
      ],
      declarations: [
        AccessRoleCreateComponent,
        AccessRoleFormComponent
      ],
      providers: [
        AccessRoleService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessRoleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
