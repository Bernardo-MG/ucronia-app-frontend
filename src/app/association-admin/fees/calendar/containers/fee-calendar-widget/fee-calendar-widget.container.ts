import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Active } from '@app/models/person/active';
import { FeeCalendar } from '@app/models/fees/fee-calendar';
import { FeeCalendarYearsRange } from '@app/models/fees/fee-calendar-years-range';
import { MemberStatusSelectComponent } from '@app/shared/person/components/member-status-select/member-status-select.component';
import { AuthContainer } from '@bernardo-mg/authentication';
import { IconAddComponent } from '@bernardo-mg/icons';
import { CardBodyComponent, CardComponent, CardHeaderComponent, JustifyEndDirective } from '@bernardo-mg/layout';
import { FeeCalendarComponent } from '../../components/fee-calendar/fee-calendar.component';
import { FeeCalendarService } from '../../services/fee-calendar.service';

@Component({
  selector: 'assoc-fee-calendar-widget',
  imports: [RouterModule, FeeCalendarComponent, MemberStatusSelectComponent, IconAddComponent, CardComponent, CardBodyComponent, CardHeaderComponent, JustifyEndDirective],
  templateUrl: './fee-calendar-widget.container.html'
})
export class FeeCalendarWidgetContainer implements OnInit {

  private authContainer = inject(AuthContainer);

  private service = inject(FeeCalendarService);

  public createPermission = false;

  public activeFilter = Active.Active;

  public range = new FeeCalendarYearsRange();

  public year = new Date().getFullYear();

  /**
   * Loading flag. Shows the loading visual cue.
   */
  public readingCalendar = false;

  public feeCalendar: FeeCalendar[] = [];

  public ngOnInit(): void {
    // Check permissions
    this.createPermission = this.authContainer.hasPermission("fee", "create");

    // Load range
    this.service.getRange().subscribe(d => {
      this.range = d;
      const lastYear = Number(this.range.years[this.range.years.length - 1]);
      // If the current year is after the last year, move backwards to the last year
      if (this.year > lastYear) {
        this.year = lastYear;
      }

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
        this.feeCalendar = data;
        this.readingCalendar = false;
      },
      error: error => {
        // Reactivate view
        this.readingCalendar = false;
      }
    });
  }

}
