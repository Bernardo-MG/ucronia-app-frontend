import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [LoginFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the login button by default', () => {
    const button = fixture.nativeElement.querySelector('form button');
    expect(button.disabled).toEqual(true);
  });

  it('should enable the login button when the form is valid', () => {
    component.form.controls['username'].setValue('username');
    component.form.controls['password'].setValue('password');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('form button');
    expect(button.disabled).toEqual(false);
  });

});
