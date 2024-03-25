import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeeCalendarYearsRange } from '@app/association/fees/models/fee-calendar-years-range';
import { Active } from '@app/association/members/models/active';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { FeeCalendar } from '../../models/fee-calendar';
import { FeeCalendarMonth } from '../../models/fee-month';
import { FeeCalendarService } from '../../services/fee-calendar.service';

@Component({
  selector: 'assoc-fee-calendar',
  standalone: true,
  imports: [CommonModule, RouterModule, LayoutModule, IconsModule],
  templateUrl: './fee-calendar.component.html'
})
export class FeeCalendarComponent implements OnInit, OnChanges {

  @Input() public activeFilter = Active.Active;

  @Input() public year = new Date().getFullYear();

  /**
   * Loading flag. Shows the loading visual cue.
   */
  public readingCalendar = false;

  public rows: FeeCalendar[] = [];

  public range = new FeeCalendarYearsRange();

  private index = 0;

  public months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  constructor(
    private service: FeeCalendarService
  ) { }

  public ngOnInit(): void {
    // Load range
    this.service.getRange().subscribe(d => {
      this.range = d;
      const lastYear = this.range.years[this.range.years.length - 1];
      if (this.year > lastYear) {
        this.year = lastYear;
      }
      this.index = this.range.years.indexOf(this.year);

      // Load initial year
      this.load(this.year);
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeFilter']) {
      this.load(this.year);
    }
    if (changes['year']) {
      this.index = this.range.years.indexOf(this.year);
    }
  }

  public onGoTo(event: any) {
    this.year = Number(event.target.value);
    this.load(this.year);
  }

  public onGoPrevious() {
    this.index = this.index - 1;
    this.year = this.range.years[this.index];
    this.load(this.year);
  }

  public onGoNext() {
    this.index = this.index + 1;
    this.year = this.range.years[this.index];
    this.load(this.year);
  }

  public isAbleToGoNext() {
    return ((this.index >= 0) && ((this.index + 1) < this.range.years.length));
  }

  public isAbleToGoPrevious() {
    return (this.index > 0);
  }

  public hasMonth(months: FeeCalendarMonth[], month: number): boolean {
    return months.find(m => m.month === month) !== undefined;
  }

  public getMonth(months: FeeCalendarMonth[], month: number): FeeCalendarMonth | undefined {
    return months.find(m => m.month === month);
  }

  private load(year: number) {
    this.readingCalendar = true;

    this.service.getCalendar(year, this.activeFilter).subscribe({
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
