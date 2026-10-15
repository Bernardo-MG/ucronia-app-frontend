import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookLending } from '@ucronia/domain';
import { LibraryBookLendings } from './library-book-lendings';

describe('LibraryBookLendings', () => {
  let fixture: ComponentFixture<LibraryBookLendings>;
  const loan = (borrower: number, date: string, returned?: string) => Object.assign(new BookLending(), {
    borrower, lendingDate: new Date(date), returnDate: returned ? new Date(returned) : undefined, days: 14
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [LibraryBookLendings] }).compileComponents();
    fixture = TestBed.createComponent(LibraryBookLendings);
  });

  it('groups each loan into one entry, sorts active loans first, and keeps source order intact', () => {
    const old = loan(1, '2026-08-01', '2026-08-15');
    const recent = loan(2, '2026-09-01', '2026-09-15');
    const active = loan(3, '2026-10-01');
    const source = [old, active, recent];
    fixture.componentRef.setInput('lendings', source);
    fixture.componentRef.setInput('borrowerNames', { 1: 'Laura García', 2: 'Carlos Ruiz', 3: 'Ana Martín' });
    fixture.detectChanges();
    const rows = fixture.nativeElement.querySelectorAll('article');
    expect(rows.length).toBe(3);
    expect(rows[0].textContent).toContain('Ana Martín');
    expect(rows[0].textContent).toContain('Activo');
    expect(rows[0].textContent).toContain('Devolución pendiente');
    expect(rows[1].textContent).toContain('Carlos Ruiz');
    expect(rows[1].textContent).toContain('Devuelto');
    expect(fixture.componentInstance.history()[1].lending).toBe(recent);
    expect(source).toEqual([old, active, recent]);
  });

  it('emits the original lending when its eye button is clicked', () => {
    const lending = loan(1, '2026-10-01');
    fixture.componentRef.setInput('lendings', [lending]);
    fixture.detectChanges();
    const show = jasmine.createSpy('showLending');
    fixture.componentInstance.showLending.subscribe(show);
    fixture.nativeElement.querySelector('button').click();
    expect(show).toHaveBeenCalledOnceWith(lending);
  });

  it('updates borrower labels and initials when names arrive', () => {
    fixture.componentRef.setInput('lendings', [loan(7, '2026-10-01')]);
    fixture.detectChanges();
    expect(fixture.componentInstance.history()[0].borrower).toBe('7');
    fixture.componentRef.setInput('borrowerNames', { 7: 'Ana Martín' });
    fixture.detectChanges();
    expect(fixture.componentInstance.history()[0].borrower).toBe('Ana Martín');
    expect(fixture.componentInstance.history()[0].initials).toBe('AM');
  });

  it('shows an empty state without any history rows', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('article').length).toBe(0);
    expect(fixture.nativeElement.textContent).toContain('Este libro todavía no tiene préstamos.');
    expect(fixture.nativeElement.textContent).toContain('0 préstamos');
  });
});
