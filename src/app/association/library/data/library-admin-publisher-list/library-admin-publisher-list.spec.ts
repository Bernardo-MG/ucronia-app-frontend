import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PublisherCrudService } from '../publisher-crud-service';
import { LibraryAdminPublisherList } from './library-admin-publisher-list';

describe('LibraryAdminPublisherList', () => {
  let component: LibraryAdminPublisherList;
  let fixture: ComponentFixture<LibraryAdminPublisherList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryAdminPublisherList
      ],
      providers: [
        PublisherCrudService,
        MessageService,
        ConfirmationService,
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminPublisherList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
