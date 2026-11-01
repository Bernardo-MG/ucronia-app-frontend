import { Component, OnChanges, SimpleChanges, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { YearsRange } from '@ucronia/domain';
import { getMonth } from 'date-fns';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { MemberFees, MemberFeesFee } from '../domain/member-fees';

@Component({
  selector: 'assoc-fee-calendar',
  imports: [FormsModule, SelectModule, TableModule, ButtonModule, BadgeModule, TooltipModule],
  templateUrl: './fee-calendar.html'
})
export class FeeCalendar implements OnChanges {

  public readonly range = input(new YearsRange());
  public readonly loading = input(false);
  public readonly year = input(new Date().getFullYear());
  public readonly feeCalendar = input<MemberFees[]>([]);

  public readonly goToYear = output<number>();
  public readonly selectFee = output<{ member: number, date: Date }>();

  public readonly monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  public readonly monthNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  public readonly currentMonth = new Date().getMonth() + 1;

  public currentYear = new Date().getFullYear();

  private get index(): number {
    return this.range().years.indexOf(this.currentYear);
  }

  public get selectionDisabled() {
    return this.loading() || (this.range().years.length === 0);
  }

  public get canGoNext() {
    return (this.index >= 0) && ((this.index + 1) < this.range().years.length);
  }

  public get canGoPrevious() {
    return (this.index > 0);
  }

  public get years(): number[] {
    return [...this.range().years].reverse();
  }

  public ngOnChanges({ year }: SimpleChanges): void {
    if (year) {
      this.currentYear = year.currentValue;
    }
  }

  public onGoTo(event: SelectChangeEvent) {
    this.currentYear = Number(event.value);
    this.goToYear.emit(this.currentYear);
  }

  public onGoPrevious() {
    if (this.canGoPrevious) {
      this.currentYear = Number(this.range().years[this.index - 1]);
      this.goToYear.emit(this.currentYear);
    }
  }

  public onGoNext() {
    if (this.canGoNext) {
      this.currentYear = Number(this.range().years[this.index + 1]);
      this.goToYear.emit(this.currentYear);
    }
  }

  public hasMonth(months: MemberFeesFee[], month: number): boolean {
    return months.some(m => getMonth(m.month) + 1 === month);
  }

  public onSelectFee(member: number, months: MemberFeesFee[], month: number) {
    const calendarMonth = this.getCalendarMonth(months, month);
    this.selectFee.emit({ member, date: calendarMonth.month });
  }

  public isPaid(months: MemberFeesFee[], month: number): boolean {
    return this.getCalendarMonth(months, month).paid;
  }

  public getMonth(months: MemberFeesFee[], month: number): Date {
    return this.getCalendarMonth(months, month).month;
  }

  private getCalendarMonth(months: MemberFeesFee[], month: number): MemberFeesFee {
    return months.find(m => getMonth(m.month) + 1 === month) as MemberFeesFee;
  }

}
