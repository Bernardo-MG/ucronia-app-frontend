import { Component, OnInit } from '@angular/core';
import { FeeCalendarRange } from '@app/association/models/fee-calendar-range';
import { FeeCalendarRow } from '@app/association/models/fee-calendar-row';
import { AdminFeeService } from '../../services/admin-fee.service';


@Component({
  selector: 'admin-fee-calendar-info',
  templateUrl: './fee-calendar-info.component.html',
  styleUrls: ['./fee-calendar-info.component.sass']
})
export class FeeCalendarInfoComponent implements OnInit {

  /**
   * Loading flag. Shows the loading visual cue.
   */
  public waiting = false;

  public range = new FeeCalendarRange();

  public onlyActive = false;

  public rows: FeeCalendarRow[] = [];

  public year = new Date().getFullYear();

  constructor(
    private service: AdminFeeService
  ) {
    this.load(this.year);
  }

  ngOnInit(): void {
    this.service.getRange().subscribe(d => this.range = d);
  }

  public onFilterActiveMembers(event: any) {
    this.onlyActive = event.checked;
    this.load(this.year);
  }

  public onYearChange(year: number) {
    this.year = year;
    this.load(year);
  }

  private load(year: number) {
    this.waiting = true;

    this.service.getCalendar(year, this.onlyActive).subscribe({
      next: data => {
        this.rows = data;
        this.waiting = false;
      },
      error: error => {
        // Reactivate view
        this.waiting = false;
      }
    });
  }

}
