import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookLending, GameBook } from '@ucronia/domain';
import { LibraryBookInfo } from './library-book-info';

describe('LibraryBookInfo', () => {
  let component: LibraryBookInfo;
  let fixture: ComponentFixture<LibraryBookInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryBookInfo
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryBookInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('opens lending details from the visible history without expanding a disclosure', () => {
    const lending = new BookLending();
    lending.borrower = 7;
    const book = new GameBook();
    book.lendings = [lending];
    fixture.componentRef.setInput('book', book);
    fixture.componentRef.setInput('borrowerNames', { 7: 'Ana Martín' });
    fixture.detectChanges();
    const show = jasmine.createSpy('showLending');
    component.showLending.subscribe(show);
    fixture.nativeElement.querySelector('button[aria-label="Ver préstamo de Ana Martín"]').click();
    expect(show).toHaveBeenCalledOnceWith(lending);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
