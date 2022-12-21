import { Component, Input, OnChanges } from '@angular/core';
import { FeeYear } from '@app/models/fee-year';
import { FeeCalendarRow } from '../../models/fee-calendar-row';

@Component({
  selector: 'admin-fee-calendar',
  templateUrl: './fee-calendar.component.html',
  styleUrls: ['./fee-calendar.component.sass']
})
export class FeeYearComponent implements OnChanges {

  @Input() public feeYears: FeeYear[] = [];

  public months: number[] = Array(12).fill(0).map((x, i) => i + 1);

  public feesTable: FeeCalendarRow[] = []

  constructor() { }

  ngOnChanges(): void {
    this.feesTable = this.feeYears.map(year => {
      const row = new FeeCalendarRow();
      row.name = year.name;
      row.surname = year.surname;
      row.active = year.active;
      this.months.forEach(month => {
        const feeMonth = year.months.find(m => m.month === month);
        var column;

        if (feeMonth) {
          column = feeMonth.paid;
        } else {
          column = undefined;
        }
        row.months.push(column);
      });

      return row;
    });
  }

  public containsMonth(month: number, year: FeeYear): boolean {
    return year.months.some(m => month === m.month);
  }

}
