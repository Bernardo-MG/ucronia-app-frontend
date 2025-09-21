import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookService } from '../book-service';
import { LibraryList } from './library-list';

describe('LibraryList', () => {
  let component: LibraryList;
  let fixture: ComponentFixture<LibraryList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryList
      ],
      providers: [
        BookService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
