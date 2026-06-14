import { Component, inject, OnInit } from '@angular/core';
import { MemberStatusSelector } from '@app/shared/member/member-status-selector/member-status-selector';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore } from '@bernardo-mg/request';
import { SummaryCard } from '@bernardo-mg/ui';
import { Fee, FeeSummary, MemberFees, MemberStatus, PublicMember, YearsRange } from '@ucronia/domain';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { SkeletonModule } from 'primeng/skeleton';
import { finalize, Observable, switchMap, tap, throwError } from 'rxjs';
import { FeeCalendarService } from '../fee-calendar-service';
import { FeeCalendar } from '../fee-calendar/fee-calendar';
import { FeeCreationEvent, FeeCreationForm } from '../fee-creation-form/fee-creation-form';
import { FeeInfo } from '../fee-info/fee-info';
import { FeeEditionEvent, FeeEditionForm } from '../fee-edition-form/fee-edition-form';
import { FeePaymentsForm, FeesPaymentEvent } from '../fee-payments-form/fee-payments-form';
import { FeeService } from '../fee-service';
import { FeeSummaryService } from '../fee-summary-service';

@Component({
  selector: 'assoc-fee-view',
  imports: [DialogModule, PanelModule, ButtonModule, MenuModule, SkeletonModule, FeeCalendar, FeeEditionForm, FeeInfo, MemberStatusSelector, FeePaymentsForm, FeeCreationForm, SummaryCard],
  templateUrl: './fee-view.html'
})
export class FeeView implements OnInit {

  private readonly feeCalendarService = inject(FeeCalendarService);
  private readonly reportService = inject(FeeSummaryService);
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly service = inject(FeeService);

  public readonly permissions: Permissions;
  public readonly status: Status = {
    loadingCalendar: false,
    loadingSummary: false,
    loadingDetail: false,
    showing: false,
    editing: false
  };
  public readonly filter: Filter = {
    status: MemberStatus.Active,
    range: new YearsRange(),
    year: new Date().getFullYear()
  };

  public selectedData = new Fee();
  public summary = new FeeSummary();
  public members: PublicMember[] = [];
  public feeCalendar: MemberFees[] = [];

  public failures = new FailureStore();

  public dialog = Dialog.NONE;

  public Dialog = Dialog;

  public readonly creationItems: MenuItem[] = [];

  constructor() {
    const authService = inject(AuthService);

    // Check permissions
    this.permissions = {
      create: authService.hasPermission("fee", "create"),
      edit: authService.hasPermission("fee", "update"),
      delete: authService.hasPermission("fee", "delete")
    };
  }

  public ngOnInit(): void {
    this.loadRange();

    this.creationItems.push(
      {
        label: 'Pagar cuota',
        command: () => this.onStartEditingView(Dialog.PAY)
      }
    );
    this.creationItems.push(
      {
        label: 'Cuota sin pagar',
        command: () => this.onStartEditingView(Dialog.CREATE)
      }
    );

    // Load report
    this.loadSummary();
  }

  public onUpdate(toUpdate: FeeEditionEvent): void {
    const update = {
      transaction: toUpdate.transaction ? toUpdate.transaction.date : undefined
    }
    this.call(
      () => this.service.update(this.selectedData.member.number, this.selectedData.month, update),
      () => this.messageService.add({ severity: 'info', summary: 'Actualizado', detail: 'Datos actualizados', life: 3000 })
    );
  }

  public onPay(data: FeesPaymentEvent): void {
    this.call(
      () => this.service.pay(data),
      () => this.messageService.add({ severity: 'info', summary: 'Creado', detail: 'Datos creados', life: 3000 })
    );
  }

  public onCreateUnpaid(data: FeeCreationEvent): void {
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
    this.status.showing = true;
  }

  public onChangeMemberStatus(active: MemberStatus) {
    this.filter.status = active;
    this.loadCalendar(this.filter.year);
  }

  public onStartEditingView(view: Dialog): void {
    this.dialog = view;
    this.status.showing = false;
    this.status.editing = true;
  }

  public onSearchMembers(event: { query: string }) {
    this.service.searchMembers(event.query?.trim(), MemberStatus.Active)
      .subscribe(members => {
        this.members = members;
      });
  }

  public loadCalendar(year: number) {
    this.status.loadingCalendar = true;

    this.filter.year = year;
    this.feeCalendarService.getCalendar(year, this.filter.status)
      .pipe(finalize(() => this.status.loadingCalendar = false))
      .subscribe(data => this.feeCalendar = data);
  }

  private loadSummary() {
    this.status.loadingSummary = true;

    this.reportService.getSummary()
      .pipe(finalize(() => this.status.loadingSummary = false))
      .subscribe(response => this.summary = response);
  }

  private loadRange() {
    this.status.loadingCalendar = true;

    this.feeCalendarService.getRange()
      .pipe(
        tap(range => {
          this.filter.range = range;
          this.loadYear(range);
        }),
        switchMap(() =>
          this.feeCalendarService.getCalendar(this.filter.year, this.filter.status)
        ),
        finalize(() => this.status.loadingCalendar = false)
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
      if (this.filter.year < firstYear) {
        this.filter.year = firstYear;
      } else if (this.filter.year > lastYear) {
        this.filter.year = lastYear;
      }
    }
  }

  private call(action: () => Observable<any>, onSuccess: () => void = () => { }) {
    this.status.loadingDetail = true;
    action()
      .pipe(finalize(() => this.status.loadingDetail = false))
      .subscribe({
        complete: () => {
          this.failures.clear();
          this.dialog = Dialog.NONE;
          this.status.showing = false;
          this.loadRange();
          this.loadSummary();
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

interface Permissions {
  create: boolean;
  edit: boolean;
  delete: boolean;
}

interface Status {
  loadingCalendar: boolean;
  loadingSummary: boolean;
  loadingDetail: boolean;
  editing: boolean;
  showing: boolean;
}

interface Filter {
  status: MemberStatus;
  range: YearsRange;
  year: number;
}

enum Dialog {
  NONE = 'list',
  EDITION = 'edition',
  CREATE = 'create',
  PAY = 'pay'
}