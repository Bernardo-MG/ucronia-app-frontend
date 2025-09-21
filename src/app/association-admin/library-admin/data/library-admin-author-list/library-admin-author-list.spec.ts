import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { AuthorCrudService } from '../author-crud-service';
import { LibraryAdminAuthorList } from './library-admin-author-list';

describe('LibraryAdminAuthorListContainer', () => {
  let component: LibraryAdminAuthorList;
  let fixture: ComponentFixture<LibraryAdminAuthorList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryAdminAuthorList
      ],
      providers: [
        AuthorCrudService,
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminAuthorList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
