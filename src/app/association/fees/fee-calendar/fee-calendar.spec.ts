import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { startOfMonth, subMonths } from 'date-fns';
import { MemberFees } from '../domain/member-fees';
import { FeeCalendar } from './fee-calendar';

describe('FeeCalendar', () => {
  let fixture: ComponentFixture<FeeCalendar>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FeeCalendar],
      providers: [provideNoopAnimations()]
    });
    fixture = TestBed.createComponent(FeeCalendar);
  });

  it('applies six months including the current local month by default', () => {
    const currentMonth = startOfMonth(new Date());
    fixture.componentRef.setInput('period', { start: currentMonth, end: currentMonth });
    fixture.detectChanges();

    const changed = spyOn(fixture.componentInstance.periodChange, 'emit');
    fixture.nativeElement.querySelector('p-button button').click();

    expect(changed).toHaveBeenCalledOnceWith({ start: subMonths(currentMonth, 5), end: currentMonth });
  });

  it('renders full names and keeps the original fee date when selecting a month across years', () => {
    const row = new MemberFees();
    row.member.number = 123;
    row.member.name.fullName = 'Alejandro Pérez de la Fuente';
    const date = new Date(2025, 0, 1);
    row.fees = [{ month: date, paid: true }];
    fixture.componentRef.setInput('period', { start: new Date(2024, 11, 1), end: new Date(2025, 0, 1) });
    fixture.componentRef.setInput('feeCalendar', [row]);
    const selected = spyOn(fixture.componentInstance.selectFee, 'emit');
    fixture.detectChanges();

    const cells = fixture.nativeElement.querySelectorAll('tbody td');
    expect(cells[0].textContent).toContain('Alejandro Pérez de la Fuente');
    expect(cells[1].querySelector('button')).toBeNull();
    cells[2].querySelector('button').click();
    expect(selected).toHaveBeenCalledOnceWith({ member: 123, date });
  });
});
