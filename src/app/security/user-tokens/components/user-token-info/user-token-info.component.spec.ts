import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroupDirective, NgControl } from '@angular/forms';
import { UserTokenInfoComponent } from './user-token-info.component';

describe('UserTokenInfoComponent', () => {
  let component: UserTokenInfoComponent;
  let fixture: ComponentFixture<UserTokenInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        UserTokenInfoComponent
      ],
      providers: [
        { provide: FormGroupDirective, useValue: { form: { get: () => null } } },
        { provide: NgControl, useValue: { control: new FormControl() } }
      ]
    });
    fixture = TestBed.createComponent(UserTokenInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
