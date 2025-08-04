import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { UserTokenListContainer } from './user-token-list.container';

describe('UserTokenListContainer', () => {
  let component: UserTokenListContainer;
  let fixture: ComponentFixture<UserTokenListContainer>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        UserTokenListContainer
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    });
    fixture = TestBed.createComponent(UserTokenListContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
