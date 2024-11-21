import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookAdminService } from '../../services/book-admin.service';
import { LibraryAdminBookListContainer } from './library-admin-book-list.container';

describe('LibraryAdminBookListContainer', () => {
  let component: LibraryAdminBookListContainer;
  let fixture: ComponentFixture<LibraryAdminBookListContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LibraryAdminBookListContainer
      ],
      providers: [
        BookAdminService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminBookListContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
