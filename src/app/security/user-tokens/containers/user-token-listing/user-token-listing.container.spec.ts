import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserTokenListingContainer } from './user-token-listing.container';

describe('UserTokenListingContainer', () => {
  let component: UserTokenListingContainer;
  let fixture: ComponentFixture<UserTokenListingContainer>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        UserTokenListingContainer
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
