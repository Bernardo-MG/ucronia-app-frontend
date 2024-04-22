import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BookService } from '../../../services/book.service';
import { LibraryBookInfoWidgetComponent } from './library-book-info-widget.component';

describe('LibraryBookInfoWidgetComponent', () => {
  let component: LibraryBookInfoWidgetComponent;
  let fixture: ComponentFixture<LibraryBookInfoWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        LibraryBookInfoWidgetComponent
      ],
      providers: [
        BookService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryBookInfoWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
