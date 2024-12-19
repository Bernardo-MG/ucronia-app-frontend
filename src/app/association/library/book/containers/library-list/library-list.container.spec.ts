import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BookService } from '../../services/book.service';
import { LibraryListContainer } from './library-list.container';

describe('LibraryListContainer', () => {
  let component: LibraryListContainer;
  let fixture: ComponentFixture<LibraryListContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        LibraryListContainer
      ],
      providers: [
        BookService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryListContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
