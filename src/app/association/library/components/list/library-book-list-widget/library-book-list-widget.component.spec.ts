import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryBookListWidgetComponent } from './library-book-list-widget.component';
import { BookService } from '../../../services/book.service';

describe('LibraryBookListWidgetComponent', () => {
  let component: LibraryBookListWidgetComponent;
  let fixture: ComponentFixture<LibraryBookListWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LibraryBookListWidgetComponent
      ],
      providers: [
        BookService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryBookListWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
