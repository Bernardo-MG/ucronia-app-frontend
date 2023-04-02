import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@app/core/core.module';
import { SecurityRolePrivilegeFormComponent } from './security-role-privilege-form.component';

describe('SecurityRolePrivilegeFormComponent', () => {
  let component: SecurityRolePrivilegeFormComponent;
  let fixture: ComponentFixture<SecurityRolePrivilegeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        CoreModule,
        RouterTestingModule
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
