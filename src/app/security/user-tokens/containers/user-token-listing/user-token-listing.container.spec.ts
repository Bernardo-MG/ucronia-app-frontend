import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { UserTokenListingContainer } from './user-token-listing.container';

describe('UserTokenListingContainer', () => {
  let component: UserTokenListingContainer;
  let fixture: ComponentFixture<UserTokenListingContainer>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        UserTokenListingContainer
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    });
    fixture = TestBed.createComponent(UserTokenListingContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
