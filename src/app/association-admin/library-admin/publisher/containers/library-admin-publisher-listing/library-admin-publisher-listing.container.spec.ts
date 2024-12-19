import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublisherAdminService } from '../../services/publisher-admin.service';
import { LibraryAdminPublisherListingComponent } from './library-admin-publisher-listing.container';

describe('LibraryAdminPublisherListingComponent', () => {
  let component: LibraryAdminPublisherListingComponent;
  let fixture: ComponentFixture<LibraryAdminPublisherListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LibraryAdminPublisherListingComponent
      ],
      providers: [
        PublisherAdminService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminPublisherListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
