import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AccessUserService } from '../../services/access-user.service';
import { AccessListingContainer } from './access-user-listing.container';

describe('AccessListingContainer', () => {
  let component: AccessListingContainer;
  let fixture: ComponentFixture<AccessListingContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AccessListingContainer
      ],
      providers: [
        AccessUserService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessListingContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
