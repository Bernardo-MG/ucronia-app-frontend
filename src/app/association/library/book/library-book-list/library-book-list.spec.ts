import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LibraryService } from '../library-service';
import { LibraryBookList } from './library-book-list';

describe('LibraryBookList', () => {
  let component: LibraryBookList;
  let fixture: ComponentFixture<LibraryBookList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryBookList
      ],
      providers: [
        LibraryService,
        MessageService,
        ConfirmationService,
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryBookList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
