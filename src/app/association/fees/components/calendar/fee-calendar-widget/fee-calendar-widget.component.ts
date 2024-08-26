import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MemberStatusSelectComponent } from '@app/association/members/components/shared/member-status-select/member-status-select.component';
import { Active } from '@app/association/members/models/active';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { JustifyCenterDirective } from '@app/shared/style/directives/justify-center.directive';
import { JustifyEndDirective } from '@app/shared/style/directives/justify-end.directive';
import { FeeCalendar } from '../../../models/fee-calendar';
import { FeeCalendarYearsRange } from '../../../models/fee-calendar-years-range';
import { FeeCalendarService } from '../../../services/fee-calendar.service';
import { FeeCalendarComponent } from '../fee-calendar/fee-calendar.component';

@Component({
  selector: 'assoc-fee-calendar-widget',
  standalone: true,
  imports: [RouterModule, FeeCalendarComponent, MemberStatusSelectComponent, JustifyEndDirective, JustifyCenterDirective],
  templateUrl: './fee-calendar-widget.component.html'
})
export class FeeCalendarWidgetComponent implements OnInit {

  public createPermission = false;

  public activeFilter = Active.Active;

  public range = new FeeCalendarYearsRange();

  public year = new Date().getFullYear();

  public index = 0;

  /**
   * Loading flag. Shows the loading visual cue.
   */
  public readingCalendar = false;

  public rows: FeeCalendar[] = [];

  constructor(
    private authContainer: AuthContainer,
    private service: FeeCalendarService
  ) { }

  public ngOnInit(): void {
    // Check permissions
    this.createPermission = this.authContainer.hasPermission("fee", "create");

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

  public onChangeActiveFilter(active: Active) {
    this.activeFilter = active;
    this.load(this.year);
  }

  public onGoToYear(year: number) {
    this.load(year);
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
