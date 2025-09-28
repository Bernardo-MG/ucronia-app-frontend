import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthorCrudService } from '../author-crud-service';
import { LibraryAuthorList } from './library-author-list';

describe('LibraryAuthorList', () => {
  let component: LibraryAuthorList;
  let fixture: ComponentFixture<LibraryAuthorList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryAuthorList
      ],
      providers: [
        AuthorCrudService,
        MessageService,
        ConfirmationService,
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAuthorList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
