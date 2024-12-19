import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthorAdminService } from '../../services/author-admin.service';
import { LibraryAdminAuthorListingComponent } from './library-admin-author-listing.component';

describe('LibraryAdminAuthorListingComponent', () => {
  let component: LibraryAdminAuthorListingComponent;
  let fixture: ComponentFixture<LibraryAdminAuthorListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LibraryAdminAuthorListingComponent
      ],
      providers: [
        AuthorAdminService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminAuthorListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
