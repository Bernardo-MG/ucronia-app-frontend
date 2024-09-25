import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryAdminPublisherCreateComponent } from './library-admin-publisher-create.component';
import { PublisherAdminService } from '../../../services/publisher-admin.service';

describe('LibraryAdminPublisherCreateComponent', () => {
  let component: LibraryAdminPublisherCreateComponent;
  let fixture: ComponentFixture<LibraryAdminPublisherCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LibraryAdminPublisherCreateComponent
      ],
      providers: [
        PublisherAdminService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminPublisherCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
