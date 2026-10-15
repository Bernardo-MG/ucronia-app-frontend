import { TestBed } from '@angular/core/testing';
import { BookLending } from '@ucronia/domain';
import { LibraryLendingInfo } from './library-lending-info';

describe('LibraryLendingInfo', () => {
  it('shows active lending details and falls back to the borrower number', async () => {
    await TestBed.configureTestingModule({ imports: [LibraryLendingInfo] }).compileComponents();
    const fixture = TestBed.createComponent(LibraryLendingInfo);
    const lending = new BookLending();
    lending.book.title.fullTitle = 'Lent book';
    lending.book.number = 42;
    lending.borrower = 7;
    lending.lendingDate = new Date(2026, 9, 1);
    lending.days = 13;
    fixture.componentRef.setInput('lending', lending);
    fixture.detectChanges();
    const details = () => Array.from(fixture.nativeElement.querySelectorAll('dd')).map(item => (item as HTMLElement).textContent!.trim());
    expect(details()).toEqual(['Lent book', '42', '7', 'Prestado', '2026-10-01', 'Pendiente', '13']);

    lending.returnDate = new Date(2026, 9, 14);
    fixture.componentRef.setInput('lending', { ...lending });
    fixture.componentRef.setInput('borrowerName', 'Member name');
    fixture.detectChanges();
    expect(details()).toEqual(['Lent book', '42', 'Member name', 'Devuelto', '2026-10-01', '2026-10-14', '13']);
  });
});
