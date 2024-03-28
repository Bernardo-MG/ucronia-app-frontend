import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserTokenFrontpageComponent } from './user-token-frontpage.component';

describe('UserTokenFrontpageComponent', () => {
  let component: UserTokenFrontpageComponent;
  let fixture: ComponentFixture<UserTokenFrontpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        UserTokenFrontpageComponent
      ]
    });
    fixture = TestBed.createComponent(UserTokenFrontpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
