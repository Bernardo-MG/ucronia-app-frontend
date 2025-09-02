import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { AuthorCrudService } from '../../services/author-crud-service';
import { LibraryAdminAuthorListContainer } from './library-admin-author-list.component';

describe('LibraryAdminAuthorListContainer', () => {
  let component: LibraryAdminAuthorListContainer;
  let fixture: ComponentFixture<LibraryAdminAuthorListContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryAdminAuthorListContainer
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

    fixture = TestBed.createComponent(LibraryAdminAuthorListContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
