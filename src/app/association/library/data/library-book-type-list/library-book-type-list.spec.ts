import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BookTypeCrudService } from '../book-type-crud-service';
import { LibraryBookTypeList } from './library-book-type-list';

describe('LibraryBookTypeList', () => {
  let component: LibraryBookTypeList;
  let fixture: ComponentFixture<LibraryBookTypeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryBookTypeList
      ],
      providers: [
        BookTypeCrudService,
        MessageService,
        ConfirmationService,
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryBookTypeList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
