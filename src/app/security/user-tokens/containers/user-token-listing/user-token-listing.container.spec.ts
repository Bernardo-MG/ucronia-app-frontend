import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserTokenListingContainer } from './user-token-listing.container';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('UserTokenListingContainer', () => {
  let component: UserTokenListingContainer;
  let fixture: ComponentFixture<UserTokenListingContainer>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [RouterTestingModule,
        UserTokenListingContainer],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    fixture = TestBed.createComponent(UserTokenListingContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
