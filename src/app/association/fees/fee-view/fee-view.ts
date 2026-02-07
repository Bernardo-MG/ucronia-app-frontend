import { Component, inject, OnInit } from '@angular/core';
import { MemberStatusSelector } from '@app/shared/member/member-status-selector/member-status-selector';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page } from '@bernardo-mg/request';
import { FeeCreation } from '@ucronia/api';
import { Fee, FeePaymentReport, FeePayments, Member, MemberFees, MemberStatus, YearsRange } from '@ucronia/domain';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { SkeletonModule } from 'primeng/skeleton';
import { finalize, Observable, switchMap, tap, throwError } from 'rxjs';
import { FeeCalendarService } from '../fee-calendar-service';
import { FeeCalendar } from '../fee-calendar/fee-calendar';
import { FeeCreationForm } from '../fee-creation-form/fee-creation-form';
import { FeeDetails } from '../fee-details/fee-details';
import { FeeEditionForm, FeeEditionFormData } from '../fee-edition-form/fee-edition-form';
import { FeePaymentsForm } from '../fee-payments-form/fee-payments-form';
import { FeeReportService } from '../fee-report-service';
import { FeeService } from '../fee-service';
import { MemberSelectStepper } from '../member-select-stepper/member-select-stepper';

@Component({
  selector: 'assoc-fee-view',
  imports: [CardModule, DialogModule, PanelModule, ButtonModule, MenuModule, SkeletonModule, FeeCalendar, FeeEditionForm, FeeDetails, FeePaymentsForm, MemberSelectStepper, FeeCreationForm, MemberStatusSelector],
  templateUrl: './fee-view.html'
})
export class FeeView implements OnInit {

  private readonly feeCalendarService = inject(FeeCalendarService);
  private readonly reportService = inject(FeeReportService);
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly service = inject(FeeService);

  public readonly createable;
  public readonly editable;
  public readonly deletable;

  public editing = false;

  public activeFilter = MemberStatus.Active;

  public range = new YearsRange();

  public year = new Date().getFullYear();

  /**
   * Loading flag. Shows the loading visual cue.
   */
  public loadingCalendar = false;
  public loadingReport = false;
  public loadingDetail = false;
  public showing = false;

  public selectedData = new Fee();
  public selectedMember = new Member();

  public failures = new FailureStore();

  public feeCalendar: MemberFees[] = [];

  public view: string = '';

  public readonly creationItems: MenuItem[] = [];

  public report = new FeePaymentReport();

  constructor() {
    const authService = inject(AuthService);

    // Check permissions
    this.createable = authService.hasPermission("fee", "create");
    this.editable = authService.hasPermission("fee", "update");
    this.deletable = authService.hasPermission("fee", "delete");
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

  public onUpdate(toUpdate: FeeEditionFormData): void {
    const update = {
      transaction: toUpdate.transaction ? toUpdate.transaction.date : undefined
    }
    this.call(
      () => this.service.update(this.selectedData.member.number, this.selectedData.month, update),
      () => this.messageService.add({ severity: 'info', summary: 'Actualizado', detail: 'Datos actualizados', life: 3000 })
    );
  }

  public onPay(data: FeePayments): void {
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
      accept: () =>
        this.call(
          () => this.service.delete(fee.member.number, fee.month),
          () => this.messageService.add({ severity: 'info', summary: 'Borrado', detail: 'Datos borrados', life: 3000 })
        )
    });
  }

  public onSelectFee(fee: { member: number, date: Date }) {
    this.service.getOne(fee.member, fee.date)
      .subscribe(fee => this.selectedData = fee);
    this.showing = true;
  }

  public onChangeMemberStatus(active: MemberStatus) {
    this.activeFilter = active;
    this.loadCalendar(this.year);
  }

  public onStartEditingView(view: string): void {
    this.view = view;
    this.showing = false;
    this.editing = true;
  }

  public onSelectMember(member: any) {
    this.selectedMember = (member as Member);
  }

  public getMembers(page: number | undefined, active: MemberStatus): Observable<Page<Member>> {
    return this.service.getMembers(page, active);
  }

  public loadCalendar(year: number) {
    this.loadingCalendar = true;

    this.year = year;
    this.feeCalendarService.getCalendar(year, this.activeFilter)
      .pipe(finalize(() => this.loadingCalendar = false))
      .subscribe(data => this.feeCalendar = data);
  }

  private loadReport() {
    this.loadingReport = true;

    this.reportService.getPaymentReport()
      .pipe(finalize(() => this.loadingReport = false))
      .subscribe(response => this.report = response);
  }

  private loadRange() {
    this.loadingCalendar = true;

    this.feeCalendarService.getRange()
      .pipe(
        tap(range => {
          this.range = range;
          this.loadYear(range);
        }),
        switchMap(() =>
          this.feeCalendarService.getCalendar(this.year, this.activeFilter)
        ),
        finalize(() => this.loadingCalendar = false)
      )
      .subscribe(data => {
        this.feeCalendar = data;
      });
  }

  private loadYear(range: YearsRange) {
    if (range.years.length) {
      const firstYear = Number(range.years[0]);
      const lastYear = Number(range.years[range.years.length - 1]);
      // If the current year is outside the range, set it back
      if (this.year < firstYear) {
        this.year = firstYear;
      } else if (this.year > lastYear) {
        this.year = lastYear;
      }
    }
  }

  private call(action: () => Observable<any>, onSuccess: () => void = () => { }) {
    this.loadingDetail = true;
    action()
      .pipe(finalize(() => this.loadingDetail = false))
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
