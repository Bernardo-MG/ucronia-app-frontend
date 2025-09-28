import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PublisherCrudService } from '../publisher-crud-service';
import { LibraryPublisherList } from './library-publisher-list';

describe('LibraryPublisherList', () => {
  let component: LibraryPublisherList;
  let fixture: ComponentFixture<LibraryPublisherList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryPublisherList
      ],
      providers: [
        PublisherCrudService,
        MessageService,
        ConfirmationService,
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryPublisherList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
