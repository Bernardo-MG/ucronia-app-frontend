import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BookService } from '../../../services/book.service';
import { LibraryBookInfoContainer } from './library-book-info.container';

describe('LibraryBookInfoContainer', () => {
  let component: LibraryBookInfoContainer;
  let fixture: ComponentFixture<LibraryBookInfoContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        LibraryBookInfoContainer
      ],
      providers: [
        BookService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryBookInfoContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
