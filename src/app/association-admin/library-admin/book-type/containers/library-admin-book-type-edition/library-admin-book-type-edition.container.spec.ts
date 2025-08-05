import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BookTypeAdminService } from '../../services/book-type-admin.service';
import { LibraryAdminBookTypeInfoEditorContainer } from './library-admin-book-type-edition.container';

describe('LibraryAdminBookTypeInfoEditorContainer', () => {
  let component: LibraryAdminBookTypeInfoEditorContainer;
  let fixture: ComponentFixture<LibraryAdminBookTypeInfoEditorContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryAdminBookTypeInfoEditorContainer
      ],
      providers: [
        BookTypeAdminService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminBookTypeInfoEditorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
