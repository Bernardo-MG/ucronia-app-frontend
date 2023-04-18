import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@app/core/core.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { AccessRolePrivilegeFormComponent } from './access-role-privilege-form.component';

describe('AccessRolePrivilegeFormComponent', () => {
  let component: AccessRolePrivilegeFormComponent;
  let fixture: ComponentFixture<AccessRolePrivilegeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        CoreModule,
        PaginationModule
      ],
      declarations: [
        AccessRolePrivilegeFormComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessRolePrivilegeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
