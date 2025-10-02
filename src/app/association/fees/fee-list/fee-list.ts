import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Fee } from '@app/domain/fees/fee';
import { FeeCalendarYear } from '@app/domain/fees/fee-calendar';
import { FeeCalendarYearsRange } from '@app/domain/fees/fee-calendar-years-range';
import { FeeCreation } from '@app/domain/fees/fee-creation';
import { FeePayment } from '@app/domain/fees/fee-payment';
import { FeePaymentReport } from '@app/domain/fees/fee-payment-report';
import { Member } from '@app/domain/members/member';
import { Active } from '@app/domain/person/active';
import { MemberSelectStepper } from '@app/shared/person/components/member-select-stepper/member-select-stepper';
import { MemberStatusSelectComponent } from '@app/shared/person/components/member-status-select/member-status-select.component';
import { AuthContainer } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore } from '@bernardo-mg/request';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { finalize, Observable, throwError } from 'rxjs';
import { FeeCalendarService } from '../fee-calendar-service';
import { FeeCalendar } from '../fee-calendar/fee-calendar';
import { FeeCreationForm } from '../fee-creation-form/fee-creation-form';
import { FeeEditionForm } from '../fee-edition-form/fee-edition-form';
import { FeeInfo } from '../fee-info/fee-info';
import { FeePayForm } from '../fee-pay-form/fee-pay-form';
import { FeePaymentBalanceChart } from '../fee-payment-balance-chart/fee-payment-balance-chart';
import { FeeReportService } from '../fee-report-service';
import { FeeService } from '../fee-service';

@Component({
  selector: 'assoc-fee-list',
  imports: [RouterModule, CardModule, DialogModule, PanelModule, ButtonModule, MenuModule, FeeCalendar, MemberStatusSelectComponent, FeeEditionForm, FeeInfo, FeePaymentBalanceChart, FeePayForm, MemberSelectStepper, FeeCreationForm],
  templateUrl: './fee-list.html'
})
export class FeeList implements OnInit {

  private readonly feeCalendarService = inject(FeeCalendarService);
  private readonly reportService = inject(FeeReportService);
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);
  public readonly service = inject(FeeService);

  public readonly createable;
  public readonly editable;

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
  public selectedMember = new Member();

  public failures = new FailureStore();

  public feeCalendar: FeeCalendarYear[] = [];

  public view: string = '';

  public readonly creationItems: MenuItem[] = [];

  public report = new FeePaymentReport();

  constructor() {
    const authContainer = inject(AuthContainer);

    // Check permissions
    this.createable = authContainer.hasPermission("fee", "create");
    this.editable = authContainer.hasPermission("fee", "update");
  }

  public ngOnInit(): void {
    this.loadRange();

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

    // Load report
    this.loadReport();
  }

  public onUpdate(toUpdate: Fee): void {
    const update = {
      ...toUpdate,
      member: toUpdate.member.number
    }
    this.call(
      () => this.service.update(update),
      () => this.messageService.add({ severity: 'info', summary: 'Actualizado', detail: 'Datos actualizados', life: 3000 })
    );
  }

  public onPay(data: FeePayment): void {
    this.call(
      () => this.service.pay(data),
      () => this.messageService.add({ severity: 'info', summary: 'Creado', detail: 'Datos creados', life: 3000 })
    );
  }

  public onCreateUnpaid(data: FeeCreation): void {
    this.call(
      () => this.service.create(data),
      () => this.messageService.add({ severity: 'info', summary: 'Creado', detail: 'Datos creados', life: 3000 })
    );
  }

  public onDelete(event: Event, fee: Fee) {
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: '¿Estás seguro de querer borrar? Esta acción no es revertible',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Borrar',
        severity: 'danger'
      },
      accept: () => this.call(
        () => this.service.delete(fee.month, fee.member.number),
        () => this.messageService.add({ severity: 'info', summary: 'Borrado', detail: 'Datos borrados', life: 3000 }))
    });
  }

  public onSelectFee(fee: { member: number, date: Date }) {
    this.service.getOne(fee.date, fee.member)
      .subscribe(fee => this.selectedData = fee);
    this.showing = true;
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

  public onGetSelection(page: number, active: Active) {
    return this.service.getPersons(page, active);
  }

  public onSelectMember(member: any) {
    this.selectedMember = (member as Member);
  }

  public loadCalendar(year: number) {
    this.loadingCalendar = true;

    this.year = year;
    this.feeCalendarService.getCalendar(year, this.activeFilter)
      .pipe(finalize(() => this.loadingCalendar = false))
      .subscribe(data => this.feeCalendar = data);
  }

  private loadReport() {
    this.reportService.getPaymentReport()
      .subscribe(response => this.report = response);
  }

  private loadRange() {
    this.feeCalendarService.getRange().subscribe(d => {
      this.range = d;
      this.loadYear();

      // Load initial year
      this.loadCalendar(this.year);
    });
  }

  private loadYear() {
    if (this.range.years.length) {
      const firstYear = Number(this.range.years[0]);
      const lastYear = Number(this.range.years[this.range.years.length - 1]);
      // If the current year is outside the range, set it back
      if (this.year < firstYear) {
        this.year = firstYear;
      } else if (this.year > lastYear) {
        this.year = lastYear;
      }
    }
  }

  private call(action: () => Observable<any>, onSuccess: () => void = () => { }) {
    this.loading = true;
    action()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.failures.clear();
          this.view = 'none';
          this.showing = false;
          this.loadRange();
          this.loadReport();
          onSuccess();
        },
        error: error => {
          if (error instanceof FailureResponse) {
            this.failures = error.failures;
          } else {
            this.failures.clear();
          }
          return throwError(() => error);
        }
      });
  }

}
