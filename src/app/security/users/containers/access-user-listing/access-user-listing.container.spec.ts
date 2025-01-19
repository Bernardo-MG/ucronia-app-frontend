import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccessUserService } from '../../services/access-user.service';
import { AccessListingContainer } from './access-user-listing.container';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AccessListingContainer', () => {
  let component: AccessListingContainer;
  let fixture: ComponentFixture<AccessListingContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RouterTestingModule,
        AccessListingContainer],
    providers: [
        AccessUserService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
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
