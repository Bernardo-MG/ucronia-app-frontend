import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserActivateUserFormComponent } from './user-activate-user-form.component';

describe('UserActivateUserFormComponent', () => {
  let component: UserActivateUserFormComponent;
  let fixture: ComponentFixture<UserActivateUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [
        UserActivateUserFormComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserActivateUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // **************************************************************************
  // General tests
  // **************************************************************************

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // **************************************************************************
  // Submit button
  // **************************************************************************

  it('should disable the submit button by default', () => {
    const button = fixture.nativeElement.querySelector('form button');
    expect(button.disabled).toEqual(true);
  });

  it('should enable the login button when the passwords match', () => {
    component.form.controls['password'].setValue('password');
    component.form.controls['confirmPassword'].setValue('password');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('form button');
    expect(button.disabled).toEqual(false);
  });

  it('should disable the login button when the passwords do not match', () => {
    component.form.controls['password'].setValue('abc');
    component.form.controls['confirmPassword'].setValue('password');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('form button');
    expect(button.disabled).toEqual(true);
  });

});
