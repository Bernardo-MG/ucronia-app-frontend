import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PublisherAdminService } from '../../services/publisher-admin.service';
import { LibraryAdminPublisherCreateContainer } from './library-admin-publisher-creation.container';

describe('LibraryAdminPublisherCreateContainer', () => {
  let component: LibraryAdminPublisherCreateContainer;
  let fixture: ComponentFixture<LibraryAdminPublisherCreateContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [
        LibraryAdminPublisherCreateContainer
      ],
    providers: [
        PublisherAdminService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
    ]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminPublisherCreateContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
