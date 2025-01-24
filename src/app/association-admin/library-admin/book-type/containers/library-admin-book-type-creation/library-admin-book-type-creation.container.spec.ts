import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BookTypeAdminService } from '../../services/book-type-admin.service';
import { LibraryAdminBookTypeCreateContainer } from './library-admin-book-type-creation.container';

describe('LibraryAdminBookTypeCreateContainer', () => {
  let component: LibraryAdminBookTypeCreateContainer;
  let fixture: ComponentFixture<LibraryAdminBookTypeCreateContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryAdminBookTypeCreateContainer
      ],
      providers: [
        BookTypeAdminService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminBookTypeCreateContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

