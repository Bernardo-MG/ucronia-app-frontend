import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeePaymentChart } from '@app/association-admin/fees/chart/containers/fee-payment-chart/fee-payment-chart';
import { Fee } from '@app/domain/fees/fee';
import { FeeCalendarYear } from '@app/domain/fees/fee-calendar';
import { FeeCalendarYearsRange } from '@app/domain/fees/fee-calendar-years-range';
import { Active } from '@app/domain/person/active';
import { MemberStatusSelectComponent } from '@app/shared/person/components/member-status-select/member-status-select.component';
import { AuthContainer } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore } from '@bernardo-mg/request';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { finalize, Observable, throwError } from 'rxjs';
import { FeeCalendar } from '../../calendar/components/fee-calendar/fee-calendar';
import { FeeCalendarService } from '../../calendar/services/fee-calendar-service';
import { FeeCalendarSelection } from '../../chart/model/fee-calendar-selection';
import { FeeEditionForm } from '../../components/fee-edition-form/fee-edition-form';
import { FeeInfo } from '../../components/fee-info/fee-info';
import { FeeService } from '../../services/fee-service';
import { FeeCreate } from '../fee-create/fee-create';
import { FeePay } from '../fee-pay/fee-pay';

@Component({
  selector: 'assoc-fee-list',
  imports: [RouterModule, CardModule, DrawerModule, PanelModule, ButtonModule, MenuModule, FeeCalendar, MemberStatusSelectComponent, FeeEditionForm, FeeInfo, FeePaymentChart, FeeCreate, FeePay],
  templateUrl: './fee-list.html'
})
export class FeeList {

  private readonly feeCalendarService = inject(FeeCalendarService);

  private readonly service = inject(FeeService);

  public readonly createable;

  public editing = false;

  public activeFilter = Active.Active;

  public range = new FeeCalendarYearsRange();

  public year = new Date().getFullYear();

  /**
   * Loading flag. Shows the loading visual cue.
   */
  public loadingCalendar = false;
  public loading = false;
  public showing = false;

  public selectedData = new Fee();

  public failures = new FailureStore();

  public feeCalendar: FeeCalendarYear[] = [];

  public view: string = '';

  public readonly creationItems: MenuItem[] = [];

  constructor() {
    const authContainer = inject(AuthContainer);

    // Check permissions
    this.createable = authContainer.hasPermission("fee", "create");

    // Load range
    this.feeCalendarService.getRange().subscribe(d => {
      this.range = d;
      const lastYear = Number(this.range.years[this.range.years.length - 1]);
      // If the current year is after the last year, move backwards to the last year
      if (this.year > lastYear) {
        this.year = lastYear;
      }

      // Load initial year
      this.loadCalendar(this.year);

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

  public onCancel(): void {
    this.view = '';
    this.editing = false;
  }

  public onUpdate(toUpdate: Fee): void {
    const update = {
      ...toUpdate,
      member: toUpdate.member.number
    }
    this.mutate(() => this.service.update(update));
  }

  private mutate(action: () => Observable<any>) {
    this.loading = true;
    action().subscribe({
      next: () => {
        this.failures.clear();
        this.view = 'none';
        this.loadCalendar(this.year);
      },
      error: error => {
        if (error instanceof FailureResponse) {
          this.failures = error.failures;
        } else {
          this.failures.clear();
        }
        this.loading = false;
        return throwError(() => error);
      }
    });
  }

  public onSelectFee(fee:{ member: number, date: string }) {
    this.service.getOne(fee.date, fee.member).subscribe(fee => this.selectedData = fee);
    this.showing = true;
  }

  public onSelectMonth(selection: FeeCalendarSelection) {
    this.service.getOne(selection.month, selection.number)
      .pipe(finalize(() => this.onStartEditingView('edition')))
      .subscribe(fee => this.selectedData = fee);
  }

  public onChangeActiveFilter(active: Active) {
    this.activeFilter = active;
    this.loadCalendar(this.year);
  }

  public onGoToYear(year: number) {
    this.loadCalendar(year);
  }

  public onStartEditingView(view: string): void {
    this.view = view;
    this.editing = true;
  }

  private loadCalendar(year: number) {
    this.loadingCalendar = true;

    this.feeCalendarService.getCalendar(year, this.activeFilter)
      .pipe(finalize(() => this.loadingCalendar = false))
      .subscribe(data => this.feeCalendar = data);
  }

}
