import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublisherAdminService } from '../../services/publisher-admin.service';
import { LibraryAdminPublisherListingContainer } from './library-admin-publisher-listing.container';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('LibraryAdminPublisherListingContainer', () => {
  let component: LibraryAdminPublisherListingContainer;
  let fixture: ComponentFixture<LibraryAdminPublisherListingContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [LibraryAdminPublisherListingContainer],
    providers: [
        PublisherAdminService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminPublisherListingContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
