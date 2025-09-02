import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { PublisherCrudService } from '../../services/publisher-crud-service';
import { LibraryAdminPublisherListContainer } from './library-admin-publisher-list.container';

describe('LibraryAdminPublisherListContainer', () => {
  let component: LibraryAdminPublisherListContainer;
  let fixture: ComponentFixture<LibraryAdminPublisherListContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryAdminPublisherListContainer
      ],
      providers: [
        PublisherCrudService,
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminPublisherListContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
