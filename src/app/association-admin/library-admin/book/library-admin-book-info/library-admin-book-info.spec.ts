import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { BookAdminService } from '../book-admin-service';
import { LibraryAdminBookInfo } from './library-admin-book-info';

describe('LibraryAdminBookInfo', () => {
  let component: LibraryAdminBookInfo;
  let fixture: ComponentFixture<LibraryAdminBookInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryAdminBookInfo
      ],
      providers: [
        BookAdminService,
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminBookInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
