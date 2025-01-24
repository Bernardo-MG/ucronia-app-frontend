import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroupDirective, NgControl } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { UserTokenEditionContainer } from './user-token-edition.container';

describe('UserTokenEditionContainer', () => {
  let component: UserTokenEditionContainer;
  let fixture: ComponentFixture<UserTokenEditionContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserTokenEditionContainer
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

    fixture = TestBed.createComponent(UserTokenEditionContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
