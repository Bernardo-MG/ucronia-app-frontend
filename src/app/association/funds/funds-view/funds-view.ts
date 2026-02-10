import { Component, inject, OnInit } from '@angular/core';
import { TransactionCalendar } from '@app/association/funds/transaction-calendar/transaction-calendar';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore } from '@bernardo-mg/request';
import { Transaction, TransactionCurrentBalance } from '@ucronia/domain';
import { CalendarEvent } from 'angular-calendar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { finalize, Observable, throwError } from 'rxjs';
import { TransactionBalanceChartview } from '../transaction-balance-chart-view/transaction-balance-chart-view';
import { TransactionBalanceService } from '../transaction-balance-service';
import { TransactionCalendarService } from '../transaction-calendar-service';
import { TransactionForm } from '../transaction-form/transaction-form';
import { TransactionInfo } from '../transaction-info/transaction-info';
import { TransactionReportService } from '../transaction-report-service';
import { TransactionService } from '../transaction-service';

@Component({
  selector: 'app-funds-view',
  imports: [PanelModule, CardModule, ButtonModule, DialogModule, TransactionCalendar, TransactionInfo, TransactionForm, TransactionBalanceChartview],
  templateUrl: './funds-view.html'
})
export class FundsView implements OnInit {

  private readonly service = inject(TransactionService);
  private readonly transactionCalendarService = inject(TransactionCalendarService);
  private readonly transactionBalanceService = inject(TransactionBalanceService);
  private readonly reportService = inject(TransactionReportService);
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);

  public months: Date[] = [];

  public loading = false;
  public loadingCalendar = false;
  public loadingExcel = false;
  public loadingBalance = false;
  public editing = false;
  public showing = false;

  public readonly createable;
  public readonly editable;
  public readonly deletable;

  public selectedData = new Transaction();

  public transactions: Transaction[] = [];
  public balance = new TransactionCurrentBalance();

  public view: string = '';

  public failures = new FailureStore();

  constructor() {
    const authService = inject(AuthService);

    // Check permissions
    this.createable = authService.hasPermission("transaction", "create");
    this.editable = authService.hasPermission("transaction", "update");
    this.deletable = authService.hasPermission("transaction", "delete");
  }

  public ngOnInit(): void {
    // Read range
    this.transactionCalendarService.getRange()
      .subscribe(months => {
        // To show in the selection box we have to reverse the order
        this.months = months
          .map(m => new Date(`${m.year}-${m.month}`));
        // TODO: then sort the months instead of reversing
        this.months = [...this.months].reverse();
        if (!this.loadingCalendar) {
          this.loadCalendar(this.getDefaultMonth());
        }
      });

    // Read balance
    this.loadingBalance = true;
    this.transactionBalanceService.current()
      .pipe(finalize(() => this.loadingBalance = false))
      .subscribe(b => this.balance = b);
  }

  public onCreate(toCreate: Transaction): void {
    this.call(
      () => this.service.create(toCreate),
      () => this.messageService.add({ severity: 'info', summary: 'Actualizado', detail: 'Datos actualizados', life: 3000 })
    );
  }

  public onUpdate(toCreate: Transaction): void {
    this.call(
      () => this.service.update(toCreate),
      () => this.messageService.add({ severity: 'info', summary: 'Creado', detail: 'Datos creados', life: 3000 })
    );
  }

  public onDelete(event: Event, transaction: Transaction) {
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
        () => this.service.delete(transaction.index),
        () => this.messageService.add({ severity: 'info', summary: 'Borrado', detail: 'Datos borrados', life: 3000 }))
    });
  }

  public onStartEditingView(view: string): void {
    this.view = view;
    this.showing = false;
    this.editing = true;
  }

  public onShowInfo(event: CalendarEvent<{ transactionId: number }>) {
    if (event.meta) {
      this.service.getOne(event.meta.transactionId)
        .subscribe(transaction => this.selectedData = transaction);
      this.showing = true;
    }
  }

  public downloadExcel() {
    this.loadingExcel = true;
    this.reportService.downloadExcelReport()
      .pipe(finalize(() => this.loadingExcel = false))
      .subscribe();
  }

  public loadCalendar(month: Date) {
    this.loadingCalendar = true;
    this.transactionCalendarService.getCalendarInRange(month.getFullYear(), month.getMonth())
      .pipe(finalize(() => this.loadingCalendar = false))
      .subscribe(transactions => this.transactions = transactions);
  }

  private getDefaultMonth() {
    let month;
    if (this.months.length) {
      month = this.months[0];
    } else {
      month = new Date();
    }
    return month
  }

  private call(action: () => Observable<any>, onSuccess: () => void = () => { }) {
    this.loading = true;
    action()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        complete: () => {
          this.failures.clear();
          this.view = 'none';
          this.showing = false;
          this.loadCalendar(this.getDefaultMonth());
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
