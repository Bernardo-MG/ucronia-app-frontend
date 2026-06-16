import { Component, inject, OnInit } from '@angular/core';
import { MemberStatusSelector } from '@app/shared/member/member-status-selector/member-status-selector';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore } from '@bernardo-mg/request';
import { SummaryCard } from '@bernardo-mg/ui';
import { Fee, FeeSummary, MemberFees, MemberStatus, PublicMember, YearsRange } from '@ucronia/domain';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { SkeletonModule } from 'primeng/skeleton';
import { finalize, Observable, switchMap, tap } from 'rxjs';
import { FeeCalendarService } from '../fee-calendar-service';
import { FeeCalendar } from '../fee-calendar/fee-calendar';
import { FeeCreationEvent, FeeCreationForm } from '../fee-creation-form/fee-creation-form';
import { FeeEditionEvent, FeeEditionForm } from '../fee-edition-form/fee-edition-form';
import { FeeInfo } from '../fee-info/fee-info';
import { FeePaymentsForm, FeesPaymentEvent } from '../fee-payments-form/fee-payments-form';
import { FeeService } from '../fee-service';
import { FeeSummaryService } from '../fee-summary-service';

@Component({
  selector: 'assoc-fee-view',
  imports: [DrawerModule, PanelModule, ButtonModule, MenuModule, SkeletonModule, FeeCalendar, FeeEditionForm, FeeInfo, MemberStatusSelector, FeePaymentsForm, FeeCreationForm, SummaryCard],
  templateUrl: './fee-view.html'
})
export class FeeView implements OnInit {

  private readonly feeCalendarService = inject(FeeCalendarService);
  private readonly reportService = inject(FeeSummaryService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly service = inject(FeeService);

  public readonly permissions: Permissions;
  public readonly status: Status = {
    loadingCalendar: false,
    loadingSummary: false,
    loading: false
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
        command: () => this.dialog = Dialog.PAY
      }
    );
    this.creationItems.push(
      {
        label: 'Cuota sin pagar',
        command: () => this.dialog = Dialog.CREATE
      }
    );

    // Load report
    this.loadSummary();
  }

  // EVENT HANDLERS

  public onUpdate(toUpdate: FeeEditionEvent): void {
    const update = {
      transaction: toUpdate.transaction ? toUpdate.transaction.date : undefined
    }
    this.call(
      () => this.service.update(this.selectedData.member.number, this.selectedData.month, update),
      () => {
        this.loadRange();
        this.loadSummary();
      }
    );
  }

  public onPay(data: FeesPaymentEvent): void {
    this.call(
      () => this.service.pay(data),
      () => {
        this.loadRange();
        this.loadSummary();
      }
    );
  }

  public onCreateUnpaid(data: FeeCreationEvent): void {
    this.call(
      () => this.service.create(data),
      () => {
        this.loadRange();
        this.loadSummary();
      }
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
          () => {
            this.loadRange();
            this.loadSummary();
          }
        )
    });
  }

  public onSelectFee(fee: { member: number, date: Date }) {
    this.service.getOne(fee.member, fee.date)
      .subscribe(fee => this.selectedData = fee);
    this.dialog = Dialog.INFO;
  }

  public onChangeMemberStatus(active: MemberStatus) {
    this.filter.status = active;
    this.loadCalendar(this.filter.year);
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

  // DIALOGS

  public onDrawerVisibleChange(visible: boolean) {
    if (!visible) {
      this.dialog = Dialog.NONE;
    }
  }

  // DATA LOADING

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

  // PRIVATE METHODS

  private call(
    action: () => Observable<any>,
    onSuccess: () => void
  ) {
    this.status.loading = true;
    action()
      .pipe(finalize(() => this.status.loading = false))
      .subscribe({
        complete: () => {
          this.failures.clear();
          this.dialog = Dialog.NONE;
          onSuccess();
        },
        error: error => this.handleError(error)
      });
  }

  private handleError(error: unknown): void {
    if (error instanceof FailureResponse) {
      this.failures = error.failures;
    } else {
      this.failures.clear();
    }
  }

}

interface Permissions {
  create: boolean;
  edit: boolean;
  delete: boolean;
}

interface Status {
  loading: boolean;
  loadingCalendar: boolean;
  loadingSummary: boolean;
}

interface Filter {
  status: MemberStatus;
  range: YearsRange;
  year: number;
}

enum Dialog {
  NONE = 'none',
  INFO = 'info',
  EDITION = 'edition',
  CREATE = 'create',
  PAY = 'pay'
}