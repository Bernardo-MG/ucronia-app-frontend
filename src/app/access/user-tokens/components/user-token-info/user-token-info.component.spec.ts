import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserTokenInfoComponent } from './user-token-info.component';

describe('UserTokenInfoComponent', () => {
  let component: UserTokenInfoComponent;
  let fixture: ComponentFixture<UserTokenInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        UserTokenInfoComponent
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
