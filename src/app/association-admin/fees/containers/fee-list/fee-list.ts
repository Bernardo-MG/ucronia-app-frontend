import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeePaymentChart } from '@app/association-admin/fees/chart/containers/fee-payment-chart/fee-payment-chart';
import { FeeCalendarYear } from '@app/domain/fees/fee-calendar';
import { FeeCalendarYearsRange } from '@app/domain/fees/fee-calendar-years-range';
import { Active } from '@app/domain/person/active';
import { MemberStatusSelectComponent } from '@app/shared/person/components/member-status-select/member-status-select.component';
import { AuthContainer } from '@bernardo-mg/authentication';
import { ResponsiveShortColumnsDirective } from '@bernardo-mg/ui';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { FeeCalendar } from '../../calendar/components/fee-calendar/fee-calendar';
import { FeeCalendarService } from '../../calendar/services/fee-calendar-service';
import { FeeCreate } from '../fee-create/fee-create';
import { FeePay } from '../fee-pay/fee-pay';

@Component({
  selector: 'assoc-fee-list',
  imports: [RouterModule, CardModule, DrawerModule, PanelModule, ButtonModule, MenuModule, FeeCalendar, MemberStatusSelectComponent, FeePaymentChart, FeeCreate, FeePay, ResponsiveShortColumnsDirective],
  templateUrl: './fee-list.html'
})
export class FeeList {

  private readonly service = inject(FeeCalendarService);

  public readonly createable;

  public editing = false;

  public activeFilter = Active.Active;

  public range = new FeeCalendarYearsRange();

  public year = new Date().getFullYear();

  /**
   * Loading flag. Shows the loading visual cue.
   */
  public readingCalendar = false;

  public feeCalendar: FeeCalendarYear[] = [];

  public view: string = '';

  public readonly creationItems: MenuItem[] = [];

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

      this.creationItems.push(
        {
          label: 'Pagar cuota',
          command: () => this.onStartEditingView('pay')
        });
      this.creationItems.push(
        {
          label: 'Cuota sin pagar',
          command: () => this.onStartEditingView('create')
        });
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
    this.view = view;
    this.editing = true;
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
