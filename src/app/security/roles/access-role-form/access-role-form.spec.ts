import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AccessRoleForm } from './access-role-form';

describe('AccessRoleForm', () => {
  let component: AccessRoleForm;
  let fixture: ComponentFixture<AccessRoleForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        AccessRoleForm
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessRoleForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
