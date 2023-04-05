import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@app/core/core.module';
import { ButtonsModule } from '@app/shared/buttons/buttons.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { SecurityRolePrivilegeFormComponent } from './security-role-privilege-form.component';

describe('SecurityRolePrivilegeFormComponent', () => {
  let component: SecurityRolePrivilegeFormComponent;
  let fixture: ComponentFixture<SecurityRolePrivilegeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        ButtonsModule,
        CoreModule,
        PaginationModule
      ],
      declarations: [
        SecurityRolePrivilegeFormComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SecurityRolePrivilegeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
