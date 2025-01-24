import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthorAdminService } from '../../services/author-admin.service';
import { LibraryAdminAuthorCreateContainer } from './library-admin-author-creation.container';

describe('LibraryAdminAuthorCreateContainer', () => {
  let component: LibraryAdminAuthorCreateContainer;
  let fixture: ComponentFixture<LibraryAdminAuthorCreateContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryAdminAuthorCreateContainer
      ],
      providers: [
        AuthorAdminService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminAuthorCreateContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
