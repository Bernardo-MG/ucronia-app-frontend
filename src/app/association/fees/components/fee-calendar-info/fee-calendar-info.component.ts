import { Component, OnInit } from '@angular/core';
import { FeeCalendarRange } from '@app/association/models/fee-calendar-range';
import { UserFeeCalendar } from '@app/association/models/user-fee-calendar';
import { FeeCalendarService } from '../../services/fee-calendar.service';


@Component({
  selector: 'assoc-fee-calendar-info',
  templateUrl: './fee-calendar-info.component.html'
})
export class FeeCalendarInfoComponent implements OnInit {

  /**
   * Loading flag. Shows the loading visual cue.
   */
  public readingCalendar = false;

  public range = new FeeCalendarRange();

  public onlyActive = true;

  public rows: UserFeeCalendar[] = [];

  // TODO: What happens if this date is not in the range?
  public year = new Date().getFullYear();

  constructor(
    private service: FeeCalendarService
  ) { }

  ngOnInit(): void {
    // Load initial year
    this.load(this.year);

    // Load range
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
    this.readingCalendar = true;

    this.service.getCalendar(year, this.onlyActive).subscribe({
      next: data => {
        this.rows = data;
        this.readingCalendar = false;
      },
      error: error => {
        // Reactivate view
        this.readingCalendar = false;
      }
    });
  }

}
