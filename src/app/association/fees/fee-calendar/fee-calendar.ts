import { Component, computed, input, linkedSignal, output, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { eachMonthOfInterval, isValid, NormalizedInterval, startOfMonth, subMonths } from 'date-fns';
import { BadgeModule } from '@openng/optimus-ui/badge';
import { ButtonModule } from '@openng/optimus-ui/button';
import { DatePickerModule } from '@openng/optimus-ui/datepicker';
import { SelectButtonModule } from '@openng/optimus-ui/selectbutton';
import { TableModule } from '@openng/optimus-ui/table';
import { TooltipModule } from '@openng/optimus-ui/tooltip';
import { MemberFees, MemberFeesFee } from '../domain/member-fees';

export const DEFAULT_FEE_CALENDAR_MONTHS = 6;

@Component({
  selector: 'assoc-fee-calendar',
  imports: [FormsModule, SelectButtonModule, DatePickerModule, TableModule, ButtonModule, BadgeModule, TooltipModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './fee-calendar.html'
})
export class FeeCalendar {

  public readonly error = input(false);
  public readonly feeCalendar = input<MemberFees[]>([]);
  public readonly loading = input(false);
  public readonly period = input.required<NormalizedInterval>();

  public readonly periodChange = output<NormalizedInterval>();
  public readonly selectFee = output<{ member: number, date: Date }>();

  protected readonly currentMonth = startOfMonth(new Date()).getTime();
  protected get draftPeriod(): NormalizedInterval | null {
    if (this.mode === 'recent') {
      const count = this.recentMonths;
      if (count === null || !Number.isInteger(count) || count < 1) {
        return null;
      }

      const end = startOfMonth(new Date());
      const start = subMonths(end, count - 1);
      return isValid(start) ? { start, end } : null;
    }

    const start = this.from();
    const end = this.to();
    return start && end && start <= end ? { start, end } : null;
  }
  protected readonly from = linkedSignal<Date | null>(() => this.period().start);
  protected mode: 'recent' | 'range' = 'recent';
  protected readonly modes = [
    { label: 'Últimos meses', value: 'recent' },
    { label: 'Rango de fechas', value: 'range' }
  ];
  protected readonly months = computed(() => eachMonthOfInterval(this.period()).map(month => ({
    key: month.getTime(),
    label: this.formatMonth(month)
  })));
  protected recentMonths: number | null = DEFAULT_FEE_CALENDAR_MONTHS;
  protected readonly rows = computed(() => this.feeCalendar().map(entry => ({
    member: entry.member,
    feesByMonth: new Map(entry.fees.map(fee => [startOfMonth(fee.month).getTime(), fee]))
  })));
  protected readonly to = linkedSignal<Date | null>(() => this.period().end);

  private readonly monthLabel = new Intl.DateTimeFormat('es-ES', { month: 'short', year: 'numeric' });

  protected applyPeriod(): void {
    const period = this.draftPeriod;
    if (period) {
      this.periodChange.emit(period);
    }
  }

  protected formatMonth(date: Date): string {
    return this.monthLabel.format(date);
  }

  protected onSelectFee(member: number, fee: MemberFeesFee): void {
    this.selectFee.emit({ member, date: fee.month });
  }

}
