import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroupDirective, NgControl } from '@angular/forms';
import { UserTokenInfo } from './user-token-info';

describe('UserTokenInfoComponent', () => {
  let component: UserTokenInfo;
  let fixture: ComponentFixture<UserTokenInfo>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        UserTokenInfo
      ],
      providers: [
        { provide: FormGroupDirective, useValue: { form: { get: () => null } } },
        { provide: NgControl, useValue: { control: new FormControl() } }
      ]
    });
    fixture = TestBed.createComponent(UserTokenInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
