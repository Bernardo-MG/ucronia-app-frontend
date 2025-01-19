import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroupDirective, NgControl } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UserTokenEditionContainer } from './user-token-edition.container';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('UserTokenEditionContainer', () => {
  let component: UserTokenEditionContainer;
  let fixture: ComponentFixture<UserTokenEditionContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RouterTestingModule,
        UserTokenEditionContainer],
    providers: [
        { provide: FormGroupDirective, useValue: { form: { get: () => null } } },
        { provide: NgControl, useValue: { control: new FormControl() } },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
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
