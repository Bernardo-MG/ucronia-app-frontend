import { DatePipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { DetailRequest } from '@app/shared/request/detail-request';
import { DrawerActions } from '@app/shared/ui/drawer-actions/drawer-actions';
import { DrawerFormActions } from '@app/shared/ui/drawer-form-actions/drawer-form-actions';
import { DrawerHeader } from '@app/shared/ui/drawer-header/drawer-header';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, SearchRequest } from '@bernardo-mg/request';
import { UcroniaPermissions } from '@ucronia/auth';
import { Fee, FeeSummary, MemberStatus, Profile, YearsRange } from '@ucronia/domain';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';
import { MenuModule } from 'primeng/menu';
import { SkeletonModule } from 'primeng/skeleton';
import { finalize, Observable, Subscription, switchMap, tap } from 'rxjs';
import { MemberFees } from '../domain/member-fees';
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
  imports: [DrawerHeader, DrawerFormActions, DrawerActions, DrawerModule, ButtonModule, CardModule, MenuModule, SkeletonModule, FeeCalendar, FeeEditionForm, FeeInfo, FeePaymentsForm, FeeCreationForm, DatePipe],
  templateUrl: './fee-view.html'
})
export class FeeView implements OnInit {

  private readonly destroyRef = inject(DestroyRef);

  private readonly detailRequest = new DetailRequest();

  private readonly feeCalendarService = inject(FeeCalendarService);
  private calendarRequest?: Subscription;
  private readonly memberSearch = new SearchRequest();
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
    range: new YearsRange(),
    year: new Date().getFullYear()
  };

  public selectedData = new Fee();
  public summary = new FeeSummary();
  public members: Profile[] = [];
  public feeCalendar: MemberFees[] = [];

  public failures = new FailureStore();

  private currentDialog = Dialog.NONE;

  public get dialog(): Dialog {
    return this.currentDialog;
  }

  public set dialog(value: Dialog) {
    if (value !== this.currentDialog) {
      this.detailRequest.cancel();
      this.memberSearch.cancel();
      this.members = [];
      this.currentDialog = value;
    }
  }

  public Dialog = Dialog;

  public readonly creationItems: MenuItem[] = [];

  constructor() {
    const authService = inject(AuthService);

    // Check permissions
    this.permissions = {
      create: authService.hasPermission(UcroniaPermissions.fee.create),
      edit: authService.hasPermission(UcroniaPermissions.fee.update),
      delete: authService.hasPermission(UcroniaPermissions.fee.delete)
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

  public onDelete(event: Event) {
    const dialog = this.dialog;
    const memberNumber = this.selectedData.member.number;
    const month = new Date(this.selectedData.month.getTime());
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
      accept: () => {
        if (
          this.destroyRef.destroyed ||
          this.dialog !== dialog ||
          this.selectedData.member.number !== memberNumber ||
          this.selectedData.month.getTime() !== month.getTime()
        ) {
          return;
        }

        this.call(
          () => this.service.delete(memberNumber, month),
          () => {
            this.loadRange();
            this.loadSummary();
          }
        );
      }
    });
  }

  public onSelectFee(fee: { member: number, date: Date }) {
    this.detailRequest.cancel();
    this.dialog = Dialog.INFO;
    this.status.loading = true;
    this.service.getOne(fee.member, fee.date)
      .pipe(
        finalize(() => this.status.loading = false),
        this.detailRequest.untilCancelled()
      )
      .subscribe(fee => this.selectedData = fee);
  }

  public onSearchMembers(event: { query: string }): void {
    this.memberSearch.search(event.query, query => this.service.searchMembers(query, MemberStatus.Active))
      .subscribe(members => this.members = members);
  }

  public loadCalendar(year: number) {
    this.calendarRequest?.unsubscribe();
    this.status.loadingCalendar = true;

    this.filter.year = year;
    this.calendarRequest = this.feeCalendarService.getCalendar(year)
      .pipe(finalize(() => this.status.loadingCalendar = false))
      .subscribe(data => this.feeCalendar = data);
  }

  // DIALOGS

  public onCancelEdit(): void {
    this.failures.clear();
    this.dialog = Dialog.INFO;
  }

  public onDrawerVisibleChange(visible: boolean) {
    if (!visible) {
      this.failures.clear();
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
    this.calendarRequest?.unsubscribe();
    this.status.loadingCalendar = true;

    this.calendarRequest = this.feeCalendarService.getRange()
      .pipe(
        tap(range => {
          this.filter.range = range;
          this.loadYear(range);
        }),
        switchMap(() =>
          this.feeCalendarService.getCalendar(this.filter.year)
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
  range: YearsRange;
  year: number;
}

enum Dialog {
  NONE = 'none',
  INFO = 'info',
  EDIT = 'edit',
  CREATE = 'create',
  PAY = 'pay'
}
