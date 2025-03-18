import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryBookLendingsComponent } from './library-book-lendings.component';
import { By } from '@angular/platform-browser';
import { BookLending } from '@app/models/library/book-lending';
import { LentBook } from '@app/models/library/lent-book';

describe('LibraryBookLendingsComponent', () => {
  let component: LibraryBookLendingsComponent;
  let fixture: ComponentFixture<LibraryBookLendingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryBookLendingsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryBookLendingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct number of rows', () => {
    const lendings: BookLending[] = [
      { book: new LentBook(), borrower: { number: 0, name: { firstName: '', lastName: '', fullName: 'John Doe' } }, lendingDate: '2024-01-01', returnDate: '2024-01-05', days: 4 },
      { book: new LentBook(), borrower: { number: 0, name: { firstName: '', lastName: '', fullName: 'Jane Smith' } }, lendingDate: '2024-02-01', returnDate: '2024-02-10', days: 9 },
    ];

    component.lendings = lendings;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(lendings.length);
  });

  it('should display the correct data in each row', () => {
    const lendings: BookLending[] = [
      { book: new LentBook(), borrower: { number: 0, name: { firstName: '', lastName: '', fullName: 'John Doe' } }, lendingDate: '2024-01-01', returnDate: '2024-01-05', days: 4 },
    ];

    component.lendings = lendings;
    fixture.detectChanges();

    const row = fixture.debugElement.query(By.css('tbody tr'));
    const cells = row.queryAll(By.css('td'));

    expect(cells[0].nativeElement.textContent.trim()).toBe('John Doe');
    expect(cells[1].nativeElement.textContent.trim()).toBe('2024-01-01');
    expect(cells[2].nativeElement.textContent.trim()).toBe('2024-01-05');
    expect(cells[3].nativeElement.textContent.trim()).toBe('4');
  });

  it('should not show anything when there is no data', () => {
    component.lendings = [];
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(0);
  });

});
