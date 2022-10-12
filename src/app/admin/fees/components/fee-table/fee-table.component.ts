import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FeeYear } from '@app/models/fee-year';
import { FeeYearRow } from '../../models/fee-year-row';

@Component({
  selector: 'admin-fee-table',
  templateUrl: './fee-table.component.html',
  styleUrls: ['./fee-table.component.sass']
})
export class FeeTableComponent implements OnChanges {

  @Input() public feeYears: FeeYear[] = [];

  public months: number[] = Array(12).fill(0).map((x, i) => i + 1);

  public feesTable: FeeYearRow[] = []

  constructor() { }

  ngOnChanges(): void {
    this.feesTable = this.feeYears.map(year => {
      const row = new FeeYearRow();
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
