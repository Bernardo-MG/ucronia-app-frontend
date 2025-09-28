import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { LibraryService } from '../library-service';
import { LibraryBookInfo } from './library-book-info';

describe('LibraryBookInfo', () => {
  let component: LibraryBookInfo;
  let fixture: ComponentFixture<LibraryBookInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryBookInfo
      ],
      providers: [
        LibraryService,
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryBookInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
