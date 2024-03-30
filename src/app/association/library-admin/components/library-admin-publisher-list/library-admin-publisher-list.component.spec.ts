import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryAdminPublisherListComponent } from './library-admin-publisher-list.component';
import { PublisherAdminService } from '../../services/publisher-admin.service';

describe('LibraryAdminPublisherListComponent', () => {
  let component: LibraryAdminPublisherListComponent;
  let fixture: ComponentFixture<LibraryAdminPublisherListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LibraryAdminPublisherListComponent
      ],
      providers: [
        PublisherAdminService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminPublisherListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
