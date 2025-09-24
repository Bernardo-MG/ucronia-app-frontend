import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroupDirective, NgControl } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { UserTokenExtendForm } from './user-token-extend-form';

describe('UserTokenEdition', () => {
  let component: UserTokenExtendForm;
  let fixture: ComponentFixture<UserTokenExtendForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserTokenExtendForm
      ],
      providers: [
        { provide: FormGroupDirective, useValue: { form: { get: () => null } } },
        { provide: NgControl, useValue: { control: new FormControl() } },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserTokenExtendForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
