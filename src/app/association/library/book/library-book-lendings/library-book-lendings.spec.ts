import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BookLending, LentBook } from '@ucronia/domain';
import { LibraryBookLendings } from './library-book-lendings';

describe('LibraryBookLendings', () => {
  let component: LibraryBookLendings;
  let fixture: ComponentFixture<LibraryBookLendings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryBookLendings
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryBookLendings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct number of rows', () => {
    const lendings: BookLending[] = [
      { book: new LentBook(), borrower: 1, lendingDate: new Date('2024-01-01'), returnDate: new Date('2024-01-05'), days: 4 },
      { book: new LentBook(), borrower: 2, lendingDate: new Date('2024-02-01'), returnDate: new Date('2024-02-10'), days: 9 },
    ];

    component.lendings = lendings;
    component.borrowerNames = { 1: 'John Doe', 2: 'Jane Smith' };
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('.p-timeline-event > .p-timeline-event-content'));
    expect(rows.length).toBe(lendings.length * 2);
  });

  it('should display the correct data in each row', () => {
    const lendings: BookLending[] = [
      { book: new LentBook(), borrower: 1, lendingDate: new Date('2024-01-01'), returnDate: new Date('2024-01-05'), days: 4 },
    ];

    component.lendings = lendings;
    component.borrowerNames = { 1: 'John Doe' };
    fixture.detectChanges();

    const dates = fixture.debugElement.queryAll(By.css('.p-timeline-event > .p-timeline-event-content'));

    expect(dates.length).toBe(2);

    expect(dates[0].nativeElement.textContent.trim()).toBe('2024-01-01');
    expect(dates[1].nativeElement.textContent.trim()).toBe('2024-01-05');

    const names = fixture.debugElement.queryAll(By.css('.p-timeline-event > .p-timeline-event-opposite'));

    expect(names.length).toBe(2);

    expect(names[0].nativeElement.textContent.trim()).toBe('John Doe');
    expect(names[1].nativeElement.textContent.trim()).toBe('John Doe');
  });

  it('should not show anything when there is no data', () => {
    component.lendings = [];
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('.p-timeline-event > .p-timeline-event-content'));
    expect(rows.length).toBe(0);
  });

});
