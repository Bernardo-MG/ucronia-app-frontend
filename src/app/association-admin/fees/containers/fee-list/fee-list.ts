import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeePaymentChart } from '@app/association-admin/fees/chart/containers/fee-payment-chart/fee-payment-chart';
import { FeeCalendarYear } from '@app/domain/fees/fee-calendar';
import { FeeCalendarYearsRange } from '@app/domain/fees/fee-calendar-years-range';
import { Active } from '@app/domain/person/active';
import { MemberStatusSelectComponent } from '@app/shared/person/components/member-status-select/member-status-select.component';
import { AuthContainer } from '@bernardo-mg/authentication';
import { IconAddComponent } from '@bernardo-mg/icons';
import { JustifyEndDirective, ResponsiveShortColumnsDirective } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { FeeCalendar } from '../../calendar/components/fee-calendar/fee-calendar';
import { FeeCalendarService } from '../../calendar/services/fee-calendar-service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'assoc-fee-list',
  imports: [RouterModule, CardModule, PanelModule, ButtonModule, FeeCalendar, MemberStatusSelectComponent, IconAddComponent, JustifyEndDirective, FeePaymentChart, ResponsiveShortColumnsDirective],
  templateUrl: './fee-list.html'
})
export class FeeList {

  private readonly service = inject(FeeCalendarService);

  public readonly createable;

  public activeFilter = Active.Active;

  public range = new FeeCalendarYearsRange();

  public year = new Date().getFullYear();

  /**
   * Loading flag. Shows the loading visual cue.
   */
  public readingCalendar = false;

  public feeCalendar: FeeCalendarYear[] = [];

  constructor() {
    const authContainer = inject(AuthContainer);

    // Check permissions
    this.createable = authContainer.hasPermission("fee", "create");

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

  public onStartEditingView(view: string): void {
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
